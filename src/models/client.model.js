const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

let clientSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  phone: {
    type: String,
    required:true
  },
  addrStreet: {
    type: String,
    required:true
  },
  addrNumber: {
    type: String,
    required:true
  },
  addrState: {
    type: String,
    required:true
  },
  addrCity: {
    type: String,
    required:true
  },
  addrCountry: {
    type: String,
    required:true
  },
  addrZipcode: {
    type: String,
    required:true
  },
  datetime: {
    type: Date,
    default: Date.now
  } 
},
{
  collection: 'Client'
});

clientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Client', clientSchema);
