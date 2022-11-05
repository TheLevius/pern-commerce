const {
    Router
} = require('express');
const router = Router();

const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');

router.use('/users', userRouter);
router.use('/types', typeRouter);
router.use('/brands', brandRouter);
router.use('/devices', deviceRouter);

module.exports = router;