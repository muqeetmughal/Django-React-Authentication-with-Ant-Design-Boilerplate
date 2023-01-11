from rest_framework import serializers

from django.contrib.auth.models import Group, Permission


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions']



class ListRoleSerializer(RoleSerializer):
    class Meta(RoleSerializer.Meta):
        depth = 1

class CreateRoleSerializer(RoleSerializer):
    class Meta(RoleSerializer.Meta):
        pass








class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = "__all__"
class PermissionSerializerForUserPermissions(PermissionSerializer):
    class Meta(PermissionSerializer.Meta):
        fields = ["codename"]
