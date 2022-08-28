# from django.shortcuts import render
from http.client import HTTPResponse
from operator import le
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
from backend.settings import MEDIA_ROOT


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
    print("in login")
    print(user.pk)
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
  chapterid = request.GET.get('chapterid')
  print("Chapterid: ", chapterid)
  videonum = request.GET.get('videonum')
  print("Videonum: ", videonum)
  next_video = int(videonum) + 1

  output = [
    # {"link": str(output.link) }
    output
    for output in Tutorial.objects.filter(chapter=chapterid, order=next_video)
  ]

  print(output)

  if len(output) > 0:
    output = [
      # {"link": str(output.link) }
      {"link": output["video__link"], 'order': output['order'], 'tutorial': output['id'], 'title': output['title'], 'description': output['description'], 'chapter_title': output['chapter__title']}
      # output
      for output in Tutorial.objects.filter(chapter=chapterid, order=next_video).values('id', 'video__link', 'order', 'title', 'description', 'chapter__title')
    ]
    print(output)
    return Response(output)

  return Response()


@api_view(["POST"])
def save_video_progress(request):
  userid = request.data.get('user')
  tutorial = request.data.get('tutorial')
  progress = request.data.get('progress')
  print("Userid: ", userid)
  print("Tutorial: ", tutorial)
  print("Progress: ", progress)

  output = [
    {'id': output.id,}
    # output
    for output in UserTutorials.objects.filter(tutorial__id = tutorial, user__id = userid)
  ]

  print(output)

  if len(output)>0:
    UserTutorials.objects.filter(id=output[0]["id"]).update(progress=progress)
  else:
    print("Serializing")
    serializer = UserTutorialsSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
  
  return Response("Success")

@api_view(["POST"])
def save_notification(request):
  noti_id = request.data.get('id')
  userid = request.data.get('userid')

  
  
  print("NotiID: ", noti_id)
  print("userID: ", userid)


  output = [
    {'id': output.id,'userid' : output.userid}
    # output
    for output in UserNotifications.objects.filter(id = noti_id, userid = userid)
  ]

  print(output)

  if len(output)>0:
    UserNotifications.objects.filter(id=output[0]["id"],userid = output[0]["userid"]).update(isread=True)
  else:
    print("Serializing")
    serializer = UserNotificationsSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
  
  return Response("Success")

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
def get_notification_list(request):
  useridd = request.GET.get('userid', '')
  serializer_class = UserNotificationsSerializer
  output = [
      {"id": output.id, "title": output.title, "description": output.description,"userid" : output.userid, "date": output.date.strftime("%Y-%m-%d %H:%M:%S"),"isread":output.isread,"link":output.link}
      for output in UserNotifications.objects.filter(isread = False,userid =useridd )
  ]

  # print(request.GET.get('track', ''))

  return Response(output)
@api_view(["POST"])
def addNotification(request):
  title = request.data.get('title', '')
  description = request.data.get('description', '')
  date = request.data.get('date', '')
  link = request.data.get('link', '')
  userid = request.data.get('userid', '')
  
  # serilizer = UserNotificationsSerializer(data=request.data)
  data = {
    'title': title,
    'description': description,
    'userid': userid,
    'date' : date,
    'isread' : False,
    'link' : link,
  }

  
  serializer =  UserNotificationsSerializer(data=data)
  
  if serializer.is_valid():
    serializer.save()
    print(data)
    print("save hoyeche")
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  print(data)
  print("save hoyni")
  
  return Response(serializer.data)

@api_view(["GET"])
def get_user_details(request):
  serializer_class = CareerTrackSerializer
  user_id = request.GET.get('userid', '') 
  output = [
      {"id": output.id, "name": output.name, "mail": output.email, "Expert": "Web Developer"}
      for output in User.objects.filter(id = user_id)
  ]
  dictO = {
    
    "user_contents": output,
  }
  print(dictO)

  # print(request.GET.get('track', ''))

  return Response(dictO)
@api_view(["GET"])
def get_usertrack_completed(request):
  serializer_class = UserTrackSerializer
  # track_id = request.GET.get('trackid','')
  user_id = request.GET.get('userid', '')
  print("userid")
  print(user_id)
  # print("trackid")
  # print(track_id)
  # getting all user tracks
  output = [
      {"track_id": output.track_id}
      for output in UserCareerTrack.objects.filter(user__id = user_id,isEnrolled = True)
  ]
  print(output)
  result = []
  temp_track = []
  # now find the courses under each track
  
  for i in output:
    output2 = []
    output2.extend(
      list({"course_id": output3.id}
        for output3 in TrackCourse.objects.filter(career_track__id = i["track_id"]))
    )
    print(output2)
    # now check if any of the courses has running status
    flag = 0
    for j in output2:
      for output3 in UserCourse.objects.filter(user__id = user_id,course__id = j["course_id"]):
        print(output3.status)
        status = output3.status
        if status == "R":
          print(status)
          print(i)
          print(j)
          flag = 1
          continue
    if flag == 0:
      temp_track.append(i["track_id"])
      # # if any running append to the list
      result.extend(
        list({"id": output4.id,"title":output4.title,"des":output4.description}
        for output4 in CareerTrack.objects.filter(id = i["track_id"]))
      )
          

  # for i in temp_track :
  #   # if any running append to the list
  #   result.extend(
  #     list({"id": output4.id,"title":output4.title,"des":output4.description,"intro_video":output4.intro_video}
  #     for output4 in CareerTrack.objects.filter(id = i["track_id"]))
  #   )
  print(result)
  dictO = {
    
    "completed_tracks": result,
  }



  # output2 = []
  
  # for i in output:
  #   output2.extend(
  #       list({"id": output3.id, "name":output3.title, "des": output3.description, "progress":"0", "isRunning":"true"}
  #       for output3 in Course.objects.filter(id = i["id"]))
  #   )

  # print(request.GET.get('track', ''))

  return Response(dictO)

