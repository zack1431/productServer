const mongodb = require('mongodb');
const dbName = 'stumen_mgmt';
const dbUrl = 'mongodb+srv://zakir:zakir1431@cluster0.dwmosph.mongodb.net/productsServer';
const MongoClient = mongodb.MongoClient

module.exports = {mongodb,dbName,dbUrl,MongoClient}