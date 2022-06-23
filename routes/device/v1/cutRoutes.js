/**
 * cutRoutes.js
 * @description :: CRUD API routes for cut
 */

const express = require('express');
const router = express.Router();
const cutController = require('../../../controller/device/v1/cutController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/cut/create').post(auth(PLATFORM.DEVICE),checkRolePermission,cutController.addCut);
router.route('/device/api/v1/cut/list').post(auth(PLATFORM.DEVICE),checkRolePermission,cutController.findAllCut);
router.route('/device/api/v1/cut/count').post(auth(PLATFORM.DEVICE),checkRolePermission,cutController.getCutCount);
router.route('/device/api/v1/cut/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,cutController.softDeleteManyCut);
router.route('/device/api/v1/cut/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,cutController.bulkInsertCut);
router.route('/device/api/v1/cut/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,cutController.bulkUpdateCut);
router.route('/device/api/v1/cut/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,cutController.deleteManyCut);
router.route('/device/api/v1/cut/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,cutController.softDeleteCut);
router.route('/device/api/v1/cut/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,cutController.partialUpdateCut);
router.route('/device/api/v1/cut/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,cutController.updateCut);    
router.route('/device/api/v1/cut/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,cutController.getCut);
router.route('/device/api/v1/cut/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,cutController.deleteCut);

module.exports = router;
