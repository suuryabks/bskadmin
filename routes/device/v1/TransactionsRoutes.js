/**
 * TransactionsRoutes.js
 * @description :: CRUD API routes for Transactions
 */

const express = require('express');
const router = express.Router();
const TransactionsController = require('../../../controller/device/v1/TransactionsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/transactions/create').post(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.addTransactions);
router.route('/device/api/v1/transactions/list').post(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.findAllTransactions);
router.route('/device/api/v1/transactions/count').post(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.getTransactionsCount);
router.route('/device/api/v1/transactions/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.softDeleteManyTransactions);
router.route('/device/api/v1/transactions/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.bulkInsertTransactions);
router.route('/device/api/v1/transactions/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.bulkUpdateTransactions);
router.route('/device/api/v1/transactions/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.deleteManyTransactions);
router.route('/device/api/v1/transactions/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.softDeleteTransactions);
router.route('/device/api/v1/transactions/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.partialUpdateTransactions);
router.route('/device/api/v1/transactions/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.updateTransactions);    
router.route('/device/api/v1/transactions/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.getTransactions);
router.route('/device/api/v1/transactions/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,TransactionsController.deleteTransactions);

module.exports = router;
