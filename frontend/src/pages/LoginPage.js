import React from 'react';
import LoginForm from '../components/LoginForm'; // Предполагается, что у вас уже есть этот компонент

function LoginPage() {
  const onLoginSuccess = (token) => {
    console.log('Login successful. Token:', token);
    // Сохранение токена в localStorage для последующего использования
    localStorage.setItem('authToken', token);
  };

  const handleLoginSuccess = (token) => {
    console.log('Token:', token);
    // Обработка успешного логина, например сохранение токена и редирект
  };

  return (
    <div>
           <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}

export default LoginPage;
