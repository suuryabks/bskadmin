/**
 * colorRoutes.js
 * @description :: CRUD API routes for color
 */

const express = require('express');
const router = express.Router();
const colorController = require('../../controller/admin/colorController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/color/create').post(auth(PLATFORM.ADMIN),checkRolePermission,colorController.addColor);
router.route('/admin/color/list').post(auth(PLATFORM.ADMIN),checkRolePermission,colorController.findAllColor);
router.route('/admin/color/count').post(auth(PLATFORM.ADMIN),checkRolePermission,colorController.getColorCount);
router.route('/admin/color/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,colorController.softDeleteManyColor);
router.route('/admin/color/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,colorController.bulkInsertColor);
router.route('/admin/color/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,colorController.bulkUpdateColor);
router.route('/admin/color/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,colorController.deleteManyColor);
router.route('/admin/color/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,colorController.softDeleteColor);
router.route('/admin/color/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,colorController.partialUpdateColor);
router.route('/admin/color/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,colorController.updateColor);    
router.route('/admin/color/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,colorController.getColor);
router.route('/admin/color/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,colorController.deleteColor);

module.exports = router;
