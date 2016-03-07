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

describe('Acceptance - Projects: Editing a project', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('A project exists', function() {
    beforeEach(function() {
      this.project = server.create('project', { name: 'Some project' });
    });

    describe('I am not logged in', function() {
      describe('I visit the page for the project', function() {
        beforeEach(function() {
          visit(`projects/${this.project.id}`);
        });

        it('does not show a link for editing the project', function() {
          expect(find('.project-edit-link').length).to.equal(0);
        });

        describe('I visit the page for editing the project', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/edit`);
          });

          it('redirects me to the login page', function() {
            expect(currentPath()).to.equal('login');
          });
        });
      });
    });

    describe('I am logged as a user who is not a project member', function() {
      beforeEach(function() {
        logIn();
      });

      describe('I visit the page for the project', function() {
        beforeEach(function() {
          visit(`projects/${this.project.id}`);
        });

        it('does not show a link for editing the project', function() {
          expect(find('.project-edit-link').length).to.equal(0);
        });

        describe('I visit the page for editing the project', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/edit`);
          });

          it('tells me I am not authorized to open this page', function() {
            expect(find('h1').text()).to.contain('Unauthorized');
          });
        });
      });
    });

    describe('I am logged as a user who is a project member', function() {
      beforeEach(function() {
        this.currentUser = server.create('user');
        server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
        logIn(this.currentUser);
      });

      describe('I visit the page for the project', function() {
        beforeEach(function() {
          visit(`projects/${this.project.id}`);
        });

        it('shows a link for editing the project', function() {
          expect(find('.project-edit-link').length).to.not.equal(0);
        });

        describe('I visit the page for editing the project', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/edit`);
          });

          it('shows a form for editing the project', function() {
            expect(find('.project-edit-form').length).to.not.equal(0);
          });

          describe('I fill out the form with valid project data', function() {
            beforeEach(function() {
              fillIn('#name', 'New project name');
              fillIn('#description', 'Some description');
            });

            describe('I leave the page without submitting the form', function() {
              beforeEach(function() {
                visit('/');
              });

              describe('I visit the page for the project', function() {
                beforeEach(function() {
                  visit(`projects/${this.project.id}`);
                });

                it('shows the old name for the project', function() {
                  expect(find('main').text()).to.contain('Some project');
                });
              });
            });

            describe('I submit the form', function() {
              beforeEach(function() {
                click('.project-edit-form .btn-primary');
              });

              it('transitions to the projects\'s overview page', function() {
                expect(currentPath()).to.equal('projects.show.index');
              });

              it('displays a flash message indicating that the new project was updated successfully', function() {
                expect(find('main').text()).to.contain('The project was updated successfully');
              });

              it('shows the updated name for the project', function() {
                expect(find('main').text()).to.contain('New project name');
              });
            });
          });
        });
      });
    });
  });
});