@api_view(["GET"])
def get_recom_practice_list(request):
  serializer_class = UserTrackSerializer
  # track_id = request.GET.get('trackid','')
  user_id = request.GET.get('userid', '')
  course_id = request.GET.get('courseid', '')
  chapter_id = request.GET.get('chapterid', '')

  # print("userid")
  # print(user_id)
  # print("trackid")
  # print(track_id)
  # getting all user tracks
  practiceList = [
      {"practice_id": output.id}
      for output in Practice.objects.filter(chapter__id = chapter_id,type = "practice")
  ]
  # print(output)
  result = []
  temp_track = []
  # now find the courses under each track
  
  for i in practiceList:
    output2 = []
    output2.extend(
      list({"question_id": output3.id}
        for output3 in Question.objects.filter(practice__id = i["practice_id"]))
    )
    # print(output2)
    # now check user question status
    print(output2)
    flag = 0
    for j in output2:
      for output3 in  UserQuestions.objects.filter(user__id = user_id,question__id = j["question_id"]):
        if output3.status != "NA":
          flag = 1
          break
    # now if flag changes add to result
    if flag == 0:
      # # if any running append to the list
      result.extend(
        list({"id": output4.id,"title":output4.title,"des":output4.description,"level":output4.level}
        for output4 in Practice.objects.filter(id = i["practice_id"]))
      )
      break
          
            

  # for i in temp_track :
  #   # if any running append to the list
  #   result.extend(
  #     list({"id": output4.id,"title":output4.title,"des":output4.description,"intro_video":output4.intro_video}
  #     for output4 in CareerTrack.objects.filter(id = i["track_id"]))
  #   )
  # print(result)
  dictO = {
    
    "recompractice_list": result,
  }



  # output2 = []
  
  # for i in output:
  #   output2.extend(
  #       list({"id": output3.id, "name":output3.title, "des": output3.description, "progress":"0", "isRunning":"true"}
  #       for output3 in Course.objects.filter(id = i["id"]))
  #   )

  # print(request.GET.get('track', ''))

  return Response(dictO)

@api_view(["GET"])
def get_recom_tutorial_list(request):
  serializer_class = UserTrackSerializer
  # track_id = request.GET.get('trackid','')
  user_id = request.GET.get('userid', '')
  course_id = request.GET.get('courseid', '')
  chapter_id = request.GET.get('chapterid', '')

  # print("userid")
  # print(user_id)
  # print("trackid")
  # print(track_id)
  # getting all user tracks
  tutorialList = [
      {"tutorial_id": output.id}
      for output in Tutorial.objects.filter(chapter__id = chapter_id)
  ]
  print("heeeeefefef\n")
  print(tutorialList)
  result = []
  temp_track = []
  # now find the courses under each track
  
  for i in tutorialList:
    # output2 = []
    for output3 in UserTutorials.objects.filter(tutorial__id = i["tutorial_id"],user__id = user_id):
      
      if int(output3.progress) < 100 :
        result.extend(
          list({"id": output4.id,"title":output4.title,"des":output4.description,"level":output4.level,"progress":output3.progress}
            for output4 in Tutorial.objects.filter(id = i["tutorial_id"]))
        )
        break
    if len(result) > 0 :
      break
  print(result)
  dictO = {
    
    "recomtutorial_list": result,
  }



  # output2 = []
  
  # for i in output:
  #   output2.extend(
  #       list({"id": output3.id, "name":output3.title, "des": output3.description, "progress":"0", "isRunning":"true"}
  #       for output3 in Course.objects.filter(id = i["id"]))
  #   )

  # print(request.GET.get('track', ''))

  return Response(dictO)
@api_view(["GET"])
def get_usertrack_running(request):
  serializer_class = UserTrackSerializer
  # track_id = request.GET.get('trackid','')
  user_id = request.GET.get('userid', '')
  # print("userid")
  # print(user_id)
  # print("trackid")
  # print(track_id)
  # getting all user tracks
  output = [
      {"track_id": output.track_id}
      for output in UserCareerTrack.objects.filter(user__id = user_id,isEnrolled = True)
  ]
  # print(output)
  result = []
  temp_track = []
  # now find the courses under each track
  
  for i in output:
    output2 = []
    output2.extend(
      list({"course_id": output3.id}
        for output3 in TrackCourse.objects.filter(career_track__id = i["track_id"]))
    )
    # print(output2)
    # now check if any of the courses has running status
    for j in output2:
      for output3 in UserCourse.objects.filter(user__id = user_id,course__id = j["course_id"]):
        
        # print(output3.status)
        status = output3.status
        if status == "R":
          # print(status)
          # print(i)
          # print(j)
          temp_track.append(i["track_id"])
          # # if any running append to the list
          result.extend(
            list({"id": output4.id,"title":output4.title,"des":output4.description}
            for output4 in CareerTrack.objects.filter(id = i["track_id"]))
          )
          break

  # for i in temp_track :
  #   # if any running append to the list
  #   result.extend(
  #     list({"id": output4.id,"title":output4.title,"des":output4.description,"intro_video":output4.intro_video}
  #     for output4 in CareerTrack.objects.filter(id = i["track_id"]))
  #   )
  # print(result)
  dictO = {
    
    "running_tracks": result,
  }



  # output2 = []
  
  # for i in output:
  #   output2.extend(
  #       list({"id": output3.id, "name":output3.title, "des": output3.description, "progress":"0", "isRunning":"true"}
  #       for output3 in Course.objects.filter(id = i["id"]))
  #   )

  # print(request.GET.get('track', ''))

  return Response(dictO)
