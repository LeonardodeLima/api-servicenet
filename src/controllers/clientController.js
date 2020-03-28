

let Client = require('../models/client.model');

module.exports = {

  async list(req, res) {
    
    const { page = 1 }  = req.query;

    const client = await Client.paginate({}, { page, limit:10 }).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(client);
  },

  async add(req, res) { 
    if (await Client.findOne({ phone: req.body.phone })) return res.status(401).json({ message: `O Telefone: ${req.body.phone} já foi utilizado.`});
       
    const client = await Client.create(req.body).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(client);
  },

  async show(req, res) {    
    const client = await Client.findById(req.params.id).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(client);
  },

  async update(req, res) {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true} ).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(client);
  },

  async delete(req, res) {
    const client = await Client.findByIdAndRemove({ _id: req.params.id }).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(client);
  },

  async search(req, res) {
    const client = await Client.find({'titulo' : new RegExp(req.params.key, 'i')}).limit(5).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(client);
  }

}