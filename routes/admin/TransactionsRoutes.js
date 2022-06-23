/**
 * TransactionsRoutes.js
 * @description :: CRUD API routes for Transactions
 */

const express = require('express');
const router = express.Router();
const TransactionsController = require('../../controller/admin/TransactionsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/transactions/create').post(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.addTransactions);
router.route('/admin/transactions/list').post(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.findAllTransactions);
router.route('/admin/transactions/count').post(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.getTransactionsCount);
router.route('/admin/transactions/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.softDeleteManyTransactions);
router.route('/admin/transactions/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.bulkInsertTransactions);
router.route('/admin/transactions/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.bulkUpdateTransactions);
router.route('/admin/transactions/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.deleteManyTransactions);
router.route('/admin/transactions/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.softDeleteTransactions);
router.route('/admin/transactions/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.partialUpdateTransactions);
router.route('/admin/transactions/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.updateTransactions);    
router.route('/admin/transactions/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.getTransactions);
router.route('/admin/transactions/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,TransactionsController.deleteTransactions);

module.exports = router;
