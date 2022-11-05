const uuid = require('uuid');
const path = require('path');
const {
    Device,
    DeviceInfo
} = require('../models/models');
const ApiError = require('../error/ApiError');
class DeviceController {
    async getAll(req, res) {

        const valuableParams = {};
        const {
            brandId,
            typeId,
            page = 1,
            limit = 12
        } = req.query;

        const offset = page * limit - limit;

        const queryFilters = Object.keys({
            brandId,
            typeId
        })
        if (queryFilters.length > 0) {

            for (const key of queryFilters) {
                if (queryFilters?. [key] || queryFilters?. [key] === 0) {
                    valuableParams[key] = queryFilters[key]
                }
            }

        }

        const devices = await Device.findAndCountAll({
            where: valuableParams,
            limit,
            offset
        })

        return res.json(devices);

    }
    async getOne(req, res) {

        const {
            id
        } = req.params;

        const device = await Device.findOne({
            where: {
                id
            },
            include: [{
                model: DeviceInfo,
                as: 'info'
            }]
        })

        return res.json(device);

    }
    async create(req, res, next) {
        try {
            const {
                name,
                price,
                brandId,
                typeId,
                info
            } = req.body
            const {
                img
            } = req.files;

            const imgExt = path.extname(img.name)
            const allowedExtensions = ['.png', '.jpg', '.jpeg'];
            if (!allowedExtensions.includes(imgExt)) {
                res.status(415);
                return res.end(`${imgExt} Image extension not allowed`);
            }
            const fileName = `${uuid.v4()}${imgExt}`;
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({
                name,
                price,
                brandId,
                typeId,
                info,
                img: fileName,
            })

            if (info) {
                info = JSON.parse(info)
                info.forEach((infoItem) => {
                    DeviceInfo.create({
                        title: infoItem.title,
                        description: infoItem.description,
                        deviceId: device.id
                    })
                })
            }

            return res.json(device)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }

    }
}

module.exports = new DeviceController();