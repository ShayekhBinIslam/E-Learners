"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from tomlkit import document
from . import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

# from django.conf.urls import url
from app.views import *

from app import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("admins/", ReactView.as_view(), name="admins"),
    path("login/", views.UserLoginView.as_view(), name="login"),
    path("profile/", views.UserProfileView.as_view(), name="profile"),
    path("changepassword/", views.UserChangePasswordView.as_view(), name="changepassword"),
    path("reset-password/<uid>/<token>", views.UserPasswordResetView.as_view(), name="reset-password"),
    path("send-reset-password-email/", views.SendPasswordResetEmailView.as_view(), name="send-reset-password-email"),
    path("adminlist/", views.getadminslist, name="adminlist"),
    path("userlist/",views.StudentList.as_view()),
    path("register/",views.UserRegistrationView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('getTrackList/', views.get_tracks_list, name="TrackList"),
    path('getCourseList/', views.get_course_list, name="CourseList"),
    path('getChapterList/', views.get_chapter_list, name="getChapterList"),
    # path('getUserTrackList/', views.get_usertracks_list, name="getUserTrackList"),
    path('getUserTrackDetails/', views.get_usertrack_details, name="getUserTrackDetails"),
    path('getUserTrackCompleted/', views.get_usertrack_completed, name="getUserTrackCompleted"),
    path('getUserTrackRunning/', views.get_usertrack_running, name="getUserTrackRunning"),
    path('getRecomPracticeList/', views.get_recom_practice_list, name="getRecomPracticeList"),


    path('saveUserCourse/', views.save_user_course, name="saveUserCourse"),
    
    path('getTutorialList/', views.get_tutorial_list, name="getTutorialList"),
    path('getQuiz/', views.get_Quiz, name="getQuiz"),
    path('saveQuestionStatus/', views.save_question_status, name="saveQuestionStatus"),
    path('getQuizStatus/', views.get_quiz_status, name="getQuizStatus"),
    #     path('showAllStudents', views.showAllStudents, name='show-all'),
    path("get_video/", views.get_videos, name="get_video"),

    #     path('showSingleStudent/<int:pk>/', views.showSingleStudent, name='show-single'),
    #     path('addStudent', views.addStudent, name='add-student'),
    #     path('updateStudent/<int:pk>/', views.updateStudent, name='update-student'),
    #     path('deleteStudent/<int:pk>/', views.deleteProduct, name='delete-student'),
    # url(r'^api/tracks$', views.get_tracks_list),
    # path("get_video/", views.get_video, name="getvideo"),
    # url(r'^api/tutorials/(?P<pk>[0-9]+)$', views.tutorial_detail),
    # url(r'^api/tutorials/published$', views.tutorial_list_published)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



