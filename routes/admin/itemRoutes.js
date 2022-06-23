/**
 * itemRoutes.js
 * @description :: CRUD API routes for item
 */

const express = require('express');
const router = express.Router();
const itemController = require('../../controller/admin/itemController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/item/create').post(auth(PLATFORM.ADMIN),checkRolePermission,itemController.addItem);
router.route('/admin/item/list').post(auth(PLATFORM.ADMIN),checkRolePermission,itemController.findAllItem);
router.route('/admin/item/count').post(auth(PLATFORM.ADMIN),checkRolePermission,itemController.getItemCount);
router.route('/admin/item/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,itemController.softDeleteManyItem);
router.route('/admin/item/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,itemController.bulkInsertItem);
router.route('/admin/item/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,itemController.bulkUpdateItem);
router.route('/admin/item/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,itemController.deleteManyItem);
router.route('/admin/item/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemController.softDeleteItem);
router.route('/admin/item/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemController.partialUpdateItem);
router.route('/admin/item/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,itemController.updateItem);    
router.route('/admin/item/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,itemController.getItem);
router.route('/admin/item/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,itemController.deleteItem);

module.exports = router;
