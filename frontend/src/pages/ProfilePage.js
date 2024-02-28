import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Замените URL на адрес вашего API
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Предполагаем, что токен сохраняется в localStorage
        const config = {
          headers: {
            Authorization: `Token ${token}`
          }
        };
        const response = await axios.get('http://localhost:8000/api/profile/', config);
        setUser(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных профиля:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Имя:</b> {user.first_name}</p>
      <p><b>Фамилия:</b> {user.last_name}</p>
    </div>
  );
};

export default ProfilePage;
