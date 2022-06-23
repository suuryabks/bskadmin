/**
 * clarityRoutes.js
 * @description :: CRUD API routes for clarity
 */

const express = require('express');
const router = express.Router();
const clarityController = require('../../../controller/device/v1/clarityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/clarity/create').post(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.addClarity);
router.route('/device/api/v1/clarity/list').post(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.findAllClarity);
router.route('/device/api/v1/clarity/count').post(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.getClarityCount);
router.route('/device/api/v1/clarity/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.softDeleteManyClarity);
router.route('/device/api/v1/clarity/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.bulkInsertClarity);
router.route('/device/api/v1/clarity/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.bulkUpdateClarity);
router.route('/device/api/v1/clarity/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.deleteManyClarity);
router.route('/device/api/v1/clarity/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.softDeleteClarity);
router.route('/device/api/v1/clarity/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.partialUpdateClarity);
router.route('/device/api/v1/clarity/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.updateClarity);    
router.route('/device/api/v1/clarity/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.getClarity);
router.route('/device/api/v1/clarity/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,clarityController.deleteClarity);

module.exports = router;
