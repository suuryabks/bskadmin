/**
 * clarityRoutes.js
 * @description :: CRUD API routes for clarity
 */

const express = require('express');
const router = express.Router();
const clarityController = require('../../controller/admin/clarityController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/clarity/create').post(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.addClarity);
router.route('/admin/clarity/list').post(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.findAllClarity);
router.route('/admin/clarity/count').post(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.getClarityCount);
router.route('/admin/clarity/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.softDeleteManyClarity);
router.route('/admin/clarity/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.bulkInsertClarity);
router.route('/admin/clarity/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.bulkUpdateClarity);
router.route('/admin/clarity/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.deleteManyClarity);
router.route('/admin/clarity/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.softDeleteClarity);
router.route('/admin/clarity/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.partialUpdateClarity);
router.route('/admin/clarity/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.updateClarity);    
router.route('/admin/clarity/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.getClarity);
router.route('/admin/clarity/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,clarityController.deleteClarity);

module.exports = router;
