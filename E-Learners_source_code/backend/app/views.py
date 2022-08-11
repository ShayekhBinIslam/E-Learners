# from django.shortcuts import render
from urllib import response
from rest_framework.views import APIView
from rest_framework.response import Response

# from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# from account.serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from app.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# from rest_framework import viewsets
from loguru import logger

from .models import *
from .serializer import *


# Create your views here.
# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    return Response({'token':token,'name':user.name, 'msg':'Registration Successful','id': user.pk}, status=status.HTTP_201_CREATED)
    # return Response({'token':token, 'msg':'Registration Successful', 'id': user.pk}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email')
    password = serializer.data.get('password')
    user = authenticate(email=email, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token,'name':user.name,'msg':'Login Success','id': user.pk}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

class StudentList(ListAPIView):
  queryset = EleanerUser.objects.all()
  serializer_class = UserSerializer

class ReactView(APIView):

  serializer_class = ReactSerializer

  def get(self, request):
    output = [
        {"employee": output.employee, "department": output.department}
        for output in React.objects.all()
    ]
    return Response(output)

  def post(self, request):
    serializer = ReactSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(serializer.data)


@api_view(["GET"])
def getadminslist(request):

  serializer_class = ReactSerializer

  output = [
      {"employee": output.employee, "department": output.department}
      for output in React.objects.all()
  ]
  # print(output)
  return Response(output)

@api_view(["GET"])
def get_videos(request):
  serializer_class = VideoSerializer

  output = [
    {"link": str(output.link) }
    for output in Video.objects.all()
  ]

  # print(output)

  return Response(output)


@api_view(["GET"])
def get_tracks_list(request):
  serializer_class = CareerTrackSerializer
  output = [
      {"id": output.id, "name": output.title, "des": output.description, "isRunning": "true"}
      for output in CareerTrack.objects.all()
  ]

  # print(request.GET.get('track', ''))

  return Response(output)

@api_view(["GET"])
def get_course_list(request):
  serializer_class1 = CourseSerializer

  idd = request.GET.get('trackid', '')

  # name, des = CareerTrack.objects.filter(id = idd).values('title', 'description')
  
  res = CareerTrack.objects.filter(id = idd).values('title', 'description', 'intro_video_id')
  # print(res)
  video_id = int(res[0]['intro_video_id'])
  # print(video_id)
  video_link = Video.objects.filter(id=video_id).values('link')[0]['link']
  # print(video_link)

  # print(name, des)
  #print(type(res), res[0])

  output = [
      {"id": output.course_id}
      for output in TrackCourse.objects.filter(career_track__id = idd)
  ]

  output2 = []
  
  for i in output:
    output2.extend(
        list({"id": output3.id, "name":output3.title, "des": output3.description, "progress":"0", "isRunning":"true"}
        for output3 in Course.objects.filter(id = i["id"]))
    )


 # "name": output.course_title, "des": "output.description", "progress":"0", "isRunning": "true"

  # print(output2)
  dictO = {
    "name": res[0]["title"],
    "des": res[0]["description"],
    "video": video_link,
    "courses": output2,
  }

  # print(dictO)
  return Response(dictO)


@api_view(['GET'])
def get_chapter_list(request):
  courseid = request.GET.get('courseid', '')
  # print('Course id is {}'.format(courseid))

  output = [
      # {"id": output.course_id}
      {'id': output.id, 'title': output.title, 'description': output.description, 
      'progress': output.progress}
      # output
      for output in Chapter.objects.filter(course__id = courseid)
  ]

  # logger.info(vars(output[0]))
  logger.info(output)
  
  return Response(output)


  
@api_view(['GET'])
def get_tutorial_list(request):
  chapterid = request.GET.get('chapterid', '')
  # print('Chapter id is {}'.format(chapterid))
  output = [
    # output
    {'id': output.id, 'title': output.title, 'progress': "50", 'length': "9 mins"}
    for output in Tutorial.objects.filter(chapter__id = chapterid)
  ]

  logger.info(output)
  
  return Response(output)


# @api_view(['GET'])
# def showSingleStudent(request, pk):

#     student = Student.objects.get(id=pk)
#     serilizer = StudentSerializer(student, many=False)
#     return Response(serilizer.data)


@api_view(["POST"])
def logininfo(request):
  serilizer = ReactSerializer(data=request.data)

  if serilizer.is_valid():
    serilizer.save()

  # print(serilizer.data)
  # print(request.data)
  return Response(serilizer.data)


# @api_view(['PUT'])
# def updateStudent(request,pk):
#     student = Student.objects.get(id=pk)
#     serilizer = StudentSerializer(instance=student, data=request.data)

#     if serilizer.is_valid():
#         serilizer.save()

#     return Response(serilizer.data)


# @api_view(['DELETE'])
# def deleteProduct(request, pk):
#     product = Student.objects.get(id=pk)
#     product.delete()

#     return Response('Items delete successfully!')


@api_view(['POST'])
def save_user_course(request):

  print(request.data)

  courseid = request.data.get('course')
  userid = request.data.get('user')
  tutorialid = request.data.get('active_tutorial')
  practiceid = request.data.get('active_practice')

  print(courseid, userid, tutorialid, practiceid)
  

  output = [
    {'id': output.id,}
    # output
    for output in UserCourse.objects.filter(course__id = courseid, user__id = userid)
  ]

  # print("output:::")
  # print(output)

  if len(output)>0:
    UserCourse.objects.filter(id=output[0]["id"]).update(active_tutorial=tutorialid, active_practice=practiceid)
  else:
    serializer = UserCourseSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

  return Response('Item save successfully!')
