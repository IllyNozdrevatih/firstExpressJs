const express = require('express');
const sequelize = require('../util/database');
const categoryControllers = require('../controllers/category');

const app = express();
const router = express.Router();

router.get('/', categoryControllers.index);
router.get('/create', categoryControllers.getCreate);
router.post('/create', categoryControllers.postCreate);
router.get('/update/:catId', categoryControllers.getUpdate);
router.post('/update', categoryControllers.postUpdate);
router.post('/delete', categoryControllers.delete);

module.exports = router;