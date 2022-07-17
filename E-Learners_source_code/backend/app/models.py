import datetime
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# from django.contrib.auth.models import User
from enum import Enum

#  Custom User Manager
class UserManager(BaseUserManager):
  def create_user(self, email, name, tc, password=None, password2=None):
      """
      Creates and saves a User with the given email, name, tc and password.
      """
      if not email:
          raise ValueError('User must have an email address')

      user = self.model(
          email=self.normalize_email(email),
          name=name,
          tc=tc,
      )

      user.set_password(password)
      user.save(using=self._db)
      return user

  def create_superuser(self, email, name, tc, password=None):
      """
      Creates and saves a superuser with the given email, name, tc and password.
      """
      user = self.create_user(
          email,
          password=password,
          name=name,
          tc=tc,
      )
      user.is_admin = True
      user.save(using=self._db)
      return user

#  Custom User Model
class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='Email',
      max_length=255,
      unique=True,
  )
  name = models.CharField(max_length=200)
  tc = models.BooleanField()
  is_active = models.BooleanField(default=True)
  is_admin = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name', 'tc']

  def __str__(self):
      return self.email

  def has_perm(self, perm, obj=None):
      "Does the user have a specific permission?"
      # Simplest possible answer: Yes, always
      return self.is_admin

  def has_module_perms(self, app_label):
      "Does the user have permissions to view the app `app_label`?"
      # Simplest possible answer: Yes, always
      return True

  @property
  def is_staff(self):
      "Is the user a member of staff?"
      # Simplest possible answer: All admins are staff
      return self.is_admin

# Create your models here.


class React(models.Model):
  employee = models.CharField(max_length=30)
  department = models.CharField(max_length=200)


# template
# class __Table__(models.Model):
  # _field_ = models.CharField(max_length=200)

# https://pythonguides.com/python-django-get-enum-choices/
class Levels(Enum):
  BG = "Beginner"
  IM = "Intermediate"
  AV = "Advanced"


# User extension
# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html
class EleanerUser(models.Model):
  # User: username, fname, lname, email, pass, is_admin, lastlogin, date_joined
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  phone_no = models.CharField(max_length=200, default=0)
  email = models.EmailField(max_length=255, unique=True)
  name = models.CharField(max_length=255)
  password = models.CharField(max_length=32)
  # TODO: current_track = models.ForeignKey(Track)
  # TODO: current_course = models.ForeignKey(Course)


class Video(models.Model):
  link = models.CharField(max_length=200)
  # more metadata such as duration


class FreeSlot(models.Model):
  ''' Why datetime instead of only date?
  Rationale: if a learner is suddenly free today in the middle,
    we can assgin some tasks. Date will not allow time in the middle.
  '''
  user = models.ForeignKey(EleanerUser, on_delete=models.CASCADE)
  start_date = models.DateTimeField()
  end_date = models.DateTimeField()


class CareerTrack(models.Model):
  '''
  '''
  title = models.CharField(max_length=200)
  description = models.CharField(max_length=5000)
  intro_video = models.ForeignKey(Video, on_delete=models.SET_NULL, null=True)


class Course(models.Model):
  career_track = models.ManyToManyField(CareerTrack, through='TrackCourse')
  title = models.CharField(max_length=200)
  description = models.CharField(max_length=5000)
  intro_video = models.ForeignKey(Video, on_delete=models.SET_NULL, null=True)
  poster = models.CharField(max_length=500, default="")
  subject = models.CharField(max_length=100, default="subject")
  level = models.CharField(max_length=2,
                           choices=[(tag, tag.value) for tag in Levels], blank=True)

class TrackCourse(models.Model):
  career_track = models.ForeignKey(CareerTrack, on_delete=models.CASCADE)
  course = models.ForeignKey(Course, on_delete=models.CASCADE)
  order = models.IntegerField()


class Chapter(models.Model):
  title = models.CharField(max_length=200)
  description = models.CharField(max_length=5000)
  course = models.ForeignKey(Course, on_delete=models.CASCADE)
  

