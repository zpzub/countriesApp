/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Countries, Activities, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentinas',
  id: '43345435',
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })); 
  beforeEach(() => Countries.sync({ alter: false })
    .then(() => Countries.create(country)));
  
    describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
});
