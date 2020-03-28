

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let User = require('../models/user.model');
require('dotenv').config(); 

module.exports = {

  async list(req, res) {
    
    const { page = 1 }  = req.query;

    const user = await User.paginate({}, { page, limit:10 }).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(user);
  },

  async add(req, res) {   
    if (await User.findOne({ email: req.body.email })) return res.status(401).json({ message: `E-mail:${req.body.email} já existe, efetue login.`});
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);

    const user = await User.create(req.body).catch((error) => {
   
      return res.status(400).json(error);
    });

    return res.json({_id:user.id});
  },

  async show(req, res) {    
    const user = await User.findById(req.params.id).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(user);
  },

  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true} ).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(user);
  },

  async delete(req, res) {
    const user = await User.findByIdAndRemove({ _id: req.params.id }).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(user);
  },

  async login(req, res)  {
  
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, process.env.SECRET);
        delete userWithoutHash.password;
        return res.json({...userWithoutHash,  token, resquest:'sucess' });
    }else{
      return res.status(200).json({ message: `Usuário não existe ou dados incorretos`});
    }
  },

  async getById(id) {
    return await User.findById(id).select('-hash');
  },

}