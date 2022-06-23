/**
 * varietyRoutes.js
 * @description :: CRUD API routes for variety
 */

const express = require('express');
const router = express.Router();
const varietyController = require('../../controller/admin/varietyController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/variety/create').post(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.addVariety);
router.route('/admin/variety/list').post(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.findAllVariety);
router.route('/admin/variety/count').post(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.getVarietyCount);
router.route('/admin/variety/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.softDeleteManyVariety);
router.route('/admin/variety/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.bulkInsertVariety);
router.route('/admin/variety/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.bulkUpdateVariety);
router.route('/admin/variety/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.deleteManyVariety);
router.route('/admin/variety/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.softDeleteVariety);
router.route('/admin/variety/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.partialUpdateVariety);
router.route('/admin/variety/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.updateVariety);    
router.route('/admin/variety/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.getVariety);
router.route('/admin/variety/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,varietyController.deleteVariety);

module.exports = router;
