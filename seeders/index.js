/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'cBUdj85EKgJnbq8',
      'isDeleted':false,
      'username':'Elta_Fisher',
      'email':'Danial.Ratke55@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'Elta_Fisher' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'RxjAndsZgvLDhtH',
      'isDeleted':false,
      'username':'Keaton.Morar',
      'email':'Jaleel.Rath@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'Keaton.Morar' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/order/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cart/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/cart/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cart/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/cart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/cart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/transactions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/transactions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/transactions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/transactions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/transactions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/transactions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/transactions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/transactions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/transactions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/transactions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/transactions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/transactions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/bids/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/bids/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/bids/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/bids/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/bids/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/bids/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/bids/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/bids/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/bids/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/bids/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/bids/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/bids/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/certificateauthority/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/certificateauthority/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/certificateauthority/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/certificateauthority/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/certificateauthority/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/certificateauthority/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/certificateauthority/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/certificateauthority/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/certificateauthority/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/certificateauthority/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/certificateauthority/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/certificateauthority/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/color/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/color/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/color/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/color/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/color/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/color/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/color/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/color/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/color/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/color/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/color/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/color/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/clarity/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/clarity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/clarity/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/clarity/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/clarity/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/clarity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/clarity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/clarity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/clarity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/clarity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/clarity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/clarity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cut/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cut/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cut/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cut/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/cut/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cut/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/cut/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cut/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/cut/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cut/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cut/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/cut/deletemany',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/style/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/style/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/style/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/style/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/style/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/style/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/style/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/style/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/style/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/style/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/style/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/style/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/supplier/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/supplier/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/supplier/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/supplier/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/supplier/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/supplier/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/supplier/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/supplier/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/supplier/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/supplier/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/supplier/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/supplier/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemlist/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemlist/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/itemlist/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/itemlist/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/itemlist/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/itemlist/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemlist/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemlist/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemlist/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemlist/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/itemlist/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/itemlist/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/item/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/variety/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/variety/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/variety/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/variety/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/variety/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/variety/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variety/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variety/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variety/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variety/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variety/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/variety/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/collection/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/collection/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/category/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/category/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/product/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/product/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/product/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/product/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/plancycle/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/plancycle/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/plancycle/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plancycle/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/plancycle/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/plancycle/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plancycle/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plancycle/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plancycle/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plancycle/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plancycle/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/plancycle/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metalgroup/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metalgroup/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metalgroup/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metalgroup/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/metalgroup/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metalgroup/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metalgroup/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metalgroup/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metalgroup/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metalgroup/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metalgroup/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/metalgroup/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metal/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/metal/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/metal/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/metal/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/metal/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/metal/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metal/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metal/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metal/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metal/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metal/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/metal/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/order/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/cart/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cart/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cart/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/cart/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/transactions/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/transactions/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/transactions/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/transactions/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/transactions/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/transactions/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/transactions/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/transactions/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/transactions/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/transactions/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/transactions/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/transactions/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bids/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bids/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bids/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bids/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/bids/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/bids/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bids/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bids/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bids/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bids/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/bids/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/bids/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/certificateauthority/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/certificateauthority/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/certificateauthority/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/certificateauthority/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/certificateauthority/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/certificateauthority/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/certificateauthority/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/certificateauthority/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/certificateauthority/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/certificateauthority/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/certificateauthority/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/certificateauthority/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/color/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/color/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/color/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/color/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/color/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/color/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/color/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/color/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/color/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/color/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/color/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/color/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clarity/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clarity/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clarity/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clarity/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/clarity/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/clarity/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clarity/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clarity/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clarity/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clarity/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/clarity/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/clarity/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cut/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cut/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cut/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cut/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/cut/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cut/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cut/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cut/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cut/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cut/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cut/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/cut/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/style/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/style/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/style/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/style/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/style/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/style/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/style/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/style/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/style/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/style/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/style/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/style/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/supplier/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/supplier/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/supplier/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/supplier/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/supplier/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/supplier/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/supplier/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/supplier/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/supplier/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/supplier/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/supplier/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/supplier/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemlist/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemlist/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemlist/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemlist/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/itemlist/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/itemlist/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemlist/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemlist/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemlist/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemlist/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/itemlist/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/itemlist/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/variety/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/variety/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/variety/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/variety/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/variety/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/variety/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/variety/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/variety/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/variety/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/variety/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/variety/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/variety/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/collection/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/collection/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/collection/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/collection/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/collection/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/collection/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/collection/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/collection/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/collection/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/collection/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/collection/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/collection/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/product/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/product/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/product/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/product/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/plancycle/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/plancycle/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/plancycle/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/plancycle/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/plancycle/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/plancycle/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/plancycle/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/plancycle/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/plancycle/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/plancycle/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/plancycle/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/plancycle/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metalgroup/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metalgroup/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metalgroup/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metalgroup/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/metalgroup/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metalgroup/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metalgroup/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metalgroup/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metalgroup/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metalgroup/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metalgroup/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/metalgroup/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metal/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metal/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metal/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metal/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/metal/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metal/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metal/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metal/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metal/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metal/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metal/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/metal/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Elta_Fisher',
      'password':'cBUdj85EKgJnbq8'
    },{
      'username':'Keaton.Morar',
      'password':'RxjAndsZgvLDhtH'
    }];
    const defaultRole = await dbService.findOne(Role, { code: 'SYSTEM_USER' });
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        userRolesArr.push({
          userId: user.id,
          roleId: defaultRole.id
        });
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;