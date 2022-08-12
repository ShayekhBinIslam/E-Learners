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
  userid = request.GET.get('userid', '')
  # print('Chapter id is {}'.format(chapterid))
  output = [
    # output
    {'id': output.id, 'title': output.title, 'progress': "50", 'length': "9 mins"}
    for output in Tutorial.objects.filter(chapter__id = chapterid)
  ]

  practice = [
    {'id': output.id, 'title': output.title, 'description': output.description, 'length': output.duration, 'level': output.level}
    for output in Practice.objects.filter(chapter__id = chapterid)
  ]

  practiceStatus = []
  
  c = 0
  for i in practice:

    questions = [
      {'id': output.id}
      for output in Question.objects.filter(practice__id = i["id"])
    ]

    QStatus = []
    cc = 0
    for i in questions:
      QStatus.insert(cc, 
          list({"status":output3.status}
          for output3 in UserQuestions.objects.filter(question = i["id"], user = userid))
      )
      cc = cc + 1
    
    QAnswer = []
  
    for i in questions:
      QAnswer.extend(
          list({"id": output3.id, "optionid":output3.correct_option_id}
          for output3 in Answer.objects.filter(question__id = i["id"]))
      )
    
    QAnswername = []
    for i in QAnswer:
      QAnswername.extend(
          list({"title":output3.title}
          for output3 in Option.objects.filter(id = i["optionid"]))
      )
    
    correct = 0
    for i in range(QStatus):
      if (QStatus[i][0]["status"] == QAnswername[i][0]["title"]):
        correct = correct+1
      


    practiceStatus.insert(c, 
        round(correct*100/len(questions))
    )
    c = c + 1

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
