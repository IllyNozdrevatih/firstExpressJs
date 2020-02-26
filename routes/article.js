const express = require('express');
const sequelize = require('../util/database');
const articleControllers = require('../controllers/article');

const app = express();
const router = express.Router();

router.get('/', articleControllers.index);
router.get('/create', articleControllers.getCreate);
router.post('/create', articleControllers.postCreate);
router.get('/:artId', articleControllers.read);
router.get('/update/:artId', articleControllers.getUpdate);
router.post('/update', articleControllers.postUpdate);
router.post('/delete', articleControllers.delete);

module.exports = router;