const userController = require('../controllers/userController');
const { Router } = require('express');
const router = Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', userController.check);

module.exports = router;
