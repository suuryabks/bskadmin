/**
 * supplierRoutes.js
 * @description :: CRUD API routes for supplier
 */

const express = require('express');
const router = express.Router();
const supplierController = require('../../../controller/device/v1/supplierController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/supplier/create').post(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.addSupplier);
router.route('/device/api/v1/supplier/list').post(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.findAllSupplier);
router.route('/device/api/v1/supplier/count').post(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.getSupplierCount);
router.route('/device/api/v1/supplier/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.softDeleteManySupplier);
router.route('/device/api/v1/supplier/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.bulkInsertSupplier);
router.route('/device/api/v1/supplier/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.bulkUpdateSupplier);
router.route('/device/api/v1/supplier/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.deleteManySupplier);
router.route('/device/api/v1/supplier/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.softDeleteSupplier);
router.route('/device/api/v1/supplier/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.partialUpdateSupplier);
router.route('/device/api/v1/supplier/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.updateSupplier);    
router.route('/device/api/v1/supplier/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.getSupplier);
router.route('/device/api/v1/supplier/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,supplierController.deleteSupplier);

module.exports = router;
