/**
 * collectionRoutes.js
 * @description :: CRUD API routes for collection
 */

const express = require('express');
const router = express.Router();
const collectionController = require('../../controller/admin/collectionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/collection/create').post(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.addCollection);
router.route('/admin/collection/list').post(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.findAllCollection);
router.route('/admin/collection/count').post(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.getCollectionCount);
router.route('/admin/collection/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.softDeleteManyCollection);
router.route('/admin/collection/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.bulkInsertCollection);
router.route('/admin/collection/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.bulkUpdateCollection);
router.route('/admin/collection/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.deleteManyCollection);
router.route('/admin/collection/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.softDeleteCollection);
router.route('/admin/collection/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.partialUpdateCollection);
router.route('/admin/collection/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.updateCollection);    
router.route('/admin/collection/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.getCollection);
router.route('/admin/collection/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,collectionController.deleteCollection);

module.exports = router;
