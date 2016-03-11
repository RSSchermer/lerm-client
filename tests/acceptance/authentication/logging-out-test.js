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

describe('Acceptance - Authentication: Logging out', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  beforeEach(function() {
    visit('/');
  });

  describe('I am logged in', function() {
    beforeEach(function() {
      logIn();
    });

    it('displays a logout link in the user menu', function() {
      expect(find('.user-menu').text()).to.contain('Log out');
    });

    describe('I click the logout link', function() {
      beforeEach(function() {
        click('.logout-link');
      });

      it('transitions to the login page', function() {
        expect(currentURL()).to.equal('/login');
      });

      it('does not display a logout link in the user menu', function() {
        expect(find('.user-menu').text()).to.not.contain('Log out');
      });
    });
  });
});
