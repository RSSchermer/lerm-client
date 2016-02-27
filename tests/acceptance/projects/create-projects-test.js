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
        expect(find('main').text()).to.not.contain('Create a new project');
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
      this.currentUser = server.create('user');
      server.create('accessToken', {resourceOwnerId: this.currentUser});
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

      describe('I fill out the form with valid project data', function () {
        beforeEach(function () {
          fillIn('.new-project-form .name-group input', 'Some project');
          fillIn('.new-project-form .description-group textarea', 'Some description');
        });

        describe('I leave the page for creating projects without submitting the form', function () {
          beforeEach(function () {
            visit('/');
          });

          describe('I visit the page for listing projects', function () {
            beforeEach(function () {
              visit('projects');
            });

            it('does not list the project', function () {
              expect(find('.projects-table').text()).to.not.contain('Some project');
            });
          });
        });

        describe('I submit the form', function () {
          beforeEach(function () {
            click('.new-project-form button[type="submit"]');
          });

          it('transitions to the projects\'s overview page', function () {
            expect(currentPath()).to.equal('projects.show');
            expect(find('main').text()).to.contain('Some project');
          });

          it('displays a flash message indicating that the new project was created successfully', function () {
            expect(find('main').text()).to.contain('The new project was created successfully');
          });

          describe('I visit the page for listing projects', function () {
            beforeEach(function () {
              visit('projects');
            });

            it('lists the project', function () {
              expect(find('.projects-table').text()).to.contain('Some project');
            });
          });
        });
      });
    });
  });
});
