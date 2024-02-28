# Установите Node.js как базовый образ
FROM node:20

# Установите рабочую директорию в контейнере
WORKDIR /app

# Скопируйте файлы `package.json` и `package-lock.json` (или `yarn.lock`)
COPY package*.json ./

# Установите зависимости проекта
RUN npm install

# Скопируйте оставшиеся файлы проекта
COPY . .

# Соберите приложение для продакшена
RUN npm run build

# Запустите сервер раздачи статических файлов
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