@api_view(["GET"])
def get_usertrack_details(request):
  serializer_class = UserTrackSerializer
  track_id = request.GET.get('trackid','')
  user_id = request.GET.get('userid', '')
  print("userid")
  print(user_id)
  print("trackid")
  print(track_id)
  
  output = [
      {"user_id": output.user_id,"track_id": output.track_id,"join_date":output.join_date,"isEnrolled":output.isEnrolled}
      for output in UserCareerTrack.objects.filter(user__id = user_id,track__id=track_id)
  ]
  print(output)
  # output2 = []
  
  # for i in output:
  #   output2.extend(
  #       list({"id": output3.id, "name":output3.title, "des": output3.description, "progress":"0", "isRunning":"true"}
  #       for output3 in Course.objects.filter(id = i["id"]))
  #   )

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

  link2 = CareerTrack.objects.filter(id = idd).values('intro_video__link')
  logger.info("link2: {}".format(link2))

  # print(name, des)
  #print(type(res), res[0])

  output = [
      {"id": output.course_id}
      for output in TrackCourse.objects.filter(career_track__id = idd)
  ]

  output2 = []
  
  for i in output:
    isRunning = False
    x = UserCourse.objects.filter(user__id = request.GET.get('user_id', ''),course__id = i["id"])
    if len(x) > 0:
      isRunning = True
    output2.extend(
        list({"id": output3.id, "name":output3.title, "des": output3.description, 
        "progress":"0", "isRunning": isRunning}
        for output3 in Course.objects.filter(id = i["id"]))
    )
  print(output2)


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
  print('Course id is {}'.format(courseid))
  logger.info("Get chapter list")

  # Join UserTutorials with Tutorial
  # user_id = 2
  # tutorial_id = 1
  # user_tutorial = UserTutorials.objects.filter(user_id=user_id, tutorial_id=tutorial_id)
  # logger.info(user_tutorial)
  # logger.info(user_tutorial.values('tutorial__title', 'user__name'))
  

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
def get_chapter_list_for_quiz(request):
  courseid = request.GET.get('courseid', '')
  # print('Course id is {}'.format(courseid))

  output = [
      # {"id": output.course_id}
      {'id': output.id, 'name': output.title, 'des': output.description}
      # output
      for output in Chapter.objects.filter(course__id = courseid)
  ]

  idsOfQuiz_BG = []
  cc = 0
  for j in output:
    idsOfQuiz_BG.insert(cc, 
        list({"id":output3.id}
        for output3 in Practice.objects.filter(chapter = j["id"], type = "quiz", level = "BG"))
    )
    cc = cc + 1
  
  idsOfQuiz_IM = []
  cc = 0
  for j in output:
    idsOfQuiz_IM.insert(cc, 
        list({"id":output3.id}
        for output3 in Practice.objects.filter(chapter = j["id"], type = "quiz", level = "IM"))
    )
    cc = cc + 1
  
  idsOfQuiz_AV = []
  cc = 0
  for j in output:
    idsOfQuiz_AV.insert(cc, 
        list({"id":output3.id}
        for output3 in Practice.objects.filter(chapter = j["id"], type = "quiz", level = "AV"))
    )
    cc = cc + 1
  
  print("paisi QStatus")
  print(idsOfQuiz_BG)

  # logger.info(vars(output[0]))
  #logger.info(output)

  dictO = {
    "chapters": output,
    "quiz_BG": idsOfQuiz_BG,
    "quiz_IM": idsOfQuiz_IM,
    "quiz_AV": idsOfQuiz_AV,
  }

  print(dictO)
  
  return Response(dictO)

  
@api_view(['GET'])
def get_tutorial_list(request):
  chapterid = request.GET.get('chapterid', '')
  userid = request.GET.get('userid', '')
  # print('Chapter id is {}'.format(chapterid))

  print('User id is {}'.format(userid))
  print('Chapter id is {}'.format(chapterid))
  import random
  output = [
    # output
    {'id': output.id, 'title': output.title, 'poster': output.poster.url, 'order': output.order, 'progress': "30", 'length': str(output.video.duration)+" mins"}
    for output in Tutorial.objects.filter(chapter__id = chapterid)
  ]
  
  # print(x.url)

  practice = [
    {'id': output.id, 'title': output.title, 'description': output.description, 'length': output.duration, 'level': output.level}
    for output in Practice.objects.filter(chapter__id = chapterid, type = "practice")
  ]

  print("paisi practice")
  print(practice)

  practiceStatus = []
  
  c = 0
  for i in practice:

    questions = [
      {'id': output.id}
      for output in Question.objects.filter(practice__id = i["id"])
    ]

    print("paisi questions")
    # print(questions)

    QStatus = []
    cc = 0
    for j in questions:
      QStatus.insert(cc, 
          list({"status":output3.status}
          for output3 in UserQuestions.objects.filter(question = j["id"], user = userid))
      )
      cc = cc + 1
    
    print("paisi QStatus")
    print(QStatus)

    QAnswer = []
  
    for j in questions:
      QAnswer.extend(
          list({"id": output3.id, "optionid":output3.correct_option_id}
          for output3 in Answer.objects.filter(question__id = j["id"]))
      )
    
    QAnswername = []
    for j in QAnswer:
      QAnswername.extend(
          list({"title":output3.title}
          for output3 in Option.objects.filter(id = j["optionid"]))
      )

    print("paisi QAnswername")
    print(QAnswername)
    
    correct = 0
    print(QStatus)
    print(QAnswername)
    for j in range(len(QStatus)):
      if len(QStatus[j]) > 0:
        if (QStatus[j][0]["status"] == QAnswername[j]["title"]):
          correct = correct+1
      
    practiceStatus.insert(c, 
      round(correct*100/(len(questions)+0.02))
    )
    c = c + 1

    correct = 0

  print(practiceStatus)


  logger.info(output)

  dictD = {
    "tutorialsList": output,
    "PracticeList": practice,
    "PracticeStatus": practiceStatus
  }

  print(dictD)
  
  return Response(dictD)




