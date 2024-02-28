#!/bin/sh

# Выполнение миграций
python manage.py migrate --noinput

# Проверка, заданы ли переменные окружения для суперпользователя
if [ -z "$DJANGO_SUPERUSER_USERNAME" ] || [ -z "$DJANGO_SUPERUSER_EMAIL" ] || [ -z "$DJANGO_SUPERUSER_PASSWORD" ]; then
  echo "Environment variables for superuser are not set. Skipping superuser creation."
else
  echo "Creating superuser..."
  python manage.py createsuperuser --noinput || true  # Игнорируем ошибку, если пользователь уже существует
fi

## Запуск Gunicorn с вашим Django-приложением
#gunicorn lbreslav.wsgi:application --bind 0.0.0.0:8000
