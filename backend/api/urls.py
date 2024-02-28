from django.urls import path
from .views import UserCreate, LogoutView, CustomObtainAuthToken, UserProfileView

urlpatterns = [
    path('login/', CustomObtainAuthToken.as_view(), name='api_token_auth'),
    path('register/', UserCreate.as_view(), name='api_register'),
    path('logout/', LogoutView.as_view(), name='api_logout'),
    path('profile/', UserProfileView.as_view(), name='api_user_profile'),
]