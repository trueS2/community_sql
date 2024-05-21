const postController = require('../controllers/post.controller');

const express = require('express');

const router = express.Router();

router.get('/', postController.render);

router.post('/', postController.createPost);

router.get('/:id', postController.readPost);

router.patch('/:id', postController.updatePost);

module.exports = router