@api_view(['GET'])
def get_Quiz(request):
  quizid = request.GET.get('quizid', '')
  print('quiz id is {}'.format(quizid))

  Quizname = [
    # output
    {'title': output.title}
    for output in Practice.objects.filter(id = quizid)
  ]

  questions = [
    # output
    {'id': output.id, 'title': output.title, 'poster': output.picture.url}
    for output in Question.objects.filter(practice__id = quizid)
  ]

  print(questions)
  QOptions = []
  
  c = 0
  for i in questions:
    QOptions.insert(c, 
        list({"id": output3.id, "name":output3.title}
        for output3 in Option.objects.filter(question__id = i["id"]))
    )
    c = c + 1

  print(QOptions)


  QAnswer = []
  
  for i in questions:
    QAnswer.extend(
        list({"id": output3.id, "optionid":output3.correct_option_id}
        for output3 in Answer.objects.filter(question__id = i["id"]))
    )

  print(QAnswer)

  QAnswername = []
  for i in QAnswer:
    QAnswername.extend(
        list({"title":output3.title}
        for output3 in Option.objects.filter(id = i["optionid"]))
    )

  print(QAnswername)


  Questions = []

  QOptionsSent = []
  for i in range(len(QOptions)): 
    QOptionsSentRow = []
    for j in range(len(QOptions[i])):
      QOptionsSentRow.append(QOptions[i][j]["name"])
    QOptionsSent.append(QOptionsSentRow)
  
  QAnswerSent = []

  for i in range(len(QAnswername)):
    QAnswerSentRow = []
    QAnswerSentRow.append(QAnswername[i]["title"])
    QAnswerSent.append(QAnswerSentRow)

  for i in range(len(questions)):
    Questions.append({
      "id": questions[i]["id"],
      "question": questions[i]["title"],
      "poster": questions[i]["poster"],
      "qOptions": QOptionsSent[i],
      "qAnswers": QAnswerSent[i],
    })

  dictO = {
    "name": Quizname[0]["title"],
    "questions": Questions,
  }

  print(dictO)
  return Response(dictO)



# @api_view(['GET'])
# def showSingleStudent(request, pk):

#     student = Student.objects.get(id=pk)
#     serilizer = StudentSerializer(student, many=False)
#     return Response(serilizer.data)

from datetime import date, timedelta

def daterange(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + timedelta(n)

# start_date = date(2013, 1, 1)
# end_date = date(2015, 6, 2)

def get_course_attribute_values(course_id):
  attributes = Attribute.objects.all()
  # print("attributes", attributes)
  print(len(attributes))
  import numpy as np
  course_attribute_value = np.zeros((len(attributes),))

  # print(course.id)
  chapters = Chapter.objects.filter(course=course_id)
  # print("chapters", chapters)
  for chapter in chapters:
    tutorials = Tutorial.objects.filter(chapter=chapter.id)
    practices = Practice.objects.filter(chapter=chapter.id)
    for tutorial in tutorials:
      for i, attr in enumerate(attributes):
        x = TutorialAttribute.objects.filter(tutorial_id=tutorial.id, attribute_id=attr.id).values('value')
        # print("attr", x)
        if len(x) > 0:
          course_attribute_value[i] += x[0]['value']
    
    for practice in practices:
      for i, attr in enumerate(attributes):
        x = PracticeAttribute.objects.filter(practice_id=practice.id, attribute_id=attr.id).values('value')
        # print("attr", x)
        if len(x) > 0:
          course_attribute_value[i] += x[0]['value']

  print("course_attribute_value", course_attribute_value)
  return course_attribute_value




def get_track_attribute_values(track_id):
  attributes = Attribute.objects.all()
  # print("attributes", attributes)
  print(len(attributes))
  import numpy as np

  # courses = Course.objects.filter(track=enrolled_tracks_ids)
  # print("current_track", track_id)
  courses = Course.objects.filter(career_track=track_id)
  # print("courses", courses) 
  track_attribute_value = np.zeros((len(attributes),))
  for course in courses:
    # print(course.id)
    chapters = Chapter.objects.filter(course=course.id)
    # print("chapters", chapters)
    for chapter in chapters:
      tutorials = Tutorial.objects.filter(chapter=chapter.id)
      practices = Practice.objects.filter(chapter=chapter.id)
      for tutorial in tutorials:
        for i, attr in enumerate(attributes):
          x = TutorialAttribute.objects.filter(tutorial_id=tutorial.id, attribute_id=attr.id).values('value')
          # print("attr", x)
          if len(x) > 0:
            track_attribute_value[i] += x[0]['value']
      
      for practice in practices:
        for i, attr in enumerate(attributes):
          x = PracticeAttribute.objects.filter(practice_id=practice.id, attribute_id=attr.id).values('value')
          # print("attr", x)
          if len(x) > 0:
            track_attribute_value[i] += x[0]['value']

  print("track_attribute_value", track_attribute_value)
  return track_attribute_value


@api_view(['POST'])
def enroll_track(request):
  print(request.data)
  serializer = UserTrackSerializer2(data=request.data)
  print("here")
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)  

  return Response({"message": "success"})


