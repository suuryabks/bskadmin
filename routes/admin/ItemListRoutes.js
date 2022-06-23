/**
 * ItemListRoutes.js
 * @description :: CRUD API routes for ItemList
 */

const express = require('express');
const router = express.Router();
const ItemListController = require('../../controller/admin/ItemListController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/itemlist/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.addItemList);
router.route('/admin/itemlist/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.findAllItemList);
router.route('/admin/itemlist/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.getItemListCount);
router.route('/admin/itemlist/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.softDeleteManyItemList);
router.route('/admin/itemlist/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.bulkInsertItemList);
router.route('/admin/itemlist/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.bulkUpdateItemList);
router.route('/admin/itemlist/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.deleteManyItemList);
router.route('/admin/itemlist/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.softDeleteItemList);
router.route('/admin/itemlist/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.partialUpdateItemList);
router.route('/admin/itemlist/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.updateItemList);    
router.route('/admin/itemlist/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.getItemList);
router.route('/admin/itemlist/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ItemListController.deleteItemList);

module.exports = router;
