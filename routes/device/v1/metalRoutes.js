/**
 * metalRoutes.js
 * @description :: CRUD API routes for metal
 */

const express = require('express');
const router = express.Router();
const metalController = require('../../../controller/device/v1/metalController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/metal/create').post(auth(PLATFORM.DEVICE),checkRolePermission,metalController.addMetal);
router.route('/device/api/v1/metal/list').post(auth(PLATFORM.DEVICE),checkRolePermission,metalController.findAllMetal);
router.route('/device/api/v1/metal/count').post(auth(PLATFORM.DEVICE),checkRolePermission,metalController.getMetalCount);
router.route('/device/api/v1/metal/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,metalController.softDeleteManyMetal);
router.route('/device/api/v1/metal/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,metalController.bulkInsertMetal);
router.route('/device/api/v1/metal/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,metalController.bulkUpdateMetal);
router.route('/device/api/v1/metal/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,metalController.deleteManyMetal);
router.route('/device/api/v1/metal/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metalController.softDeleteMetal);
router.route('/device/api/v1/metal/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metalController.partialUpdateMetal);
router.route('/device/api/v1/metal/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metalController.updateMetal);    
router.route('/device/api/v1/metal/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,metalController.getMetal);
router.route('/device/api/v1/metal/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,metalController.deleteMetal);

module.exports = router;
