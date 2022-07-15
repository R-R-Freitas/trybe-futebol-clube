import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

const foundUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const correctLoginBody = { email: 'admin@admin.com', password: 'secret_admin' }

describe('Testa se é possível logar com usuário e senha corretos', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves(foundUser as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada retorna o código de status 200 e um token', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(correctLoginBody);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body.token).to.be.a('string');
  });

});

describe('Testa que não é possível logar sem email ou senha', () => {

  let chaiHttpResponse: Response;
  const missingKeyError = 'All fields must be filled';
  const missingEmailBody = { password: 'password' };
  const missingPasswordBody = { email: 'user@user.com' }

  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves(foundUser as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada sem o email retorna o código de status 400 e uma message', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(missingEmailBody);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal(missingKeyError);
  });

  it('Verifica se a chamada sem o password retorna o código de status 400 e uma message', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(missingPasswordBody);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal(missingKeyError);
  });

});

describe('Testa que não é possível logar email ou senha incorretos', () => {

  let chaiHttpResponse: Response;
  const invalidDataError = 'Incorrect email or password';
  const wrongEmailBody = { email: 'invalid@user.com', password: 'secret_user' };
  const wrongPasswordBody = { email: 'user@user.com', password: 'wrong_password' }

  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves(foundUser as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada com email incorreto retorna o código de status 401 e uma message', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(wrongEmailBody);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal(invalidDataError);
  });

  it('Verifica se a chamada com password incorreto retorna o código de status 401 e uma message', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(wrongPasswordBody);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal(invalidDataError);
  });

});

describe('Testa se a rota /login/validate retorna a role do usuário logado', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves(foundUser as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada retorna o código de status 200 e a role do user', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login').send(correctLoginBody);

    const token = chaiHttpResponse.body.token;

    chaiHttpResponse = await chai
      .request(app).get('/login/validate').set({ 'authorization': token });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('role');
    expect(chaiHttpResponse.body.role).to.be.equal(foundUser.role);
  });

});