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

describe('Acceptance - Projects: Creating a project', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('I am not logged in', function() {
    describe('I visit the page for listing projects', function() {
      beforeEach(function() {
        visit('projects');
      });

      it('does not show a link for creating a new project', function() {
        expect(find('main').text()).to.not.contain('Create a new project');
      });
    });

    describe('I visit the page for creating a new project', function() {
      beforeEach(function() {
        visit('projects/new');
      });

      it('redirects me to the login page', function() {
        expect(currentPath()).to.equal('login');
      });
    });
  });

  describe('I am logged in', function() {
    beforeEach(function() {
      logIn();
    });

    describe('I visit the page for listing projects', function() {
      beforeEach(function() {
        visit('projects');
      });

      it('shows a link for creating a new project', function() {
        expect(find('main').text()).to.contain('Create a new project');
      });
    });

    describe('I visit the page for creating a new project', function() {
      beforeEach(function() {
        visit('projects/new');
      });

      it('shows a form for creating a new project', function() {
        expect(find('.new-project-form').length).to.not.equal(0);
      });

      describe('I fill out the form with valid project data', function() {
        beforeEach(function() {
          fillIn('#name', 'Some project');
          fillIn('#description', 'Some description');
        });

        describe('I leave the page for creating projects without submitting the form', function() {
          beforeEach(function() {
            visit('/');
          });

          describe('I visit the page for listing projects', function() {
            beforeEach(function() {
              visit('projects');
            });

            it('does not list the project', function() {
              expect(find('.projects-table').text()).to.not.contain('Some project');
            });
          });
        });

        describe('I submit the form', function() {
          beforeEach(function() {
            click('.new-project-form .btn-primary');
          });

          it('transitions to the projects\'s overview page', function() {
            expect(currentPath()).to.equal('projects.show.index');
            expect(find('main').text()).to.contain('Some project');
          });

          it('displays a flash message indicating that the new project was created successfully', function() {
            expect(find('main').text()).to.contain('The project was created successfully');
          });

          describe('I visit the page for listing projects', function() {
            beforeEach(function() {
              visit('projects');
            });

            it('lists the project', function() {
              expect(find('.projects-table').text()).to.contain('Some project');
            });
          });
        });
      });
    });
  });
});
