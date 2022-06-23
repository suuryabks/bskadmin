/**
 * ItemList.js
 * @description :: model of a database collection ItemList
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const unimeasurementEnum = require('../constants/unimeasurement');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    isDeleted:{ type:Boolean },

    isActive:{ type:Boolean },

    createdAt:{ type:Date },

    updatedAt:{ type:Date },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    item:{
      ref:'item',
      type:Schema.Types.ObjectId
    },

    product:{
      ref:'product',
      type:Schema.Types.ObjectId
    },

    category:{
      ref:'category',
      type:Schema.Types.ObjectId
    },

    collection:{
      ref:'collection',
      type:Schema.Types.ObjectId
    },

    variety:{
      ref:'variety',
      type:Schema.Types.ObjectId
    },

    SKU:{ type:String },

    Description:{ type:String },

    karatage:{
      ref:'metalGroup',
      type:Schema.Types.ObjectId
    },

    composition:[{
      _id:false,
      style:{ type:String },
      size:{ type:String },
      cut:{ type:String },
      clarity:{ type:String },
      color:{ type:String },
      certificateAUTHORITY:{ type:String },
      CERTIFICATENUMBER:{ type:String },
      Weight:{ type:Number },
      pcs:{ type:Number },
      AmountOn:{
        type:String,
        enum:unimeasurementEnum.UNIT_MEASUREMENTS
      },
      Rate:{ type:Number }
    }],

    HUID:{ type:String },

    makingCharge:{ type:Number },

    grossWeight:{ type:Number },

    ringsize:{ type:String },

    DesignNumber:{ type:String },

    SupllierName:{
      type:Schema.Types.ObjectId,
      ref:'supplier'
    },

    images:[{
      _id:false,
      name:{ type:String }
    }],

    video:{ type:String }
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const ItemList = mongoose.model('ItemList',schema);
module.exports = ItemList;