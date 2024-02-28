from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'email': {'required': True, 'allow_blank': False},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate_email(self, value):
        # Проверка уникальности email
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Данный адрес электронной почты уже используется.")
        return value

    def create(self, validated_data):
        # Создание нового пользователя
        user = User.objects.create_user(**validated_data)
        return user
