import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchModel';
import { Match } from '../protocols';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

const foundMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
];

const inProgressMatches = [
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  }
];

const finishedMatches = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  }
];

describe('Testa se é possível receber um array de partidas através do método get /matches', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(foundMatches as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada retorna o código de status 200 e um array de partidas', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body.every(
      (match: Match) => expect(match).to.have.all.keys(
        ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway'],
      )
    )).to.be.equal(true);
  });

});

describe('Testa se é possível receber um array de partidas em andamento usando query string', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(inProgressMatches as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada retorna o código de status 200 e um array de partidas em andamento', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body.every(
      (match: Match) => expect(match).to.have.property( 'inProgress', true))
      ).to.be.equal(true);
  });

});

describe('Testa se é possível receber um array de partidas encerradas usando query string', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(finishedMatches as unknown as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se a chamada retorna o código de status 200 e um array de partidas encerradas', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body.every(
      (match: Match) => expect(match).to.have.property( 'inProgress', false))
      ).to.be.equal(true);
  });

});
