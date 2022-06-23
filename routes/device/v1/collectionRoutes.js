/**
 * collectionRoutes.js
 * @description :: CRUD API routes for collection
 */

const express = require('express');
const router = express.Router();
const collectionController = require('../../../controller/device/v1/collectionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/collection/create').post(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.addCollection);
router.route('/device/api/v1/collection/list').post(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.findAllCollection);
router.route('/device/api/v1/collection/count').post(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.getCollectionCount);
router.route('/device/api/v1/collection/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.softDeleteManyCollection);
router.route('/device/api/v1/collection/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.bulkInsertCollection);
router.route('/device/api/v1/collection/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.bulkUpdateCollection);
router.route('/device/api/v1/collection/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.deleteManyCollection);
router.route('/device/api/v1/collection/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.softDeleteCollection);
router.route('/device/api/v1/collection/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.partialUpdateCollection);
router.route('/device/api/v1/collection/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.updateCollection);    
router.route('/device/api/v1/collection/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.getCollection);
router.route('/device/api/v1/collection/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,collectionController.deleteCollection);

module.exports = router;
