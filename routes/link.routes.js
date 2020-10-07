const { Router } = require('express');
const config = require('config');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');
const shortid = require('shortid');
const router = Router();

// Роут для генерации сокращенной ссылки
router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;
    // Генерируем короткий код для ссылки
    const code = shortid.generate();

    // Ищем ссылку по полю from в базе
    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    // Лепим короткую ссылку
    const to = baseUrl + '/t/' + code;
    // Создаем ссылку в базе
    const link = new Link({ code, to, from, owner: req.user.userId });

    // Ждем сохранения ссылки
    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  }
});


// Роут для получения всех ссылок пользователя
router.get('/', auth, async (req, res) => {
  try {
    // Получаем все ссылки по полю owner === id пользователя
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  }
});

// Роут для удаления ссылки по id
router.delete('/', auth, async (req, res) => {
  try {
    // Удаляем ссылку
    const { deletedCount } = await Link.deleteOne({ _id: req.body.id });
    
    if (deletedCount) {
      const links = await Link.find({ owner: req.user.userId });

      return res.json({ message: "Ссылка успешно удалена", links });
    }

    res.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  } catch (e) {
    res.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  }
});

// Роут для получения ссылки
router.get('/:id', auth, async (req, res) => {
  try {
    // Получаем ссылку по id
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Что то пошло не так, попробуйте снова" });
  }
});

module.exports = router; 