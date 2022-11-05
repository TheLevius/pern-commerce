const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');
const {
    Router
} = require('express');
const router = Router();

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

module.exports = router;