@api_view(['POST'])
def enroll_course(request):
  print(request.data)

  serializer = UserCourseSerializer2(data=request.data)
  print("here")
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)  

  return Response({"message": "success"})


@api_view(['GET'])
def get_course_recommendation(request):
  user_id = request.GET.get('user_id', '')
  print("user_id", user_id)
  track_id = request.GET.get('track_id', '')
  print("track_id", track_id)
  # course_id = request.GET.get('course_id', '')
  # print("course_id", course_id)
  # Get all courses in the track
  all_course_ids = [x.id for x in Course.objects.filter(career_track=track_id)]
  print("all_course_ids", all_course_ids)
  # Get all courses that the user has enrolled in
  enrolled_courses = [x.course.id for x in UserCourse.objects.filter(user_id=user_id)]
  print("enrolled_courses", enrolled_courses)
  # Get all courses that the user has not enrolled in
  not_enrolled_courses = list(set(all_course_ids) - set(enrolled_courses))

  if len(not_enrolled_courses) == 0:
    return Response([])

  print("not_enrolled_courses", not_enrolled_courses)
  import numpy as np
  # Enrolled courses attribute values
  enrolled_course_attribute_values = []
  attributes = Attribute.objects.all()
  for course in enrolled_courses:
    enrolled_course_attribute_values.append(get_course_attribute_values(course))
  avg_enrolled_course_attribute_value = np.zeros((len(attributes),))
  if len(enrolled_course_attribute_values) > 0:  
    avg_enrolled_course_attribute_value = np.mean(enrolled_course_attribute_values, axis=0)
  print("avg_enrolled_course_attribute_value", avg_enrolled_course_attribute_value)

  # Not enrolled courses attribute values
  not_enrolled_course_attribute_values = []
  dot_products = []
  for course in not_enrolled_courses:
    value = get_course_attribute_values(course)
    not_enrolled_course_attribute_values.append(value)
    dot_products.append(np.dot(value, avg_enrolled_course_attribute_value))
  
  print("not_enrolled_track_attribute_values", not_enrolled_course_attribute_values)
  print("dot_products", dot_products)
  NUM_RECOM = 2
  max_dot = np.argmax(dot_products)
  # max_dot = np.argpartition(dot_products, -NUM_RECOM)[-NUM_RECOM:]
  dot_products[max_dot] = 1000
  min_dot = np.argmin(dot_products)
  print("max_dot", max_dot)
  print("min_dot", min_dot)
  similar_course = [not_enrolled_courses[max_dot]]
  dissimilar_course = [not_enrolled_courses[min_dot]]
  dissimilar_course = list(set(dissimilar_course) - set(similar_course))
  print("similar_course", similar_course)
  print("dissimilar_course", dissimilar_course)


  similar_course_data = []
  for course in similar_course:
    similar_course_data.extend(
          list({"id": output3.id, "name":output3.title, "des": output3.description, 
          "progress":"0", "isRunning":"true", 
          "header": "Similiar Course", "button": "Start",
          "track_id": track_id}
          for output3 in Course.objects.filter(id=course))
      )
  print("similar_course_data", similar_course_data)
  dissimilar_course_data = []
  for course in dissimilar_course:
    dissimilar_course_data.extend(
          list({"id": output4.id, "name":output4.title, "des": output4.description, 
          "progress":"0", "isRunning":"true", 
          "header": "Explore Course", "button": "Start",
          "track_id": track_id}
          for output4 in Course.objects.filter(id=course))
      )
  print("dissimilar_course_data", dissimilar_course_data)

  # return Response({"similar_course": similar_course_data, "dissimilar_course": dissimilar_course_data})
  # return Response({})
  return Response(similar_course_data + dissimilar_course_data)


