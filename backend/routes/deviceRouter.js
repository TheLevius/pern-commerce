const deviceController = require('../controllers/deviceController');
const {
    Router
} = require('express');
const router = Router();

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;