import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Импортируем Link

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState(''); // Для сообщений об успехе или ошибке
  const [messageType, setMessageType] = useState(''); // 'success' или 'danger'
  const [isRegistered, setIsRegistered] = useState(false);


  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { first_name: firstName, last_name: lastName, email: email, password: password };

    try {
      const response = await fetch(`${API_BASE_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Ошибка при регистрации');
        setMessageType('danger');
        return;
      }

      const data = await response.json();
      setMessage('Регистрация прошла успешно! Вы можете войти.');
      setMessageType('success');
      // Очистка формы
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setIsRegistered(true);
    } catch (error) {
      setMessage('Ошибка сети или сервера');
      setMessageType('danger');
      console.error('Error:', error);
    }
  };


  return (
      <Container className="mt-3">
        <h2>Регистрация</h2>
      {isRegistered ? (
        // Рендерим сообщение об успешной регистрации с ссылкой
        <Alert variant="success">
          Регистрация прошла успешно! <Link to="/login">Войти</Link>
        </Alert>
      ) : (
        // Рендерим форму, если регистрация не была завершена
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required // Сделать поле обязательным
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required // Сделать поле обязательным
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      )}
      </Container>
  );
}

export default RegistrationForm;
