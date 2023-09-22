const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
  
  productName: {
    type: String,
  },
  price: {
    type: Number,
  }, 
})
  

module.exports = mongoose.model ('Store',storeSchema)