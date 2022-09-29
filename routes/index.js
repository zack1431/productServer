var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl,MongoClient} = require('../db');
const {productRequest,mongoose} = require('../dbSchema');
var client = new MongoClient(dbUrl);

mongoose.connect(dbUrl);

/* GET home page. */
router.get('/products', async function(req, res, next) {
  try {
    let users = await productRequest.find()
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});

/**
 * products between 400-800
 */
 router.get('/productsbtwn', async function(req, res, next) {
  try {
    let users = await productRequest.find({'product_price':{$gt:399},$and:[{'product_price':{$lt:801}}]})
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});

/**
 * products not between 400 to 600
 */
 router.get('/productsNbtwn', async function(req, res, next) {
  try {
    let users = await productRequest.find({$or:[{"product_price":{$lte:400}},{"product_price":{$gte:600}}]})
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});


/**
 * products gt 500 limit to 4
 */
 router.get('/productsLimit', async function(req, res, next) {
  try {
    let users = await productRequest.find({'product_price':{$gt:500}}).limit(4).exec()
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});

/**
 * products project name and material
 */
 router.get('/productsProject', async function(req, res, next) {
  try {
    let users = await productRequest.find({}, {id:0,product_price:0,product_color:0,_id:0})
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});

/**
 * products by id
 */
 router.get('/productsbyId', async function(req, res, next) {
  try {
    let users = await productRequest.find({'id':'10'})
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});

/**
 * products by product_material
 */
 router.get('/productsbyMaterial', async function(req, res, next) {
  try {
    let users = await productRequest.find({$or:[{'product_material':'soft'},{'product_material':'Soft'}]})
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});
/**
 * products by color and price
 */
 router.get('/productsbyClr', async function(req, res, next) {
  try {
    let users = await productRequest.find({$and:[{'product_color':'indigo'},{'product_price':492}]})
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});


/**
 * delete product with duplicate product price
 */
router.delete('/deleteSame', async (req, res,)=> {
  await client.connect();
  try {
    const db = await client.db('productsServer');
    let resp = await productRequest.find({},{id:0,product_material:0,product_color:0,product_name:0})
    const dupsRecord = resp.map((item) => item.product_price)
    const toFindDuplicates =  dupsRecord.filter((item, index) => dupsRecord.indexOf(item) !== index)
    if(toFindDuplicates.length > 0){
      let users = await productRequest.deleteMany({ product_price: { $in: toFindDuplicates } })
    
      res.send({
        statusCode:res.statusCode,
        users
      })
    }
    else
    {
      res.send({
        statusCode:res.statusCode,
        'Message':'No Duplicates Found!!!'
      })
    }
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
  finally{
    client.close()
  }
});


module.exports = router;
