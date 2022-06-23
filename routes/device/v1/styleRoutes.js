/**
 * styleRoutes.js
 * @description :: CRUD API routes for style
 */

const express = require('express');
const router = express.Router();
const styleController = require('../../../controller/device/v1/styleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/style/create').post(auth(PLATFORM.DEVICE),checkRolePermission,styleController.addStyle);
router.route('/device/api/v1/style/list').post(auth(PLATFORM.DEVICE),checkRolePermission,styleController.findAllStyle);
router.route('/device/api/v1/style/count').post(auth(PLATFORM.DEVICE),checkRolePermission,styleController.getStyleCount);
router.route('/device/api/v1/style/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,styleController.softDeleteManyStyle);
router.route('/device/api/v1/style/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,styleController.bulkInsertStyle);
router.route('/device/api/v1/style/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,styleController.bulkUpdateStyle);
router.route('/device/api/v1/style/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,styleController.deleteManyStyle);
router.route('/device/api/v1/style/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,styleController.softDeleteStyle);
router.route('/device/api/v1/style/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,styleController.partialUpdateStyle);
router.route('/device/api/v1/style/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,styleController.updateStyle);    
router.route('/device/api/v1/style/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,styleController.getStyle);
router.route('/device/api/v1/style/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,styleController.deleteStyle);

module.exports = router;
