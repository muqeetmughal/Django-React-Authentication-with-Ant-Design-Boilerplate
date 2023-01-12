from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserSerializerForToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from authentication.serializers import MyTokenObtainPairSerializer, CustomTokenRefreshSerializer


User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # you need to instantiate the serializer with the request data
        serializer = self.serializer_class(data=request.data)

        # you must call .is_valid() before accessing validated_data
        serializer.is_valid(raise_exception=True)

        # get access and refresh tokens to do what you like with
        access = serializer.validated_data.get("access", None)
        refresh = serializer.validated_data.get("refresh", None)
        user = serializer.validated_data.get("user", None)
        # print(serializer.validated_data)

        # build your response and set cookie

        if access is not None:
            response = Response(
                {"access": access, "refresh": refresh, "user": UserSerializerForToken(user).data}, status=200)
            # response.set_cookie('refresh', refresh, httponly=True)
            return response

        return Response({"Error": "Something went wrong"}, status=400)


class CustomTokenRefreshView(TokenRefreshView):
    """
    Custom Refresh token View
    """
    serializer_class = CustomTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        # you need to instantiate the serializer with the request data
        serializer = self.serializer_class(data=request.data)

        # you must call .is_valid() before accessing validated_data
        serializer.is_valid(raise_exception=True)

        # get access and refresh tokens to do what you like with
        access = serializer.validated_data.get("access", None)
        refresh = serializer.validated_data.get("refresh", None)
        user = serializer.validated_data.get("user", None)

        # print(serializer.validated_data)

        # build your response and set cookie

        if access is not None:
            response = Response(
                {"access": access, "refresh": refresh, "user": UserSerializerForToken(user).data}, status=200)
            # response.set_cookie('refresh', refresh, httponly=True)
            return response

        return Response({"Error": "Something went wrong"}, status=400)


@ api_view(["GET"])
@ authentication_classes([JWTAuthentication])
@ permission_classes([IsAuthenticated])
def whoami(request):

    serializer = UserSerializer(request.user)
    return Response(serializer.data)
