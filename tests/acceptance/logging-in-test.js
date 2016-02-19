/* jshint expr:true */
import {
  describe,
  context,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: Logging in', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  beforeEach(function () {
    visit('login');
  });

  it('can visit /login', function() {
    expect(currentPath()).to.equal('login');
  });

  context('with invalid credentials', function () {
    it('remains on the login page');

    it('displays a message indicating the credentials were invalid');
  });

  context('with valid credentials', function () {
    it('redirects to /current-user');

    it('displays the correct username');
  });
});
