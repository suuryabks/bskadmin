/**
 * cutRoutes.js
 * @description :: CRUD API routes for cut
 */

const express = require('express');
const router = express.Router();
const cutController = require('../../controller/admin/cutController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/cut/create').post(auth(PLATFORM.ADMIN),checkRolePermission,cutController.addCut);
router.route('/admin/cut/list').post(auth(PLATFORM.ADMIN),checkRolePermission,cutController.findAllCut);
router.route('/admin/cut/count').post(auth(PLATFORM.ADMIN),checkRolePermission,cutController.getCutCount);
router.route('/admin/cut/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,cutController.softDeleteManyCut);
router.route('/admin/cut/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,cutController.bulkInsertCut);
router.route('/admin/cut/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,cutController.bulkUpdateCut);
router.route('/admin/cut/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,cutController.deleteManyCut);
router.route('/admin/cut/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cutController.softDeleteCut);
router.route('/admin/cut/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cutController.partialUpdateCut);
router.route('/admin/cut/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cutController.updateCut);    
router.route('/admin/cut/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,cutController.getCut);
router.route('/admin/cut/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,cutController.deleteCut);

module.exports = router;
