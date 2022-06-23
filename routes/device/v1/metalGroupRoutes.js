/**
 * metalGroupRoutes.js
 * @description :: CRUD API routes for metalGroup
 */

const express = require('express');
const router = express.Router();
const metalGroupController = require('../../../controller/device/v1/metalGroupController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/metalgroup/create').post(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.addMetalGroup);
router.route('/device/api/v1/metalgroup/list').post(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.findAllMetalGroup);
router.route('/device/api/v1/metalgroup/count').post(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.getMetalGroupCount);
router.route('/device/api/v1/metalgroup/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.softDeleteManyMetalGroup);
router.route('/device/api/v1/metalgroup/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.bulkInsertMetalGroup);
router.route('/device/api/v1/metalgroup/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.bulkUpdateMetalGroup);
router.route('/device/api/v1/metalgroup/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.deleteManyMetalGroup);
router.route('/device/api/v1/metalgroup/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.softDeleteMetalGroup);
router.route('/device/api/v1/metalgroup/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.partialUpdateMetalGroup);
router.route('/device/api/v1/metalgroup/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.updateMetalGroup);    
router.route('/device/api/v1/metalgroup/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.getMetalGroup);
router.route('/device/api/v1/metalgroup/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,metalGroupController.deleteMetalGroup);

module.exports = router;
