from django.shortcuts import render
from django.contrib.auth.models import Group, Permission
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import RoleSerializer, ListRoleSerializer, CreateRoleSerializer, PermissionSerializer


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def perform_create(self, serializer):
    #     serializer.save()

    def get_serializer_class(self):
        if self.action == "list":
            return ListRoleSerializer
        elif self.action == "create":
            return CreateRoleSerializer
        elif self.action == "update":
            return CreateRoleSerializer

        return super().get_serializer_class()


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [permissions.IsAuthenticated]