@api_view(['GET'])
def get_attribute_recommendation(request):
  user_id = request.GET.get('user_id', '')
  print('User id is {}'.format(user_id))
  enrolled_tracks = UserCareerTrack.objects.filter(user=user_id)
  enrolled_tracks_ids = [track.track_id for track in enrolled_tracks]
  print("enrolled_tracks", enrolled_tracks_ids)
  all_tracks = [x["id"] for x in CareerTrack.objects.all().values('id')]
  print("all_tracks", all_tracks)
  not_enrolled_tracks = list(set(all_tracks) - set(enrolled_tracks_ids))
  print("not_enrolled_tracks", not_enrolled_tracks)

  if len(not_enrolled_tracks) == 0:
    return Response([{}])

  # return Response({})

  enrolled_track_attribute_values = []
  for current_track in enrolled_tracks_ids:
    value = get_track_attribute_values(current_track)
    enrolled_track_attribute_values.append(value)
  
  attributes = Attribute.objects.all()
  
  import numpy as np
  if len(enrolled_track_attribute_values) == 0:
    avg_track_value = np.zeros((len(attributes),))
  else:
    avg_track_value = np.mean(enrolled_track_attribute_values, axis=0)  
  print("enrolled_track_attribute_values", enrolled_track_attribute_values)
  print("avg_track_value", avg_track_value)

  not_enrolled_track_attribute_values = []
  dot_products = []
  for current_track in not_enrolled_tracks:
    value = get_track_attribute_values(current_track)
    not_enrolled_track_attribute_values.append(value)
    dot_products.append(np.dot(avg_track_value, value))
  
  print("not_enrolled_track_attribute_values", not_enrolled_track_attribute_values)
  print("dot_products", dot_products)
  max_dot = np.argmax(dot_products)
  dot_products[max_dot] = 1000
  min_dot = np.argmin(dot_products)
  print("max_dot", max_dot)
  print("min_dot", min_dot)
  similar_track = [not_enrolled_tracks[max_dot]]
  dissimilar_track = [not_enrolled_tracks[min_dot]]
  dissimilar_track = list(set(dissimilar_track) - set(similar_track))
  print("similar_track", similar_track)
  print("dissimilar_track", dissimilar_track)

  similar_track_data = []
  for track in similar_track:
    x = CareerTrack.objects.filter(id=track).values('id', 'title', 'description', 'intro_video__link')
    print("x", x)
    if len(x) > 0:
      similar_track_data.append(
            {"id": x[0]["id"],"title":x[0]["title"],"des":x[0]["description"], 
            "link": x[0]["intro_video__link"]
            }
      )
  
  dissimilar_track_data = []
  for track in dissimilar_track:
    dissimilar_track_data.extend(
          list({"id": output5.id,"title":output5.title,"des":output5.description,
          # "link": output4.video__link
          }
          for output5 in CareerTrack.objects.filter(id=track))
        )
  
  print("similar_track_data", similar_track_data)
  print("dissimilar_track_data", dissimilar_track_data)

  
  # return Response({
  #   "similar_track": similar_track_data,
  #   "dissimilar_track": dissimilar_track_data 
  # })

  if len(similar_track_data) == 0:
    return Response([{}])
  
  print(similar_track_data[0])
  
  return Response(similar_track_data[0])

@api_view(['GET'])
def get_freeslot(request):
  user_id = request.GET.get('user_id', '')
  print('User id is {}'.format(user_id))
  slots = FreeSlot.objects.filter(user__id = user_id)
  # return Response({})
  slots = iter(slots)
  # slot = slots[0] # assumes slot
  slot = next(slots)
  slot_range = daterange(slot.start_date, slot.end_date)
  slot_obj = next(slot_range)
  print(slot_range)
  # return Response({})

  # Get the enrolled tracks of the user
  enrolled_tracks = UserCareerTrack.objects.filter(user=user_id)
  enrolled_tracks_ids = [track.track_id for track in enrolled_tracks]
  print(("enrolled_tracks", enrolled_tracks_ids))
  UserTutorialsFreeslot.objects.all().delete()
  UserPracticeFreeslot.objects.all().delete()
  if len(enrolled_tracks_ids) > 0:
    current_limit = 0
    # max_limit = 60*60
    max_limit = 20*60
    sched_done = False
    # current_track = enrolled_tracks_ids[0]
    for current_track in enrolled_tracks_ids:
      # courses = Course.objects.filter(track=enrolled_tracks_ids)
      print("current_track", current_track)
      courses = Course.objects.filter(career_track=current_track)
      print("courses", courses)
      for course in courses:
        print(course.id)
        chapters = Chapter.objects.filter(course=course.id)
        print("chapters", chapters)
        for chapter in chapters:
          tutorials = Tutorial.objects.filter(chapter=chapter.id)
          practices = Practice.objects.filter(chapter=chapter.id)
          print("tutorials", tutorials)
          print("practices", practices)
          ordered_tasks = []
          for tutorial in tutorials:
            print("tutorial order", tutorial.order)
            video = Video.objects.filter(id=tutorial.video_id)[0]
            print("video", video)
            # video_link = MEDIA_ROOT/str(video[0].link)
            # from moviepy.editor import VideoFileClip
            # clip = VideoFileClip(str(video_link))
            # duration_seconds       = clip.duration
            # print(type(duration))
            # print("video_link", video_link)
            duration_seconds = video.duration
            print("duration", duration_seconds)
            ordered_tasks.append((tutorial.order, duration_seconds, tutorial))
          print("ordered_tasks", ordered_tasks)
          for practice in practices:
            print("practice order", practice.order)
            duration_seconds = practice.duration*60
            print("duration", duration_seconds)
            ordered_tasks.append((practice.order, duration_seconds, practice))
          
          # sort ordered task by order
          ordered_tasks.sort(key=lambda x: x[0])
          print("sorted_order", ordered_tasks)
          for task in ordered_tasks:
            if current_limit + task[1] <= max_limit:
              current_limit += task[1]
              print("schedule", task[2], "at", slot_obj)
              if isinstance(task[2], Tutorial):
                schedule = UserTutorialsFreeslot(user_id=user_id, tutorial=task[2], date=slot_obj)
                schedule.save()
              else:
                schedule = UserPracticeFreeslot(user_id=user_id, practice=task[2], date=slot_obj)
                schedule.save()
            else:
              try:
                slot_obj = next(slot_range)
                current_limit = task[1]
                print("schedule", task[2], "at", slot_obj)
                if isinstance(task[2], Tutorial):
                  schedule = UserTutorialsFreeslot(user_id=user_id, tutorial=task[2], date=slot_obj)
                  schedule.save()
                else:
                  schedule = UserPracticeFreeslot(user_id=user_id, practice=task[2], date=slot_obj)
                  schedule.save()
              except Exception as e:
                try:
                  slot = next(slots)
                  slot_range = daterange(slot.start_date, slot.end_date)
                  slot_obj = next(slot_range)
                  current_limit = task[1]
                  if isinstance(task[2], Tutorial):
                    schedule = UserTutorialsFreeslot(user_id=user_id, tutorial=task[2], date=slot_obj)
                    schedule.save()
                  else:
                    schedule = UserPracticeFreeslot(user_id=user_id, practice=task[2], date=slot_obj)
                    schedule.save()
                except Exception as e:
                  # raise e
                  sched_done = True
                  break

                # raise e

          if sched_done: break
          # break
          print("ordered_tasks", ordered_tasks)
        if sched_done: break
        # break
        # practices = Practice.objects.filter(chapter__id=course.id)
        # for tutorial in tutorials:
          # print(tutorial.id)
  
  

  output = [
    # output  
    {
      'id': output.id, 
      'start_date': output.start_date.strftime("%Y-%m-%d %H:%M"), 
      'end_date': output.end_date.strftime("%Y-%m-%d %H:%M")
    }
    for output in FreeSlot.objects.filter(user__id = user_id)
  ]
  print(output)

  return Response(output)


