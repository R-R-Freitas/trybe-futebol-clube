import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UserModel';
import { User } from '../protocols';

import { Response } from 'superagent';
import { Sequelize } from 'sequelize/types';

chai.use(chaiHttp);

const foundUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const correctLoginBody = { email: 'admin@admin.com', password: 'secret_admin' }

const { expect } = chai;

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
