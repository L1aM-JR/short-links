const { Router } = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = Router();
const config = require('config');

// Роут для регистрации пользователя
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      // Проверяем данные запроса с помощью 'express-validator'
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          erros: errors.array(),
          message: "Некорректные данные при регистрации"
        });
      }

      const { email, password } = req.body;
      // Ищем пользователя по полю email в базе
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Такой пользователь уже существует" });
      }

      // Хешируем пароль с помощью библиотеки "bcryptjs"
      const hashedPassword = await bcrypt.hash(password, 12);
      // Создаем нового пользователя в базе с полями email(который пришел с фронта) и паролем (захешированным)
      const user = new User({ email, password: hashedPassword });

      // Ждем сохранения пользователя в базе
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      res.status(201).json({ message: 'Пользователь создан', token, userId: user.id });

    } catch (e) {
      res.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
    }
  }
);

// Роут для авторизации пользователя
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему"
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      // Проверяем введенный пароль с паролем в базе (захешированным) с помощью "bcryptjs"
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль, попробуйте снова" });
      }

      // Создаем токен с помощью 'jsonwebtoken'
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      // Возвращаем на фронт токен и id пользователя
      res.json({ token, userId: user.id });

    } catch (e) {
      res.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;