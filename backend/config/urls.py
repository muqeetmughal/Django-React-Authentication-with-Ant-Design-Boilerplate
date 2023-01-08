
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from config.views import MyTokenObtainPairView, CustomTokenRefreshView
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')


urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view()),
    path('api/token/refresh/', CustomTokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    # path('api/users/', include('users.urls')),
    path('admin/', admin.site.urls),
]

urlpatterns += router.urls
