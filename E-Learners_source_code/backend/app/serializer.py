from rest_framework import serializers
from .models import *
from rest_framework import serializers
from app.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from app.utils import Util

class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['email', 'name', 'password', 'password2', 'tc']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = User
    fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'name']

class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    user.set_password(password)
    user.save()
    return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():
      user = User.objects.get(email = email)
      uid = urlsafe_base64_encode(force_bytes(user.id))
      print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      print('Password Reset Token', token)
      link = 'http://localhost:3000/api/user/reset/'+uid+'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = 'Click Following Link to Reset Your Password '+link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':user.email
      }
      Util.send_email(data)
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')

class ReactSerializer(serializers.ModelSerializer):
  class Meta:
    model = React
    fields = ["employee", "department"]

class CareerTrackSerializer(serializers.ModelSerializer):
  class Meta:
    model = CareerTrack
    fields = ["id", "name", "des"]
class UserNotificationsSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserNotifications
    fields = ["title", "description","userid","date","isread","link"]

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = EleanerUser
    fields = ["id", "name","email","password"]

class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Course
    fields = ["career_track", "title", "description", "intro_video", "poster", "subject", "level"]

# create serializer for UserCourse
class UserCourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserCourse
    fields = ["user", "course", "active_tutorial", "active_practice","status"]


class UserCourseSerializer2(serializers.ModelSerializer):
  class Meta:
    model = UserCourse
    fields = ["user", "course", "status"]


class UserTrackSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserCareerTrack
    fields = ["user", "track", "join_date", "isEnrolled"]

class UserTutorialsSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserTutorials
    fields = ["user", "tutorial", "progress"]


class FreeSlotSerializer(serializers.ModelSerializer):
  class Meta:
    model = FreeSlot
    fields = ["user", "start_date", "end_date",] 

class DailyChallengeSerializer(serializers.ModelSerializer):
  class Meta:
    model = DailyChallenge
    fields = ["user", "practice", "date"]

class VideoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Video
    fields = ["link"]

class UserQuestionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserQuestions
    fields = ["user", "question", "status"]

class PracticeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Practice
    fields = ["chapter", "title", "description", "duration", "level", "order", "type"]