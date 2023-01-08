from django.urls import path
from .views import RegisterView, RetrieveUserView, UserViewSet
# from rest_framework.routers import DefaultRouter


# router = DefaultRouter()
# router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieveUserView.as_view()),
]
# urlpatterns += router.urls
