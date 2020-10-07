const { Schema, model, Types } = require('mongoose');

// Схема одного пользователя в mongo
const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }]
});

module.exports = model('User', schema);