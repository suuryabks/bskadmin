/**
 * metalRoutes.js
 * @description :: CRUD API routes for metal
 */

const express = require('express');
const router = express.Router();
const metalController = require('../../controller/admin/metalController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/metal/create').post(auth(PLATFORM.ADMIN),checkRolePermission,metalController.addMetal);
router.route('/admin/metal/list').post(auth(PLATFORM.ADMIN),checkRolePermission,metalController.findAllMetal);
router.route('/admin/metal/count').post(auth(PLATFORM.ADMIN),checkRolePermission,metalController.getMetalCount);
router.route('/admin/metal/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,metalController.softDeleteManyMetal);
router.route('/admin/metal/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,metalController.bulkInsertMetal);
router.route('/admin/metal/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,metalController.bulkUpdateMetal);
router.route('/admin/metal/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,metalController.deleteManyMetal);
router.route('/admin/metal/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metalController.softDeleteMetal);
router.route('/admin/metal/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metalController.partialUpdateMetal);
router.route('/admin/metal/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,metalController.updateMetal);    
router.route('/admin/metal/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,metalController.getMetal);
router.route('/admin/metal/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,metalController.deleteMetal);

module.exports = router;
