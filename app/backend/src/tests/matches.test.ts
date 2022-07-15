import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchModel';
import { MatchAndTeams } from '../protocols';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

// const foundMatches = [
//   {
//     "id": 1,
//     "homeTeam": 16,
//     "homeTeamGoals": 1,
//     "awayTeam": 8,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "teamHome": {
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "teamName": "Grêmio"
//     }
//   },
//   {
//     "id": 41,
//     "homeTeam": 16,
//     "homeTeamGoals": 2,
//     "awayTeam": 9,
//     "awayTeamGoals": 0,
//     "inProgress": true,
//     "teamHome": {
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "teamName": "Internacional"
//     }
//   }
// ];

// const inProgressMatches = [
//   {
//     "id": 41,
//     "homeTeam": 16,
//     "homeTeamGoals": 2,
//     "awayTeam": 9,
//     "awayTeamGoals": 0,
//     "inProgress": true,
//     "teamHome": {
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "teamName": "Internacional"
//     }
//   },
//   {
//     "id": 42,
//     "homeTeam": 6,
//     "homeTeamGoals": 1,
//     "awayTeam": 1,
//     "awayTeamGoals": 0,
//     "inProgress": true,
//     "teamHome": {
//       "teamName": "Ferroviária"
//     },
//     "teamAway": {
//       "teamName": "Avaí/Kindermann"
//     }
//   }
// ];

// const finishedMatches = [
//   {
//     "id": 1,
//     "homeTeam": 16,
//     "homeTeamGoals": 1,
//     "awayTeam": 8,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "teamHome": {
//       "teamName": "São Paulo"
//     },
//     "teamAway": {
//       "teamName": "Grêmio"
//     }
//   },
//   {
//     "id": 2,
//     "homeTeam": 9,
//     "homeTeamGoals": 1,
//     "awayTeam": 14,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "teamHome": {
//       "teamName": "Internacional"
//     },
//     "teamAway": {
//       "teamName": "Santos"
//     }
//   }
// ];

const correctLoginBody = { email: 'admin@admin.com', password: 'secret_admin' }

const newMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

const equalTeamsMatch = {
  homeTeam: 8,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

const invalidTeamMatch = {
  homeTeam: 99,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
};

describe('Testa se é possível receber um array de partidas através do método get /matches', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Matches, 'findAll')
  //     .resolves(foundMatches as unknown as Matches[]);
  // });

  // after(()=>{
  //   (Matches.findAll as sinon.SinonStub).restore();
  // });

  it('Verifica se a chamada retorna o código de status 200 e um array de partidas', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body.every(
      (match: MatchAndTeams) => expect(match).to.have.all.keys(
        ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway'],
      )
    )).to.be.equal(true);
  });

});

describe('Testa se é possível receber um array de partidas em andamento usando query string', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Matches, 'findAll')
  //     .resolves(inProgressMatches as unknown as Matches[]);
  // });

  // after(()=>{
  //   (Matches.findAll as sinon.SinonStub).restore();
  // });

  it('Verifica se a chamada retorna o código de status 200 e um array de partidas em andamento', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body.every(
      (match: MatchAndTeams) => expect(match).to.have.property( 'inProgress', true))
      ).to.be.equal(true);
  });

});

describe('Testa se é possível receber um array de partidas encerradas usando query string', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Matches, 'findAll')
  //     .resolves(finishedMatches as unknown as Matches[]);
  // });

  // after(()=>{
  //   (Matches.findAll as sinon.SinonStub).restore();
  // });

  it('Verifica se a chamada retorna o código de status 200 e um array de partidas encerradas', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body.every(
      (match: MatchAndTeams) => expect(match).to.have.property( 'inProgress', false))
      ).to.be.equal(true);
  });

});

describe('Testa se é possível cadastrar uma partida em andamento', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Matches, 'findAll')
  //     .resolves(finishedMatches as unknown as Matches[]);
  // });

  // after(()=>{
  //   (Matches.findAll as sinon.SinonStub).restore();
  // });

  it('Verifica se a chamada retorna o código de status 201 e uma partida em andamento', async () => {
    chaiHttpResponse = await chai
      .request(app).post('/login').send(correctLoginBody);

    const token = chaiHttpResponse.body.token;

    chaiHttpResponse = await chai
       .request(app).post('/matches').send(newMatch).set({ 'authorization': token });

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.all.keys(['id', 'homeTeam', 'awayTeam', 'homeTeamGoals', 'awayTeamGoals', 'inProgress']);
  });

});

describe('Testa se é possível encerrar uma partida', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Matches, 'findAll')
  //     .resolves(finishedMatches as unknown as Matches[]);
  // });

  // after(()=>{
  //   (Matches.findAll as sinon.SinonStub).restore();
  // });

  it('Verifica se a chamada retorna o código de status 200 e a message: Finished', async () => {
    chaiHttpResponse = await chai
       .request(app).patch('/matches/41/finish');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('message', 'Finished');
  });

});

describe('Testa se não é possível cadastrar uma partida com dois times iguais', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Matches, 'findAll')
  //     .resolves(finishedMatches as unknown as Matches[]);
  // });

  // after(()=>{
  //   (Matches.findAll as sinon.SinonStub).restore();
  // });

  it('Verifica se a chamada retorna o código de status 401 e a mensagem de erro', async () => {
    chaiHttpResponse = await chai
      .request(app).post('/login').send(correctLoginBody);

    const token = chaiHttpResponse.body.token;

    chaiHttpResponse = await chai
       .request(app).post('/matches').send(equalTeamsMatch).set({ 'authorization': token });

    const errorMessage = 'It is not possible to create a match with two equal teams'

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message', errorMessage);  });

});

describe('Testa se não é possível cadastrar uma partida com um time inexistente', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Matches, 'findAll')
  //     .resolves(finishedMatches as unknown as Matches[]);
  // });

  // after(()=>{
  //   (Matches.findAll as sinon.SinonStub).restore();
  // });

  it('Verifica se a chamada retorna o código de status 401 e a mensagem de erro', async () => {
    chaiHttpResponse = await chai
      .request(app).post('/login').send(correctLoginBody);

    const token = chaiHttpResponse.body.token;

    chaiHttpResponse = await chai
       .request(app).post('/matches').send(invalidTeamMatch).set({ 'authorization': token });

    const errorMessage = 'There is no team with such id!'

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message', errorMessage);  });

});

describe('Testa se não é possível cadastrar uma partida sem um token válido', () => {

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Matches, 'findAll')
  //     .resolves(finishedMatches as unknown as Matches[]);
  // });

  // after(()=>{
  //   (Matches.findAll as sinon.SinonStub).restore();
  // });

  it('Verifica se a chamada com token inválido retorna o código de status 401 e a mensagem de erro', async () => {
    const token = 'token_inválido';

    chaiHttpResponse = await chai
       .request(app).post('/matches').send(newMatch).set({ 'authorization': token });

    const errorMessage = 'Token must be a valid token';

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message', errorMessage);
  });

    it('Verifica se a chamada sem um token retorna o código de status 401 e a mensagem de erro', async () => {
  
      chaiHttpResponse = await chai
         .request(app).post('/matches').send(newMatch);
  
      const errorMessage = 'Token must be a valid token';
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message', errorMessage);
    });

});
