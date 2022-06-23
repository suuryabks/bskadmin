/**
 * bidsRoutes.js
 * @description :: CRUD API routes for bids
 */

const express = require('express');
const router = express.Router();
const bidsController = require('../../../controller/device/v1/bidsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/bids/create').post(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.addBids);
router.route('/device/api/v1/bids/list').post(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.findAllBids);
router.route('/device/api/v1/bids/count').post(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.getBidsCount);
router.route('/device/api/v1/bids/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.softDeleteManyBids);
router.route('/device/api/v1/bids/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.bulkInsertBids);
router.route('/device/api/v1/bids/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.bulkUpdateBids);
router.route('/device/api/v1/bids/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.deleteManyBids);
router.route('/device/api/v1/bids/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.softDeleteBids);
router.route('/device/api/v1/bids/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.partialUpdateBids);
router.route('/device/api/v1/bids/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.updateBids);    
router.route('/device/api/v1/bids/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.getBids);
router.route('/device/api/v1/bids/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,bidsController.deleteBids);

module.exports = router;