@api_view(["POST"])
def add_freeslot(request):
  start_date = request.data.get('start_date', '')
  start_time = request.data.get('start_time', '')
  end_date = request.data.get('end_date', '')
  end_time = request.data.get('end_time', '')
  user_id = request.data.get('user_id', '')

  start_date = datetime.datetime.strptime(start_date + " " + start_time, "%Y-%m-%d %H:%M")
  end_date = datetime.datetime.strptime(end_date + " " + end_time, "%Y-%m-%d %H:%M")
  print(start_date, end_date)
  # request.data['start_date'] = start_date
  # request.data['end_date'] = end_date
  # print(request.data)
  data = {
    'user': user_id,
    'start_date': start_date,
    'end_date': end_date,
  }

  print(data)
  serializer = FreeSlotSerializer(data=data)
  
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

  print('start date is {}'.format(start_date))
  print('start time is {}'.format(start_time))
  print('end date is {}'.format(end_date))
  print('end time is {}'.format(end_time))
  print('user id is {}'.format(user_id))

  return Response()



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


  if len(output)>0:
    UserCourse.objects.filter(id=output[0]["id"]).update(active_tutorial=tutorialid, active_practice=practiceid)
  else:
    serializer = UserCourseSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

  return Response('Item save successfully!')


@api_view(['POST'])
def save_question_status(request):

  print(request.data)
  print(request.data["status"])

  output = [
    {'id': output.id,}
    # output
    for output in UserQuestions.objects.filter(user__id = request.data["user"], question__id = request.data["question"])
  ]

  print(output)
  print(len(output))
 # print(output[0]["id"])
  

  if len(output)>0:
    print("update")
    UserQuestions.objects.filter(id=output[0]["id"]).update(status=request.data["status"])

  else:
    print("create")
    serializer = UserQuestionsSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

  print("done")

  return Response('Item save successfully!')


@api_view(['GET'])
def get_quiz_status(request):
  quizid = request.GET.get('quizid', '')
  userid = request.GET.get('userid', '')
  
  print('dhuksi kintu bujhlam na quiz id is {}'.format(quizid))


  Quizname = [
    # output
    {'title': output.title}
    for output in Practice.objects.filter(id = quizid)
  ]

  questions = [
    # output
    {'id': output.id, 'title': output.title}
    for output in Question.objects.filter(practice__id = quizid)
  ]

  print(questions)
  QOptions = []
  
  c = 0
  for i in questions:
    QOptions.insert(c, 
        list({"id": output3.id, "name":output3.title}
        for output3 in Option.objects.filter(question__id = i["id"]))
    )
    c = c + 1

  print(QOptions)


  QAnswer = []
  
  for i in questions:
    QAnswer.extend(
        list({"id": output3.id, "optionid":output3.correct_option_id}
        for output3 in Answer.objects.filter(question__id = i["id"]))
    )

  print(QAnswer)

  QAnswername = []
  for i in QAnswer:
    QAnswername.extend(
        list({"title":output3.title}
        for output3 in Option.objects.filter(id = i["optionid"]))
    )

  print(QAnswername)


  Questions = []

  QOptionsSent = []
  for i in range(len(QOptions)): 
    QOptionsSentRow = []
    for j in range(len(QOptions[i])):
      QOptionsSentRow.append(QOptions[i][j]["name"])
    QOptionsSent.append(QOptionsSentRow)
  
  QAnswerSent = []

  for i in range(len(QAnswername)):
    QAnswerSentRow = []
    QAnswerSentRow.append(QAnswername[i]["title"])
    QAnswerSent.append(QAnswerSentRow)

  for i in range(len(questions)):
    Questions.append({
      "id": questions[i]["id"],
      "question": questions[i]["title"],
      "qOptions": QOptionsSent[i],
      "qAnswers": QAnswerSent[i],
    })

  questions = [
    # output
    {'id': output.id}
    for output in Question.objects.filter(practice__id = quizid)
  ]

  print(questions)
  print("hoise question print ki jani")
  QStatus = []

  c = 0
  for i in questions:
    QStatus.insert(c, 
        list({"question": output3.question_id, "status":output3.status}
        for output3 in UserQuestions.objects.filter(question = i["id"], user = userid))
    )
    c = c + 1
  
  print(QStatus)
  print("hoise status print ki jani")

  dictO = {
    "name": Quizname[0]["title"],
    "questions": Questions,
  }

  quizResultContent = {
    "quizContent" : dictO,
    "status": QStatus,
  }

  return Response(quizResultContent)





