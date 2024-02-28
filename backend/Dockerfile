# Используйте официальный образ Python 3.10 как базовый
FROM python:3.10

# Установите рабочую директорию в контейнере
WORKDIR /app

# Скопируйте файлы зависимостей в рабочую директорию
COPY requirements.txt ./

# Установите зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Скопируйте оставшуюся часть вашего проекта в контейнер
COPY . .


## Копирование скрипта инициализации в контейнер
#COPY init.sh /app/init.sh
#
## Назначение прав на выполнение скрипта
#RUN chmod +x /app/init.sh
#
## Запуск скрипта при старте контейнера
#CMD ["/app/init.sh"]

# Сбор статических файлов
RUN python manage.py collectstatic --noinput

# Запустите ваше Django-приложение с помощью Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "lbreslav.wsgi:application"]
