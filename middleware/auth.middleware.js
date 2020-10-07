const jwt = require('jsonwebtoken');
const config = require('config');

// Прослойка которая проверяет авторизован ли пользователь
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    // Достаем token из хедеров запроса
    const token = req.headers.authorization.split(' ')[1];

    // Если токена нет, то отправляем код с ошибкой и соответствующим сообщением
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    // Раскодируем токен с помощью библиотеки "jsonwebtoken"
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Нет авторизации' });
  }
}