@api_view(['GET'])
def get_practice_score(request):
  practiceid = request.GET.get('practiceid', '')
  userid = request.GET.get('userid', '')

  score = calc_practice_score_corrects(practiceid, userid)
  
  return Response(score)


# get practice score
def calc_practice_score(practice_id, userid):

    questions = [
      {'id': output.id}
      for output in Question.objects.filter(practice__id = practice_id)
    ]

    print("paisi questions")
    # print(questions)

    QStatus = []
    cc = 0
    for j in questions:
      QStatus.insert(cc, 
          list({"status":output3.status}
          for output3 in UserQuestions.objects.filter(question = j["id"], user = userid))
      )
      cc = cc + 1
    
    print("paisi QStatus")
    print(QStatus)

    QAnswer = []
  
    for j in questions:
      QAnswer.extend(
          list({"id": output3.id, "optionid":output3.correct_option_id}
          for output3 in Answer.objects.filter(question__id = j["id"]))
      )
    
    QAnswername = []
    for j in QAnswer:
      QAnswername.extend(
          list({"title":output3.title}
          for output3 in Option.objects.filter(id = j["optionid"]))
      )

    print("paisi QAnswername")
    print(QAnswername)
    
    correct = 0
    print(QStatus)
    print(QAnswername)
    for j in range(len(QStatus)):
      if len(QStatus[j]) > 0:
        if (QStatus[j][0]["status"] == QAnswername[j]["title"]):
          correct = correct+1
      
    
    score = round(correct*100/(len(questions)+0.0001))
    
    print(score)

    return score




# get practice score 3/4 formate
def calc_practice_score_corrects(practice_id, userid):

    questions = [
      {'id': output.id}
      for output in Question.objects.filter(practice__id = practice_id)
    ]

    print("paisi questions")
    # print(questions)

    QStatus = []
    cc = 0
    for j in questions:
      QStatus.insert(cc, 
          list({"status":output3.status}
          for output3 in UserQuestions.objects.filter(question = j["id"], user = userid))
      )
      cc = cc + 1
    
    print("paisi QStatus")
    print(QStatus)

    QAnswer = []
  
    for j in questions:
      QAnswer.extend(
          list({"id": output3.id, "optionid":output3.correct_option_id}
          for output3 in Answer.objects.filter(question__id = j["id"]))
      )
    
    QAnswername = []
    for j in QAnswer:
      QAnswername.extend(
          list({"title":output3.title}
          for output3 in Option.objects.filter(id = j["optionid"]))
      )

    print("paisi QAnswername")
    print(QAnswername)
    
    correct = 0
    print(QStatus)
    print(QAnswername)
    for j in range(len(QStatus)):
      if len(QStatus[j]) > 0:
        if (QStatus[j][0]["status"] == QAnswername[j]["title"]):
          correct = correct+1
      
    
    score = str(correct)+"/"+str(len(questions))
    
    print(score)

    return score








#daily challenge
@api_view(['GET'])
def get_daily_challenge_list(request):
  courseid = request.GET.get('courseid', '')
  userid = request.GET.get('userid', '')

  from datetime import date
  today = date.today()

  daily_challenge_already_list = [
    output.practice.id
    for output in DailyChallenge.objects.filter(user = userid, date = today)
  ]

  if len(daily_challenge_already_list) == 0:
    free_slot = [
      {
        'start_date': output.start_date, 'end_date': output.end_date
      }
      for output in FreeSlot.objects.filter(user = userid)
    ]

    isFree = False
    for i in range(len(free_slot)):
      s_d = free_slot[i]["start_date"].strftime("%Y-%m-%d")
      e_d = free_slot[i]["end_date"].strftime("%Y-%m-%d")
      y, m, d = [int(x) for x in s_d.split('-')]  
      ye, me, de = [int(x) for x in e_d.split('-')]
      start_date = date(y, m, d)
      end_date = date(ye, me, de)

      if start_date <= today <= end_date:
        isFree = True
        break

    practice_count = 2
    if isFree:
      practice_count = 5
    else:
      practice_count = 2
    

    chapters = [
      output.id
      for output in Chapter.objects.filter(course__id = courseid)
    ]

    practiceList = []
    daily_challenge_list = []
    for i in range(len(chapters)):
      practice = [
        {'id': output.id, 'title': output.title, 'description': output.description, 'score': calc_practice_score(output.id, userid), 'level': output.level}
        for output in Practice.objects.filter(chapter__id = chapters[i], type = "practice")
      ]
      practiceList += practice

    count = 0
    for i in range(len(practiceList)):
      if practiceList[i]["score"] < 50:
        daily_challenge_list.append(practiceList[i])
        count = count + 1
        if count >= practice_count:
          break

    for i in range(len(daily_challenge_list)):
      DailyChallenge.objects.create(user = User.objects.get(id = userid), practice = Practice.objects.get(id = daily_challenge_list[i]["id"]), date = today)
    
    return Response(daily_challenge_list)

  else:

    daily_challenge_list = []
    for i in range(len(daily_challenge_already_list)):
      practice = [
        {'id': output.id, 'title': output.title, 'description': output.description, 'score': calc_practice_score(output.id, userid), 'level': output.level}
        for output in Practice.objects.filter(id=daily_challenge_already_list[i])
      ]
      daily_challenge_list += practice
    return Response(daily_challenge_list)


