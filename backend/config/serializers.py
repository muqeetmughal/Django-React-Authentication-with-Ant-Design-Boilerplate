from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSerializerForToken(serializers.ModelSerializer):

    user_permissions = serializers.SerializerMethodField()

    class Meta:
        model = User
        # fields = "__all__"
        exclude = ('password',)

    def get_user_permissions(self, obj):
        return list(obj.get_all_permissions())


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
