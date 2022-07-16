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
from django.contrib import admin
from django.urls import path, include

# from django.conf.urls import url
from app.views import *

from app import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("admins/", ReactView.as_view(), name="admins"),
    path("login/", views.logininfo, name="logininfo"),
    path("adminlist/", views.getadminslist, name="adminlist"),
    #     path('showAllStudents', views.showAllStudents, name='show-all'),
    #     path('showSingleStudent/<int:pk>/', views.showSingleStudent, name='show-single'),
    #     path('addStudent', views.addStudent, name='add-student'),
    #     path('updateStudent/<int:pk>/', views.updateStudent, name='update-student'),
    #     path('deleteStudent/<int:pk>/', views.deleteProduct, name='delete-student'),
    # url(r'^api/tracks$', views.get_tracks_list),
    # path("get_video/", views.get_video, name="getvideo"),
    # url(r'^api/tutorials/(?P<pk>[0-9]+)$', views.tutorial_detail),
    # url(r'^api/tutorials/published$', views.tutorial_list_published)
]
