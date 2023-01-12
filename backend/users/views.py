from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets
from .serializers import UserSerializer, CreateUserSerializer, UpdateUserSerializer, ListUserSerializer, ChangeUserPasswordSerializer
from django.contrib.auth import get_user_model
from access.permissions import CustomDjangoModelPermissions

User = get_user_model()


# class RegisterView(APIView):
#     def post(self, request):
#         data = request.data

#         serializer = CreateUserSerializer(data=data)

#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         user = serializer.create(serializer.validated_data)
#         user = UserSerializer(user)

#         return Response(user.data, status=status.HTTP_201_CREATED)


# class RetrieveUserView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         user = UserSerializer(user)

#         return Response(user.data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [CustomDjangoModelPermissions]

    def get_serializer_class(self):

        if self.action == "list":
            return ListUserSerializer
        if self.action == "create":
            return CreateUserSerializer
        if self.action == "update":
            return UpdateUserSerializer
        if self.action == "change_password":
            return ChangeUserPasswordSerializer

        return super().get_serializer_class()

    @action(detail=True, methods=['post'])
    def change_password(self, request, pk=None):
        user: User = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user.set_password(serializer.validated_data['password1'])
            user.save()
            return Response({'status': f'{user.email} Password Changed'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
