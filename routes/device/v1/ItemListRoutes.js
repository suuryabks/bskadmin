/**
 * ItemListRoutes.js
 * @description :: CRUD API routes for ItemList
 */

const express = require('express');
const router = express.Router();
const ItemListController = require('../../../controller/device/v1/ItemListController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/itemlist/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.addItemList);
router.route('/device/api/v1/itemlist/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.findAllItemList);
router.route('/device/api/v1/itemlist/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.getItemListCount);
router.route('/device/api/v1/itemlist/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.softDeleteManyItemList);
router.route('/device/api/v1/itemlist/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.bulkInsertItemList);
router.route('/device/api/v1/itemlist/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.bulkUpdateItemList);
router.route('/device/api/v1/itemlist/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.deleteManyItemList);
router.route('/device/api/v1/itemlist/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.softDeleteItemList);
router.route('/device/api/v1/itemlist/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.partialUpdateItemList);
router.route('/device/api/v1/itemlist/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.updateItemList);    
router.route('/device/api/v1/itemlist/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.getItemList);
router.route('/device/api/v1/itemlist/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ItemListController.deleteItemList);

module.exports = router;
