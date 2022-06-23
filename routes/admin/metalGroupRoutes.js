/**
 * metalGroupRoutes.js
 * @description :: CRUD API routes for metalGroup
 */

const express = require('express');
const router = express.Router();
const metalGroupController = require('../../controller/admin/metalGroupController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/metalgroup/create').post(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.addMetalGroup);
router.route('/admin/metalgroup/list').post(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.findAllMetalGroup);
router.route('/admin/metalgroup/count').post(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.getMetalGroupCount);
router.route('/admin/metalgroup/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.softDeleteManyMetalGroup);
router.route('/admin/metalgroup/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.bulkInsertMetalGroup);
router.route('/admin/metalgroup/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.bulkUpdateMetalGroup);
router.route('/admin/metalgroup/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.deleteManyMetalGroup);
router.route('/admin/metalgroup/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.softDeleteMetalGroup);
router.route('/admin/metalgroup/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.partialUpdateMetalGroup);
router.route('/admin/metalgroup/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.updateMetalGroup);    
router.route('/admin/metalgroup/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.getMetalGroup);
router.route('/admin/metalgroup/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,metalGroupController.deleteMetalGroup);

module.exports = router;
