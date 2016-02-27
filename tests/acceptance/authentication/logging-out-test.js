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
import { authenticateSession } from 'lerm-client/tests/helpers/ember-simple-auth';

describe('Acceptance: Authentication | Logging out', function () {
  let application;

  beforeEach(function () {
    application = startApp();
  });

  afterEach(function () {
    destroyApp(application);
  });

  beforeEach(function () {
    visit('/');
  });

  describe('I am logged in', function () {
    beforeEach(function () {
      this.currentUser = server.create('user');
      server.create('accessToken', {resourceOwnerId: this.currentUser});
    });
    beforeEach(function () {
      authenticateSession(application);
    });

    it('displays a logout link in the user menu', function () {
      expect(find('.user-menu').text()).to.contain('Logout');
    });

    describe('I click the logout link', function () {
      beforeEach(function () {
        click('.logout-link');
      });

      it('transitions to the login page', function () {
        expect(currentPath()).to.equal('login');
      });

      it('does not display a logout link in the user menu', function () {
        expect(find('.user-menu').text()).to.not.contain('Logout');
      });
    });
  });
});
