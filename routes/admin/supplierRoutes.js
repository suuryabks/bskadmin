/**
 * supplierRoutes.js
 * @description :: CRUD API routes for supplier
 */

const express = require('express');
const router = express.Router();
const supplierController = require('../../controller/admin/supplierController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/supplier/create').post(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.addSupplier);
router.route('/admin/supplier/list').post(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.findAllSupplier);
router.route('/admin/supplier/count').post(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.getSupplierCount);
router.route('/admin/supplier/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.softDeleteManySupplier);
router.route('/admin/supplier/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.bulkInsertSupplier);
router.route('/admin/supplier/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.bulkUpdateSupplier);
router.route('/admin/supplier/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.deleteManySupplier);
router.route('/admin/supplier/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.softDeleteSupplier);
router.route('/admin/supplier/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.partialUpdateSupplier);
router.route('/admin/supplier/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.updateSupplier);    
router.route('/admin/supplier/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.getSupplier);
router.route('/admin/supplier/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,supplierController.deleteSupplier);

module.exports = router;