class Tutorial(models.Model):
  chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, null=True)
  title = models.CharField(max_length=200)
  description = models.CharField(max_length=5000)
  video = models.ForeignKey(Video, on_delete=models.SET_NULL, null=True)
  poster = models.CharField(max_length=500, default="")
  subject = models.CharField(max_length=100, default="subject")
  level = models.CharField(max_length=2,
                           choices=[(tag, tag.value) for tag in Levels], blank=True)
  order = models.IntegerField(default=0)


# class Quiz(models.Model):
  # class Meta:
    # abstract = True



# class Practice(SimpleQuiz):
class Practice(models.Model):
  # quiz = models.OneToOneField(SimpleQuiz, on_delete=models.CASCADE)
  # quiz = models.ForeignKey(SimpleQuiz, on_delete=models.CASCADE)
  # quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
  chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
  title = models.CharField(max_length=200, default='default')
  description = models.CharField(max_length=5000, default="default")
  duration = models.IntegerField(default=0) # duration in seconds
  level = models.CharField(max_length=2,
                           choices=[(tag, tag.value) for tag in Levels], blank=True)


class Question(models.Model):
  # practice = models.ForeignKey(SimpleQuiz, on_delete=models.CASCADE)
  # practice = models.ForeignKey(Quiz, on_delete=models.CASCADE)
  practice = models.ForeignKey(Practice, on_delete=models.CASCADE)
  title = models.CharField(max_length=200)
  picture = models.CharField(max_length=500, default="")


class Option(models.Model):
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  title = models.CharField(max_length=200)
  picture = models.CharField(max_length=500, default="")

class Answer(models.Model):
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  correct_option = models.ForeignKey(Option, on_delete=models.CASCADE)


class UserPractice(models.Model):
  user = models.ForeignKey(EleanerUser, on_delete=models.CASCADE)
  practice = models.ForeignKey(Practice, on_delete=models.CASCADE)
  # progress = # derive from questions  

class QuestionStatus(Enum):
  RT = "right"
  WG = "wrong"

class UserQuestions(models.Model):
  user = models.ForeignKey(EleanerUser, on_delete=models.CASCADE)
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  status = models.CharField(max_length=2,
                           choices=[(tag, tag.value) for tag in QuestionStatus], blank=True)


class UserTutorials(models.Model):
  user = models.ForeignKey(EleanerUser, on_delete=models.CASCADE)
  tutorial = models.ForeignKey(Tutorial, on_delete=models.CASCADE)
  progress = models.CharField(max_length=200)


class UserCareerTrack(models.Model):
  user = models.ForeignKey(EleanerUser, on_delete=models.CASCADE)
  track = models.ForeignKey(CareerTrack, on_delete=models.CASCADE)
  join_date = models.DateTimeField(default=datetime.datetime.now())


class Attribute(models.Model):
  name = models.CharField(max_length=200)

class UserAttribute(models.Model):
  user = models.ForeignKey(EleanerUser, on_delete=models.CASCADE)
  attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
  value = models.IntegerField(default=0)

class ChapterAttribute(models.Model):
  chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
  attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE)
  value = models.IntegerField(default=0)

class SimpleQuiz(models.Model):
  # Recommendation Quiz
  title = models.CharField(max_length=200, default="default")
  description = models.CharField(max_length=5000, default="default")

class QuizQuestion(models.Model):
  # practice = models.ForeignKey(SimpleQuiz, on_delete=models.CASCADE)
  # practice = models.ForeignKey(Quiz, on_delete=models.CASCADE)
  reco_quiz = models.ForeignKey(SimpleQuiz, on_delete=models.CASCADE)
  title = models.CharField(max_length=200)
  # picture = models.CharField(max_length=500, default="")
  picture = models.ImageField()


class QuizOption(models.Model):
  question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
  title = models.CharField(max_length=200)
  picture = models.CharField(max_length=500, default="")

class QuizAnswer(models.Model):
  question = models.ForeignKey(QuizQuestion, on_delete=models.CASCADE)
  correct_option = models.ForeignKey(QuizOption, on_delete=models.CASCADE)

