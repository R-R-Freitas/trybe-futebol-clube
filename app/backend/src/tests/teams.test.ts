import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamModel';
import { Team } from '../protocols';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

const foundTeams = [
	{ id: 1, teamName: 'Avaí/Kindermann' },
	{	id: 2, teamName: 'Bahia' },
	{	id: 3, teamName: 'Botafogo'	},
];

const foundTeam = {	id: 2, teamName: 'Bahia' };

describe('Testa se é possível receber um array de times ao através do método get /teams', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, 'findAll')
      .resolves(foundTeams as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada retorna o código de status 200 e um array de times', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body.every(
      (team: Team) => expect(team).to.have.all.keys(['id', 'teamName'])
    )).to.be.equal(true);
  });

});

describe('Testa se é possível receber um time ao através do método get /teams:id', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, 'findByPk')
      .resolves(foundTeam as Teams);
  });

  after(()=>{
    (Teams.findByPk as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada retorna o código de status 200 e um team', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/teams/2');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.all.keys(['id', 'teamName']);

  });

});
