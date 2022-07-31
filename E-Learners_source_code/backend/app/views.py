# from django.shortcuts import render
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
    return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

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
      return Response({'token':token,'msg':'Login Success','id': user.pk}, status=status.HTTP_200_OK)
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
  print(output)
  return Response(output)


@api_view(["GET"])
def get_tracks_list(request):
  serializer_class = CareerTrackSerializer
  output = [
      # {"employee": output.employee, "department": output.department}
      output
      for output in React.objects.all()
  ]

  print(output)
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

  print(serilizer.data)
  print(request.data)
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
