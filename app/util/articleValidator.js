const { check } = require('express-validator');

//todo バリデーションを増やす

module.exports = [
    check('title').not().isEmpty().withMessage('必須項目です。'),
    check('items').not().isEmpty().withMessage('アイテムがありません'),
  ];