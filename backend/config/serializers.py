from rest_framework import serializers
from django.contrib.auth import get_user_model,models
from rest_framework_simplejwt.state import token_backend
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
User = get_user_model()





class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # user_dict = ListUserSerializer(user).data

        # token["user"] = user_dict

        # token["permissions"] = list(user.get_all_permissions())

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        my_user = User.objects.filter(pk=self.user.id).first()
        if my_user:
            data['user'] = my_user

        return data




class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super(CustomTokenRefreshSerializer, self).validate(attrs)
        decoded_payload = token_backend.decode(data['access'], verify=True)

        user_uid = decoded_payload['user_id']

        # print(user_uid)

        my_user = User.objects.filter(pk=user_uid).first()
        if my_user:
            # use user serelizor or parse required fields
            data['user'] = my_user

        return data




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
