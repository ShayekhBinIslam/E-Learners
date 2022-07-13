import datetime
from django.db import models
from django.contrib.auth.models import User
from enum import Enum

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
  # TODO: current_track = models.ForeignKey(Track)
  # TODO: current_course = models.ForeignKey(Course)


class Video(models.Model):
  link = models.CharField(max_length=200)


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


class Practice(models.Model):
  chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
  title = models.CharField(max_length=200)
  description = models.CharField(max_length=5000)
  duration = models.IntegerField(default=0) # duration in seconds
  level = models.CharField(max_length=2,
                           choices=[(tag, tag.value) for tag in Levels], blank=True)


class Question(models.Model):
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

