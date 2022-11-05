const typeController = require('../controllers/typeController');
const {
    Router
} = require('express');
const router = Router();

router.post('/', typeController.create);
router.get('/', typeController.getAll);

module.exports = router;