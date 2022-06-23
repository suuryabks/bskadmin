/**
 * bidsRoutes.js
 * @description :: CRUD API routes for bids
 */

const express = require('express');
const router = express.Router();
const bidsController = require('../../controller/admin/bidsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/bids/create').post(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.addBids);
router.route('/admin/bids/list').post(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.findAllBids);
router.route('/admin/bids/count').post(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.getBidsCount);
router.route('/admin/bids/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.softDeleteManyBids);
router.route('/admin/bids/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.bulkInsertBids);
router.route('/admin/bids/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.bulkUpdateBids);
router.route('/admin/bids/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.deleteManyBids);
router.route('/admin/bids/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.softDeleteBids);
router.route('/admin/bids/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.partialUpdateBids);
router.route('/admin/bids/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.updateBids);    
router.route('/admin/bids/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.getBids);
router.route('/admin/bids/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,bidsController.deleteBids);

module.exports = router;
