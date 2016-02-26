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

describe('Acceptance: Projects | Creating a project', function () {
  let application;

  beforeEach(function () {
    application = startApp();
  });

  afterEach(function () {
    destroyApp(application);
  });

  describe('I am not logged in', function () {
    describe('I visit the page for listing projects', function () {
      beforeEach(function () {
        visit('projects');
      });

      it('does not show a link for creating a new project', function () {
        expect(find('main').text()).to.contain('Create a new project');
      });
    });

    describe('I visit the page for creating a new project', function () {
      beforeEach(function () {
        visit('projects/new');
      });

      it('redirects me to the login page', function () {
        expect(currentPath()).to.equal('login');
      });
    });
  });

  describe('I am logged in', function () {
    beforeEach(function () {
      server.create('currentUser');
    });
    beforeEach(function () {
      authenticateSession(application);
    });

    describe('I visit the page for listing projects', function () {
      beforeEach(function () {
        visit('projects');
      });

      it('shows a link for creating a new project', function () {
        expect(find('main').text()).to.contain('Create a new project');
      });
    });

    describe('I visit the page for creating a new project', function () {
      beforeEach(function () {
        visit('projects/new');
      });

      it('shows a form for creating a new project', function () {
        expect(find('.new-project-form')).to.not.be.empty;
      });

      describe('I fill out the form leaving the name empty', function () {
        beforeEach(function () {
          fillIn('#description', 'Some description');
          click('.new-project-form .submit-button');
        });

        it('remains on the page for creating a new project', function () {
          expect(currentPath()).to.equal('projects.new');
        });

        it('shows an error that indicates the name is required', function () {
          expect(find('.new-project-form').text()).to.contain('Name may not be empty');
        });
      });

      describe('I fill out the form with valid project data', function () {
        beforeEach(function () {
          fillIn('#name', 'Some project');
          fillIn('#description', 'Some description');
          click('.new-project-form .submit-button');
        });

        it('transitions to the projects\'s overview page', function () {
          expect(currentPath()).to.equal('projects.show');
          expect(find('main')).to.contain('Some project');
        });

        it('displays a message indicating that the new project was created successfully', function () {
          expect(find('main').text()).to.contain('The new project was created successfully');
        });

        describe('I visit my profile page', function () {
          beforeEach(function () {
            visit('current-user');
          });

          it('lists the new project in my project\'s list', function () {
            expect(find('.projects-list')).to.contain('Some project');
          });
        });
      });
    });
  });
});
