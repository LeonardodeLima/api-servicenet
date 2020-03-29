var request = require('supertest');
var chai = require('chai');
var app = require('../server');
var expect = chai.expect;
var should = require('chai').should();

// dados de usuário
var token = '';
var email = '';
var clientId ='';

describe('Vericação de API', function() {
  it('API respondendo um ok ?', async function() {
    const response = await request(app)
      .get('/status')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202);
    expect(response.text).equals('{"status":"ON"}');
  });
});

describe('Verificações de usuário', function() {
  it("Cadastra um usuário", async function() {
    const response = await request(app)
      .post("/user/create")
      .set('Content-Type', 'application/json')
      .send({
        "email": `${(new Date()).toISOString()}leonardo.flatpb@gmail.com`,
        "password": "123456",
        "name": "leonardo1",
      });
    expect(response.request._data.email).to.be.a('string');
    email = response.request._data.email;
    expect(response.status).equal(200);
  });
  it("Loga um usuário", async function() {  
    const response = await request(app)
      .post("/user/login")
      .set('Content-Type', 'application/json')
      .send({
        "email": `${email}`,
        "password": "123456",
      });
    expect(response.body.token).to.be.a('string');
    token = response.body.token;
    expect(response.status).equal(200);
  });
});


describe('Verificações de cliente', function() {
  
  it("Cria um cliente", async function() {  
    const response = await request(app)
      .post("/client/create")
      .set('Content-Type', 'application/json')
      .set("Authorization", `Bearer ${token}`)
      .send({
        "name": "leonardo22222",
        "phone": `83${Math.floor(Math.random() * 1000000000)}`,
        "addrStreet": "Busto de Tamandaré",
        "addrNumber": "5555",
        "addrCity": "joão pessoa",
        "addrState": "paraiba",
        "addrCountry": "br",
        "addrZipcode": " 58039010"
      });
    expect(response.body._id).to.be.a('string');
    clientId = response.body._id;
    expect(response.status).equal(200);    
  });

  it("Lista clientes", async function() {  
    const response = await request(app)
      .get("/client/list")
      .set('Content-Type', 'application/json')
      .set("Authorization", `Bearer ${token}`);
    should.exist(response.body.docs);
    expect(response.status).equal(200);    
  });

  it("Atualiza um cliente", async function() {  
    const response = await request(app)
      .put(`/client/update/${clientId}`)
      .set('Content-Type', 'application/json')
      .set("Authorization", `Bearer ${token}`)
      .send({
        "name": "Leonardo Lima",
        "phone": `83${Math.floor(Math.random() * 1000000000)}`,
        "addrStreet": "Busto de Tamandaré",
        "addrNumber": "3333",
        "addrCity": "joão pessoa",
        "addrState": "paraiba",
        "addrCountry": "br",
        "addrZipcode": " 58070210"
      });
    expect(response.status).equal(200);    
  });

  it("Exclue um cliente", async function() {  
    const response = await request(app)
      .delete(`/client/delete/${clientId}`)
      .set('Content-Type', 'application/json')
      .set("Authorization", `Bearer ${token}`)
    expect(response.status).equal(200);    
  });

});

// ... chamadas de usuários