/**
 * styleRoutes.js
 * @description :: CRUD API routes for style
 */

const express = require('express');
const router = express.Router();
const styleController = require('../../controller/admin/styleController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/style/create').post(auth(PLATFORM.ADMIN),checkRolePermission,styleController.addStyle);
router.route('/admin/style/list').post(auth(PLATFORM.ADMIN),checkRolePermission,styleController.findAllStyle);
router.route('/admin/style/count').post(auth(PLATFORM.ADMIN),checkRolePermission,styleController.getStyleCount);
router.route('/admin/style/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,styleController.softDeleteManyStyle);
router.route('/admin/style/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,styleController.bulkInsertStyle);
router.route('/admin/style/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,styleController.bulkUpdateStyle);
router.route('/admin/style/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,styleController.deleteManyStyle);
router.route('/admin/style/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,styleController.softDeleteStyle);
router.route('/admin/style/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,styleController.partialUpdateStyle);
router.route('/admin/style/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,styleController.updateStyle);    
router.route('/admin/style/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,styleController.getStyle);
router.route('/admin/style/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,styleController.deleteStyle);

module.exports = router;
