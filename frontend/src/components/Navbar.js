import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.jpg';

function MainNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
              src={logo}
              width="30" // Установите ширину логотипа
              height="30" // Установите высоту логотипа
              className="d-inline-block align-top"
              alt="Логотип" // Текст альтернативы для доступности
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
                // Пользователь залогинен: показываем ссылку на профиль
                <>
                <LinkContainer to="/profile">
                  <Nav.Link>Профиль</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
              </>
            ) : (
              // Пользователь не залогинен: показываем ссылки на вход и регистрацию
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Войти</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Регистрация</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
