/**
 * colorRoutes.js
 * @description :: CRUD API routes for color
 */

const express = require('express');
const router = express.Router();
const colorController = require('../../../controller/device/v1/colorController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/color/create').post(auth(PLATFORM.DEVICE),checkRolePermission,colorController.addColor);
router.route('/device/api/v1/color/list').post(auth(PLATFORM.DEVICE),checkRolePermission,colorController.findAllColor);
router.route('/device/api/v1/color/count').post(auth(PLATFORM.DEVICE),checkRolePermission,colorController.getColorCount);
router.route('/device/api/v1/color/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,colorController.softDeleteManyColor);
router.route('/device/api/v1/color/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,colorController.bulkInsertColor);
router.route('/device/api/v1/color/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,colorController.bulkUpdateColor);
router.route('/device/api/v1/color/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,colorController.deleteManyColor);
router.route('/device/api/v1/color/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,colorController.softDeleteColor);
router.route('/device/api/v1/color/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,colorController.partialUpdateColor);
router.route('/device/api/v1/color/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,colorController.updateColor);    
router.route('/device/api/v1/color/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,colorController.getColor);
router.route('/device/api/v1/color/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,colorController.deleteColor);

module.exports = router;
