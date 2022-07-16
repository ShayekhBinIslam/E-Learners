from django.contrib import admin

# Register your models here.

from .models import (
  React,
  Course, 
  SimpleQuiz, QuizQuestion
)

admin.site.register(React)
admin.site.register(Course)
admin.site.register(SimpleQuiz)
admin.site.register(QuizQuestion)
