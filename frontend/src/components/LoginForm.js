import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Для отображения сообщений об ошибке
  const navigate = useNavigate(); // Получение функции navigate для перенаправления

const handleSubmit = async (event) => {
  event.preventDefault();

  const loginData = {
    email: email,
    password: password,
  };
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  let response; // Объявляем переменную здесь, чтобы она была доступна во всей функции

  try {
    response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error('Login failed'); // Выкидываем ошибку, если статус ответа не "ok"
    }

    const data = await response.json(); // Парсим JSON только после проверки статуса
    console.log('Login successful:', data);
    localStorage.setItem('token', data.token); // Сохраняем токен
    onLoginSuccess(data);
    navigate('/profile');
  } catch (error) {
    console.error('Login error:', error);
    setError('Failed to login. Please check your email and password.');
  }
};
  return (
    <Container>
      <h2>Вход в систему</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите ваш email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Пароль"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Войти</Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
