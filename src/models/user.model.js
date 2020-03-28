const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

let userSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  datetime: {
    type: Date,
    default: Date.now
  } 
},
{
  collection: 'User'
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
