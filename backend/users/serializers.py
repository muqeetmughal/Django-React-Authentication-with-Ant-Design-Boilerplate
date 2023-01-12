from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from django.contrib.auth import get_user_model, models
from django.contrib.auth.hashers import make_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # extra_kwargs = {'password': {'write_only': True}}
        extra_kwargs = {'last_login': {'read_only': True},
                        'is_superuser': {'read_only': True},
                        'is_staff': {'read_only': True},
                        'password': {'write_only': True}
                        }


class ListUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        depth = 1


class CreateUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        pass

    # def validate(self, data):
    #     print("Data", data)
    #     if data['password1'] != data['password2']:
    #         raise serializers.ValidationError("passwords not matched")
    #     return data

    def create(self, validated_data):

        groups = validated_data.pop("groups")
        user_permissions = validated_data.pop("user_permissions")

        user = User(**validated_data)
        print(user)

        user.set_password(validated_data["password"])
        # groups_list = models.Group.objects.filter(pk__in=groups)
        user.save()
        user.groups.set(groups)
        user.user_permissions.set(user_permissions)

        return user


class UpdateUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        exclude = ["password"]
        fields = None


class ChangeUserPasswordSerializer(serializers.Serializer):
    password1 = serializers.CharField(
        write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    # def validate(self, attrs):
    #     if attrs['password1'] != attrs['password2']:
    #         raise serializers.ValidationError({"password": "Password fields didn't match."})

    #     return attrs

    def update(self, instance, validated_data):
        # instance.password = validated_data.get('password', instance.password)

        # if not validated_data['new_password']:
        #       raise serializers.ValidationError({'new_password': 'not found'})

        # if not validated_data['old_password']:
        #       raise serializers.ValidationError({'old_password': 'not found'})

        if validated_data['password1'] != validated_data['password2']:
            raise serializers.ValidationError(
                {'passwords': 'passwords do not match'})

        if validated_data['password1'] == validated_data['password2']:
            # instance.password = validated_data['new_password']
            print(instance.password)
            instance.set_password(validated_data['password1'])
            print(instance.password)
            instance.save()
            return instance

        return instance
