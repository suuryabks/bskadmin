/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Order = require('../model/order');
let Cart = require('../model/cart');
let Transactions = require('../model/Transactions');
let Bids = require('../model/bids');
let CertificateAuthority = require('../model/certificateAuthority');
let Color = require('../model/color');
let Clarity = require('../model/clarity');
let Cut = require('../model/cut');
let Style = require('../model/style');
let Supplier = require('../model/supplier');
let ItemList = require('../model/ItemList');
let Item = require('../model/item');
let Variety = require('../model/variety');
let Collection = require('../model/collection');
let Category = require('../model/category');
let Product = require('../model/product');
let PlanCycle = require('../model/PlanCycle');
let MetalGroup = require('../model/metalGroup');
let Metal = require('../model/metal');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteOrder = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Order,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCart = async (filter) =>{
  try {
    let cart = await dbService.findMany(Cart,filter);
    if (cart && cart.length){
      cart = cart.map((obj) => obj.id);

      const orderFilter = { $or: [{ cart : { $in : cart } }] };
      const orderCnt = await dbService.deleteMany(Order,orderFilter);

      let deleted  = await dbService.deleteMany(Cart,filter);
      let response = { order :orderCnt, };
      return response; 
    } else {
      return {  cart : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTransactions = async (filter) =>{
  try {
    let transactions = await dbService.findMany(Transactions,filter);
    if (transactions && transactions.length){
      transactions = transactions.map((obj) => obj.id);

      const orderFilter = { $or: [{ transaction : { $in : transactions } }] };
      const orderCnt = await dbService.deleteMany(Order,orderFilter);

      let deleted  = await dbService.deleteMany(Transactions,filter);
      let response = { order :orderCnt, };
      return response; 
    } else {
      return {  transactions : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBids = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Bids,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCertificateAuthority = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(CertificateAuthority,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteColor = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Color,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteClarity = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Clarity,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCut = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Cut,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteStyle = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Style,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSupplier = async (filter) =>{
  try {
    let supplier = await dbService.findMany(Supplier,filter);
    if (supplier && supplier.length){
      supplier = supplier.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ SupllierName : { $in : supplier } }] };
      const ItemListCnt = await dbService.deleteMany(ItemList,ItemListFilter);

      let deleted  = await dbService.deleteMany(Supplier,filter);
      let response = { ItemList :ItemListCnt, };
      return response; 
    } else {
      return {  supplier : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItemList = async (filter) =>{
  try {
    let itemlist = await dbService.findMany(ItemList,filter);
    if (itemlist && itemlist.length){
      itemlist = itemlist.map((obj) => obj.id);

      const cartFilter = { $or: [{ itemList : { $in : itemlist } }] };
      const cartCnt = await dbService.deleteMany(Cart,cartFilter);

      let deleted  = await dbService.deleteMany(ItemList,filter);
      let response = { cart :cartCnt, };
      return response; 
    } else {
      return {  itemlist : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteItem = async (filter) =>{
  try {
    let item = await dbService.findMany(Item,filter);
    if (item && item.length){
      item = item.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ item : { $in : item } }] };
      const ItemListCnt = await dbService.deleteMany(ItemList,ItemListFilter);

      let deleted  = await dbService.deleteMany(Item,filter);
      let response = { ItemList :ItemListCnt, };
      return response; 
    } else {
      return {  item : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteVariety = async (filter) =>{
  try {
    let variety = await dbService.findMany(Variety,filter);
    if (variety && variety.length){
      variety = variety.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ variety : { $in : variety } }] };
      const ItemListCnt = await dbService.deleteMany(ItemList,ItemListFilter);

      let deleted  = await dbService.deleteMany(Variety,filter);
      let response = { ItemList :ItemListCnt, };
      return response; 
    } else {
      return {  variety : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCollection = async (filter) =>{
  try {
    let collection = await dbService.findMany(Collection,filter);
    if (collection && collection.length){
      collection = collection.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ collection : { $in : collection } }] };
      const ItemListCnt = await dbService.deleteMany(ItemList,ItemListFilter);

      let deleted  = await dbService.deleteMany(Collection,filter);
      let response = { ItemList :ItemListCnt, };
      return response; 
    } else {
      return {  collection : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ category : { $in : category } }] };
      const ItemListCnt = await dbService.deleteMany(ItemList,ItemListFilter);

      let deleted  = await dbService.deleteMany(Category,filter);
      let response = { ItemList :ItemListCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProduct = async (filter) =>{
  try {
    let product = await dbService.findMany(Product,filter);
    if (product && product.length){
      product = product.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ product : { $in : product } }] };
      const ItemListCnt = await dbService.deleteMany(ItemList,ItemListFilter);

      let deleted  = await dbService.deleteMany(Product,filter);
      let response = { ItemList :ItemListCnt, };
      return response; 
    } else {
      return {  product : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deletePlanCycle = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(PlanCycle,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMetalGroup = async (filter) =>{
  try {
    let metalgroup = await dbService.findMany(MetalGroup,filter);
    if (metalgroup && metalgroup.length){
      metalgroup = metalgroup.map((obj) => obj.id);

      const styleFilter = { $or: [{ metalGroup : { $in : metalgroup } }] };
      const styleCnt = await dbService.deleteMany(Style,styleFilter);

      const ItemListFilter = { $or: [{ karatage : { $in : metalgroup } }] };
      const ItemListCnt = await dbService.deleteMany(ItemList,ItemListFilter);

      let deleted  = await dbService.deleteMany(MetalGroup,filter);
      let response = {
        style :styleCnt,
        ItemList :ItemListCnt,
      };
      return response; 
    } else {
      return {  metalgroup : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMetal = async (filter) =>{
  try {
    let metal = await dbService.findMany(Metal,filter);
    if (metal && metal.length){
      metal = metal.map((obj) => obj.id);

      const metalGroupFilter = { $or: [{ metal : { $in : metal } }] };
      const metalGroupCnt = await dbService.deleteMany(MetalGroup,metalGroupFilter);

      let deleted  = await dbService.deleteMany(Metal,filter);
      let response = { metalGroup :metalGroupCnt, };
      return response; 
    } else {
      return {  metal : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const orderFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ deliveryAgent : { $in : user } }] };
      const orderCnt = await dbService.deleteMany(Order,orderFilter);

      const cartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cartCnt = await dbService.deleteMany(Cart,cartFilter);

      const TransactionsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const TransactionsCnt = await dbService.deleteMany(Transactions,TransactionsFilter);

      const bidsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bidsCnt = await dbService.deleteMany(Bids,bidsFilter);

      const certificateAuthorityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const certificateAuthorityCnt = await dbService.deleteMany(CertificateAuthority,certificateAuthorityFilter);

      const colorFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const colorCnt = await dbService.deleteMany(Color,colorFilter);

      const clarityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const clarityCnt = await dbService.deleteMany(Clarity,clarityFilter);

      const cutFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cutCnt = await dbService.deleteMany(Cut,cutFilter);

      const styleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const styleCnt = await dbService.deleteMany(Style,styleFilter);

      const supplierFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const supplierCnt = await dbService.deleteMany(Supplier,supplierFilter);

      const ItemListFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ItemListCnt = await dbService.deleteMany(ItemList,ItemListFilter);

      const itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemCnt = await dbService.deleteMany(Item,itemFilter);

      const varietyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const varietyCnt = await dbService.deleteMany(Variety,varietyFilter);

      const collectionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const collectionCnt = await dbService.deleteMany(Collection,collectionFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt = await dbService.deleteMany(Category,categoryFilter);

      const productFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const productCnt = await dbService.deleteMany(Product,productFilter);

      const PlanCycleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PlanCycleCnt = await dbService.deleteMany(PlanCycle,PlanCycleFilter);

      const metalGroupFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const metalGroupCnt = await dbService.deleteMany(MetalGroup,metalGroupFilter);

      const metalFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const metalCnt = await dbService.deleteMany(Metal,metalFilter);

      const userFilter = { $or: [{ updatedBy : { $in : user } },{ ReferedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        order :orderCnt,
        cart :cartCnt,
        Transactions :TransactionsCnt,
        bids :bidsCnt,
        certificateAuthority :certificateAuthorityCnt,
        color :colorCnt,
        clarity :clarityCnt,
        cut :cutCnt,
        style :styleCnt,
        supplier :supplierCnt,
        ItemList :ItemListCnt,
        item :itemCnt,
        variety :varietyCnt,
        collection :collectionCnt,
        category :categoryCnt,
        product :productCnt,
        PlanCycle :PlanCycleCnt,
        metalGroup :metalGroupCnt,
        metal :metalCnt,
        user :userCnt + deleted,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder = async (filter) =>{
  try {
    const orderCnt =  await dbService.count(Order,filter);
    return { order : orderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCart = async (filter) =>{
  try {
    let cart = await dbService.findMany(Cart,filter);
    if (cart && cart.length){
      cart = cart.map((obj) => obj.id);

      const orderFilter = { $or: [{ cart : { $in : cart } }] };
      const orderCnt =  await dbService.count(Order,orderFilter);

      let response = { order : orderCnt, };
      return response; 
    } else {
      return {  cart : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTransactions = async (filter) =>{
  try {
    let transactions = await dbService.findMany(Transactions,filter);
    if (transactions && transactions.length){
      transactions = transactions.map((obj) => obj.id);

      const orderFilter = { $or: [{ transaction : { $in : transactions } }] };
      const orderCnt =  await dbService.count(Order,orderFilter);

      let response = { order : orderCnt, };
      return response; 
    } else {
      return {  transactions : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBids = async (filter) =>{
  try {
    const bidsCnt =  await dbService.count(Bids,filter);
    return { bids : bidsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCertificateAuthority = async (filter) =>{
  try {
    const certificateAuthorityCnt =  await dbService.count(CertificateAuthority,filter);
    return { certificateAuthority : certificateAuthorityCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countColor = async (filter) =>{
  try {
    const colorCnt =  await dbService.count(Color,filter);
    return { color : colorCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countClarity = async (filter) =>{
  try {
    const clarityCnt =  await dbService.count(Clarity,filter);
    return { clarity : clarityCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCut = async (filter) =>{
  try {
    const cutCnt =  await dbService.count(Cut,filter);
    return { cut : cutCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countStyle = async (filter) =>{
  try {
    const styleCnt =  await dbService.count(Style,filter);
    return { style : styleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSupplier = async (filter) =>{
  try {
    let supplier = await dbService.findMany(Supplier,filter);
    if (supplier && supplier.length){
      supplier = supplier.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ SupllierName : { $in : supplier } }] };
      const ItemListCnt =  await dbService.count(ItemList,ItemListFilter);

      let response = { ItemList : ItemListCnt, };
      return response; 
    } else {
      return {  supplier : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countItemList = async (filter) =>{
  try {
    let itemlist = await dbService.findMany(ItemList,filter);
    if (itemlist && itemlist.length){
      itemlist = itemlist.map((obj) => obj.id);

      const cartFilter = { $or: [{ itemList : { $in : itemlist } }] };
      const cartCnt =  await dbService.count(Cart,cartFilter);

      let response = { cart : cartCnt, };
      return response; 
    } else {
      return {  itemlist : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countItem = async (filter) =>{
  try {
    let item = await dbService.findMany(Item,filter);
    if (item && item.length){
      item = item.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ item : { $in : item } }] };
      const ItemListCnt =  await dbService.count(ItemList,ItemListFilter);

      let response = { ItemList : ItemListCnt, };
      return response; 
    } else {
      return {  item : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countVariety = async (filter) =>{
  try {
    let variety = await dbService.findMany(Variety,filter);
    if (variety && variety.length){
      variety = variety.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ variety : { $in : variety } }] };
      const ItemListCnt =  await dbService.count(ItemList,ItemListFilter);

      let response = { ItemList : ItemListCnt, };
      return response; 
    } else {
      return {  variety : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCollection = async (filter) =>{
  try {
    let collection = await dbService.findMany(Collection,filter);
    if (collection && collection.length){
      collection = collection.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ collection : { $in : collection } }] };
      const ItemListCnt =  await dbService.count(ItemList,ItemListFilter);

      let response = { ItemList : ItemListCnt, };
      return response; 
    } else {
      return {  collection : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ category : { $in : category } }] };
      const ItemListCnt =  await dbService.count(ItemList,ItemListFilter);

      let response = { ItemList : ItemListCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProduct = async (filter) =>{
  try {
    let product = await dbService.findMany(Product,filter);
    if (product && product.length){
      product = product.map((obj) => obj.id);

      const ItemListFilter = { $or: [{ product : { $in : product } }] };
      const ItemListCnt =  await dbService.count(ItemList,ItemListFilter);

      let response = { ItemList : ItemListCnt, };
      return response; 
    } else {
      return {  product : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlanCycle = async (filter) =>{
  try {
    const PlanCycleCnt =  await dbService.count(PlanCycle,filter);
    return { PlanCycle : PlanCycleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMetalGroup = async (filter) =>{
  try {
    let metalgroup = await dbService.findMany(MetalGroup,filter);
    if (metalgroup && metalgroup.length){
      metalgroup = metalgroup.map((obj) => obj.id);

      const styleFilter = { $or: [{ metalGroup : { $in : metalgroup } }] };
      const styleCnt =  await dbService.count(Style,styleFilter);

      const ItemListFilter = { $or: [{ karatage : { $in : metalgroup } }] };
      const ItemListCnt =  await dbService.count(ItemList,ItemListFilter);

      let response = {
        style : styleCnt,
        ItemList : ItemListCnt,
      };
      return response; 
    } else {
      return {  metalgroup : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countMetal = async (filter) =>{
  try {
    let metal = await dbService.findMany(Metal,filter);
    if (metal && metal.length){
      metal = metal.map((obj) => obj.id);

      const metalGroupFilter = { $or: [{ metal : { $in : metal } }] };
      const metalGroupCnt =  await dbService.count(MetalGroup,metalGroupFilter);

      let response = { metalGroup : metalGroupCnt, };
      return response; 
    } else {
      return {  metal : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const orderFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ deliveryAgent : { $in : user } }] };
      const orderCnt =  await dbService.count(Order,orderFilter);

      const cartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cartCnt =  await dbService.count(Cart,cartFilter);

      const TransactionsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const TransactionsCnt =  await dbService.count(Transactions,TransactionsFilter);

      const bidsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bidsCnt =  await dbService.count(Bids,bidsFilter);

      const certificateAuthorityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const certificateAuthorityCnt =  await dbService.count(CertificateAuthority,certificateAuthorityFilter);

      const colorFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const colorCnt =  await dbService.count(Color,colorFilter);

      const clarityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const clarityCnt =  await dbService.count(Clarity,clarityFilter);

      const cutFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cutCnt =  await dbService.count(Cut,cutFilter);

      const styleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const styleCnt =  await dbService.count(Style,styleFilter);

      const supplierFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const supplierCnt =  await dbService.count(Supplier,supplierFilter);

      const ItemListFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ItemListCnt =  await dbService.count(ItemList,ItemListFilter);

      const itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const itemCnt =  await dbService.count(Item,itemFilter);

      const varietyFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const varietyCnt =  await dbService.count(Variety,varietyFilter);

      const collectionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const collectionCnt =  await dbService.count(Collection,collectionFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      const productFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const productCnt =  await dbService.count(Product,productFilter);

      const PlanCycleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PlanCycleCnt =  await dbService.count(PlanCycle,PlanCycleFilter);

      const metalGroupFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const metalGroupCnt =  await dbService.count(MetalGroup,metalGroupFilter);

      const metalFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const metalCnt =  await dbService.count(Metal,metalFilter);

      const userFilter = { $or: [{ updatedBy : { $in : user } },{ ReferedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        order : orderCnt,
        cart : cartCnt,
        Transactions : TransactionsCnt,
        bids : bidsCnt,
        certificateAuthority : certificateAuthorityCnt,
        color : colorCnt,
        clarity : clarityCnt,
        cut : cutCnt,
        style : styleCnt,
        supplier : supplierCnt,
        ItemList : ItemListCnt,
        item : itemCnt,
        variety : varietyCnt,
        collection : collectionCnt,
        category : categoryCnt,
        product : productCnt,
        PlanCycle : PlanCycleCnt,
        metalGroup : metalGroupCnt,
        metal : metalCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder = async (filter,updateBody) =>{  
  try {
    const orderCnt =  await dbService.updateMany(Order,filter);
    return { order : orderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCart = async (filter,updateBody) =>{  
  try {
    let cart = await dbService.findMany(Cart,filter, { id:1 });
    if (cart.length){
      cart = cart.map((obj) => obj.id);

      const orderFilter = { '$or': [{ cart : { '$in' : cart } }] };
      const orderCnt = await dbService.updateMany(Order,orderFilter,updateBody);
      let updated = await dbService.updateMany(Cart,filter,updateBody);

      let response = { order :orderCnt, };
      return response;
    } else {
      return {  cart : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTransactions = async (filter,updateBody) =>{  
  try {
    let transactions = await dbService.findMany(Transactions,filter, { id:1 });
    if (transactions.length){
      transactions = transactions.map((obj) => obj.id);

      const orderFilter = { '$or': [{ transaction : { '$in' : transactions } }] };
      const orderCnt = await dbService.updateMany(Order,orderFilter,updateBody);
      let updated = await dbService.updateMany(Transactions,filter,updateBody);

      let response = { order :orderCnt, };
      return response;
    } else {
      return {  transactions : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBids = async (filter,updateBody) =>{  
  try {
    const bidsCnt =  await dbService.updateMany(Bids,filter);
    return { bids : bidsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCertificateAuthority = async (filter,updateBody) =>{  
  try {
    const certificateAuthorityCnt =  await dbService.updateMany(CertificateAuthority,filter);
    return { certificateAuthority : certificateAuthorityCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteColor = async (filter,updateBody) =>{  
  try {
    const colorCnt =  await dbService.updateMany(Color,filter);
    return { color : colorCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteClarity = async (filter,updateBody) =>{  
  try {
    const clarityCnt =  await dbService.updateMany(Clarity,filter);
    return { clarity : clarityCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCut = async (filter,updateBody) =>{  
  try {
    const cutCnt =  await dbService.updateMany(Cut,filter);
    return { cut : cutCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteStyle = async (filter,updateBody) =>{  
  try {
    const styleCnt =  await dbService.updateMany(Style,filter);
    return { style : styleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSupplier = async (filter,updateBody) =>{  
  try {
    let supplier = await dbService.findMany(Supplier,filter, { id:1 });
    if (supplier.length){
      supplier = supplier.map((obj) => obj.id);

      const ItemListFilter = { '$or': [{ SupllierName : { '$in' : supplier } }] };
      const ItemListCnt = await dbService.updateMany(ItemList,ItemListFilter,updateBody);
      let updated = await dbService.updateMany(Supplier,filter,updateBody);

      let response = { ItemList :ItemListCnt, };
      return response;
    } else {
      return {  supplier : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItemList = async (filter,updateBody) =>{  
  try {
    let itemlist = await dbService.findMany(ItemList,filter, { id:1 });
    if (itemlist.length){
      itemlist = itemlist.map((obj) => obj.id);

      const cartFilter = { '$or': [{ itemList : { '$in' : itemlist } }] };
      const cartCnt = await dbService.updateMany(Cart,cartFilter,updateBody);
      let updated = await dbService.updateMany(ItemList,filter,updateBody);

      let response = { cart :cartCnt, };
      return response;
    } else {
      return {  itemlist : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteItem = async (filter,updateBody) =>{  
  try {
    let item = await dbService.findMany(Item,filter, { id:1 });
    if (item.length){
      item = item.map((obj) => obj.id);

      const ItemListFilter = { '$or': [{ item : { '$in' : item } }] };
      const ItemListCnt = await dbService.updateMany(ItemList,ItemListFilter,updateBody);
      let updated = await dbService.updateMany(Item,filter,updateBody);

      let response = { ItemList :ItemListCnt, };
      return response;
    } else {
      return {  item : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteVariety = async (filter,updateBody) =>{  
  try {
    let variety = await dbService.findMany(Variety,filter, { id:1 });
    if (variety.length){
      variety = variety.map((obj) => obj.id);

      const ItemListFilter = { '$or': [{ variety : { '$in' : variety } }] };
      const ItemListCnt = await dbService.updateMany(ItemList,ItemListFilter,updateBody);
      let updated = await dbService.updateMany(Variety,filter,updateBody);

      let response = { ItemList :ItemListCnt, };
      return response;
    } else {
      return {  variety : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCollection = async (filter,updateBody) =>{  
  try {
    let collection = await dbService.findMany(Collection,filter, { id:1 });
    if (collection.length){
      collection = collection.map((obj) => obj.id);

      const ItemListFilter = { '$or': [{ collection : { '$in' : collection } }] };
      const ItemListCnt = await dbService.updateMany(ItemList,ItemListFilter,updateBody);
      let updated = await dbService.updateMany(Collection,filter,updateBody);

      let response = { ItemList :ItemListCnt, };
      return response;
    } else {
      return {  collection : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategory = async (filter,updateBody) =>{  
  try {
    let category = await dbService.findMany(Category,filter, { id:1 });
    if (category.length){
      category = category.map((obj) => obj.id);

      const ItemListFilter = { '$or': [{ category : { '$in' : category } }] };
      const ItemListCnt = await dbService.updateMany(ItemList,ItemListFilter,updateBody);
      let updated = await dbService.updateMany(Category,filter,updateBody);

      let response = { ItemList :ItemListCnt, };
      return response;
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProduct = async (filter,updateBody) =>{  
  try {
    let product = await dbService.findMany(Product,filter, { id:1 });
    if (product.length){
      product = product.map((obj) => obj.id);

      const ItemListFilter = { '$or': [{ product : { '$in' : product } }] };
      const ItemListCnt = await dbService.updateMany(ItemList,ItemListFilter,updateBody);
      let updated = await dbService.updateMany(Product,filter,updateBody);

      let response = { ItemList :ItemListCnt, };
      return response;
    } else {
      return {  product : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlanCycle = async (filter,updateBody) =>{  
  try {
    const PlanCycleCnt =  await dbService.updateMany(PlanCycle,filter);
    return { PlanCycle : PlanCycleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMetalGroup = async (filter,updateBody) =>{  
  try {
    let metalgroup = await dbService.findMany(MetalGroup,filter, { id:1 });
    if (metalgroup.length){
      metalgroup = metalgroup.map((obj) => obj.id);

      const styleFilter = { '$or': [{ metalGroup : { '$in' : metalgroup } }] };
      const styleCnt = await dbService.updateMany(Style,styleFilter,updateBody);

      const ItemListFilter = { '$or': [{ karatage : { '$in' : metalgroup } }] };
      const ItemListCnt = await dbService.updateMany(ItemList,ItemListFilter,updateBody);
      let updated = await dbService.updateMany(MetalGroup,filter,updateBody);

      let response = {
        style :styleCnt,
        ItemList :ItemListCnt,
      };
      return response;
    } else {
      return {  metalgroup : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMetal = async (filter,updateBody) =>{  
  try {
    let metal = await dbService.findMany(Metal,filter, { id:1 });
    if (metal.length){
      metal = metal.map((obj) => obj.id);

      const metalGroupFilter = { '$or': [{ metal : { '$in' : metal } }] };
      const metalGroupCnt = await dbService.updateMany(MetalGroup,metalGroupFilter,updateBody);
      let updated = await dbService.updateMany(Metal,filter,updateBody);

      let response = { metalGroup :metalGroupCnt, };
      return response;
    } else {
      return {  metal : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const orderFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ deliveryAgent : { '$in' : user } }] };
      const orderCnt = await dbService.updateMany(Order,orderFilter,updateBody);

      const cartFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const cartCnt = await dbService.updateMany(Cart,cartFilter,updateBody);

      const TransactionsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const TransactionsCnt = await dbService.updateMany(Transactions,TransactionsFilter,updateBody);

      const bidsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const bidsCnt = await dbService.updateMany(Bids,bidsFilter,updateBody);

      const certificateAuthorityFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const certificateAuthorityCnt = await dbService.updateMany(CertificateAuthority,certificateAuthorityFilter,updateBody);

      const colorFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const colorCnt = await dbService.updateMany(Color,colorFilter,updateBody);

      const clarityFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const clarityCnt = await dbService.updateMany(Clarity,clarityFilter,updateBody);

      const cutFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const cutCnt = await dbService.updateMany(Cut,cutFilter,updateBody);

      const styleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const styleCnt = await dbService.updateMany(Style,styleFilter,updateBody);

      const supplierFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const supplierCnt = await dbService.updateMany(Supplier,supplierFilter,updateBody);

      const ItemListFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ItemListCnt = await dbService.updateMany(ItemList,ItemListFilter,updateBody);

      const itemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const itemCnt = await dbService.updateMany(Item,itemFilter,updateBody);

      const varietyFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const varietyCnt = await dbService.updateMany(Variety,varietyFilter,updateBody);

      const collectionFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const collectionCnt = await dbService.updateMany(Collection,collectionFilter,updateBody);

      const categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const categoryCnt = await dbService.updateMany(Category,categoryFilter,updateBody);

      const productFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const productCnt = await dbService.updateMany(Product,productFilter,updateBody);

      const PlanCycleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const PlanCycleCnt = await dbService.updateMany(PlanCycle,PlanCycleFilter,updateBody);

      const metalGroupFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const metalGroupCnt = await dbService.updateMany(MetalGroup,metalGroupFilter,updateBody);

      const metalFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const metalCnt = await dbService.updateMany(Metal,metalFilter,updateBody);

      const userFilter = { '$or': [{ updatedBy : { '$in' : user } },{ ReferedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        order :orderCnt,
        cart :cartCnt,
        Transactions :TransactionsCnt,
        bids :bidsCnt,
        certificateAuthority :certificateAuthorityCnt,
        color :colorCnt,
        clarity :clarityCnt,
        cut :cutCnt,
        style :styleCnt,
        supplier :supplierCnt,
        ItemList :ItemListCnt,
        item :itemCnt,
        variety :varietyCnt,
        collection :collectionCnt,
        category :categoryCnt,
        product :productCnt,
        PlanCycle :PlanCycleCnt,
        metalGroup :metalGroupCnt,
        metal :metalCnt,
        user :userCnt + updated,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteOrder,
  deleteCart,
  deleteTransactions,
  deleteBids,
  deleteCertificateAuthority,
  deleteColor,
  deleteClarity,
  deleteCut,
  deleteStyle,
  deleteSupplier,
  deleteItemList,
  deleteItem,
  deleteVariety,
  deleteCollection,
  deleteCategory,
  deleteProduct,
  deletePlanCycle,
  deleteMetalGroup,
  deleteMetal,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countOrder,
  countCart,
  countTransactions,
  countBids,
  countCertificateAuthority,
  countColor,
  countClarity,
  countCut,
  countStyle,
  countSupplier,
  countItemList,
  countItem,
  countVariety,
  countCollection,
  countCategory,
  countProduct,
  countPlanCycle,
  countMetalGroup,
  countMetal,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteOrder,
  softDeleteCart,
  softDeleteTransactions,
  softDeleteBids,
  softDeleteCertificateAuthority,
  softDeleteColor,
  softDeleteClarity,
  softDeleteCut,
  softDeleteStyle,
  softDeleteSupplier,
  softDeleteItemList,
  softDeleteItem,
  softDeleteVariety,
  softDeleteCollection,
  softDeleteCategory,
  softDeleteProduct,
  softDeletePlanCycle,
  softDeleteMetalGroup,
  softDeleteMetal,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
