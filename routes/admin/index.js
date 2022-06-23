/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./orderRoutes'));
router.use(require('./cartRoutes'));
router.use(require('./TransactionsRoutes'));
router.use(require('./bidsRoutes'));
router.use(require('./certificateAuthorityRoutes'));
router.use(require('./colorRoutes'));
router.use(require('./clarityRoutes'));
router.use(require('./cutRoutes'));
router.use(require('./styleRoutes'));
router.use(require('./supplierRoutes'));
router.use(require('./ItemListRoutes'));
router.use(require('./itemRoutes'));
router.use(require('./varietyRoutes'));
router.use(require('./collectionRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./productRoutes'));
router.use(require('./PlanCycleRoutes'));
router.use(require('./metalGroupRoutes'));
router.use(require('./metalRoutes'));
router.use(require('./userRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));

module.exports = router;
