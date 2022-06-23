/**
 * varietyRoutes.js
 * @description :: CRUD API routes for variety
 */

const express = require('express');
const router = express.Router();
const varietyController = require('../../../controller/device/v1/varietyController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/variety/create').post(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.addVariety);
router.route('/device/api/v1/variety/list').post(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.findAllVariety);
router.route('/device/api/v1/variety/count').post(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.getVarietyCount);
router.route('/device/api/v1/variety/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.softDeleteManyVariety);
router.route('/device/api/v1/variety/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.bulkInsertVariety);
router.route('/device/api/v1/variety/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.bulkUpdateVariety);
router.route('/device/api/v1/variety/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.deleteManyVariety);
router.route('/device/api/v1/variety/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.softDeleteVariety);
router.route('/device/api/v1/variety/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.partialUpdateVariety);
router.route('/device/api/v1/variety/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.updateVariety);    
router.route('/device/api/v1/variety/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.getVariety);
router.route('/device/api/v1/variety/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,varietyController.deleteVariety);

module.exports = router;
