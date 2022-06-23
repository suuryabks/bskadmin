/**
 * itemRoutes.js
 * @description :: CRUD API routes for item
 */

const express = require('express');
const router = express.Router();
const itemController = require('../../../controller/device/v1/itemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/item/create').post(auth(PLATFORM.DEVICE),checkRolePermission,itemController.addItem);
router.route('/device/api/v1/item/list').post(auth(PLATFORM.DEVICE),checkRolePermission,itemController.findAllItem);
router.route('/device/api/v1/item/count').post(auth(PLATFORM.DEVICE),checkRolePermission,itemController.getItemCount);
router.route('/device/api/v1/item/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,itemController.softDeleteManyItem);
router.route('/device/api/v1/item/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,itemController.bulkInsertItem);
router.route('/device/api/v1/item/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,itemController.bulkUpdateItem);
router.route('/device/api/v1/item/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,itemController.deleteManyItem);
router.route('/device/api/v1/item/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,itemController.softDeleteItem);
router.route('/device/api/v1/item/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,itemController.partialUpdateItem);
router.route('/device/api/v1/item/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,itemController.updateItem);    
router.route('/device/api/v1/item/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,itemController.getItem);
router.route('/device/api/v1/item/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,itemController.deleteItem);

module.exports = router;
