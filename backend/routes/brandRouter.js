const brandController = require('../controllers/brandController');
const {
    Router
} = require('express');
const router = Router();

router.post('/', brandController.create);
router.get('/', brandController.getAll);

module.exports = router;