# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

# from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework import viewsets

from .models import *
from .serializer import *


# Create your views here.


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
