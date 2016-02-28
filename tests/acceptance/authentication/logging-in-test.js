/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';

describe('Acceptance - Authentication: Logging in', function () {
  let application;

  beforeEach(function () {
    application = startApp();
  });

  afterEach(function () {
    destroyApp(application);
  });

  beforeEach(function () {
    visit('login');
  });

  it('can visit /login', function () {
    expect(currentPath()).to.equal('login');
  });

  describe('I log in with invalid credentials', function () {
    beforeEach(function () {
      fillIn('#identification', 'valid_email@example.com');
      fillIn('#password', 'invalid_password');
      click('.auth-form .submit-button');
    });

    it('remains on the login page', function () {
      expect(currentPath()).to.equal('login');
    });

    it('displays a message indicating the credentials were invalid', function () {
      expect(find('.auth-form').text()).to.contain('Invalid email/password');
    });
  });

  describe('I log in with valid credentials', function () {
    beforeEach(function () {
      fillIn('#identification', 'valid_email@example.com');
      fillIn('#password', 'valid_password');
      click('.auth-form .submit-button');
    });

    it('redirects to current-user', function () {
      expect(currentPath()).to.equal('current-user');
    });
  });
});
