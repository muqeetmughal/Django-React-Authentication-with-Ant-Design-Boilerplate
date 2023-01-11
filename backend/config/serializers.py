from rest_framework import serializers
from django.contrib.auth import get_user_model,models
from access.serializers import PermissionSerializerForUserPermissions, PermissionSerializer

User = get_user_model()


class UserSerializerForToken(serializers.ModelSerializer):

    user_permissions = serializers.SerializerMethodField()
    all_permissions = serializers.SerializerMethodField()

    class Meta:
        model = User
        # fields = "__all__"
        exclude = ('password',)

    def get_user_permissions(self, obj):
        return list(obj.get_all_permissions())
    def get_all_permissions(self, obj):
        permissions = models.Permission.objects.all()
        permissions = [str(perm.content_type.app_label)+"."+str(perm.codename) for perm in permissions]
        print(permissions)
        return permissions


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
