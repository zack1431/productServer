const mongoose = require('mongoose');
const validator = require('validator');

var productSchema = new mongoose.Schema({
    id:{type:'string',required:true},
    product_name:{type:'string',required:true},
    product_price:{type:"Number",required:true},
    product_material:{type:'string',required:true},
    product_color:{type:'string',default:'Purpose of loan'}
})


var productRequest = mongoose.model('products',productSchema);

module.exports={productRequest,mongoose}