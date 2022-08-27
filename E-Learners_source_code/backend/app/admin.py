from django.contrib import admin

# Register your models here.

from .models import (
  Answer,
  CareerTrack,
  Chapter,
  Option,
  Practice,
  Question,
  React,
  CareerTrack,
  Course,
  TrackCourse,
  Chapter,
  Tutorial,
  Practice,
  Question,
  Option,
  UserAttribute,
  UserCourse,
  UserNotifications,
  UserPractice,
  UserQuestions,
  UserCareerTrack,
  EleanerUser,
  Course, 
  SimpleQuiz, QuizQuestion,
  Video,
  FreeSlot,
  UserTutorials,
  TrackCourse,
  Tutorial,
  UserCareerTrack,
  UserPractice,
  UserQuestions,
  Attribute,
  TutorialAttribute,
  PracticeAttribute
)
from app.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserModelAdmin(BaseUserAdmin):
  # The fields to be used in displaying the User model.
  # These override the definitions on the base UserModelAdmin
  # that reference specific fields on auth.User.
  list_display = ('id', 'email', 'name', 'tc', 'is_admin')
  list_filter = ('is_admin',)
  fieldsets = (
      ('User Credentials', {'fields': ('email', 'password')}),
      ('Personal info', {'fields': ('name', 'tc')}),
      ('Permissions', {'fields': ('is_admin',)}),
  )
  # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
  # overrides get_fieldsets to use this attribute when creating a user.
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'name', 'tc', 'password1', 'password2'),
      }),
  )
  search_fields = ('email',)
  ordering = ('email', 'id')
  filter_horizontal = ()


# Now register the new UserModelAdmin...
admin.site.register(User, UserModelAdmin)
admin.site.register(EleanerUser)
admin.site.register(React)
admin.site.register(Course)
admin.site.register(SimpleQuiz)
admin.site.register(CareerTrack)
admin.site.register(TrackCourse)
admin.site.register(Chapter)
admin.site.register(Tutorial)
admin.site.register(Practice)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(UserPractice)
admin.site.register(UserQuestions)
admin.site.register(UserCareerTrack)
admin.site.register(Video)
admin.site.register(UserTutorials)
admin.site.register(FreeSlot)
admin.site.register(QuizQuestion)

admin.site.register(Answer)

admin.site.register(Attribute)
admin.site.register(TutorialAttribute)
admin.site.register(PracticeAttribute)




admin.site.register(UserNotifications)
admin.site.register(UserCourse)
