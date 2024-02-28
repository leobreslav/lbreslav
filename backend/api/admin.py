from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Добавление дополнительных полей в форму создания пользователя
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {'fields': ()}),)
    # Добавление дополнительных полей в форму редактирования пользователя
    fieldsets = UserAdmin.fieldsets + ((None, {'fields': ()}),)

    # Настройка отображения пользователей в списке
    list_display = ('email', 'first_name', 'last_name', 'is_staff')

    ordering = ['email']

