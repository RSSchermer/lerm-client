/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

describe('Acceptance - Projects | Data Elements: Editing a data element', function() {
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

    describe('A data element exists for the project', function() {
      beforeEach(function() {
        this.dataElement = server.create('dataElement', {
          label: 'Some Data Element',
          projectId: this.project.id
        });
      });

      describe('I am not logged in', function() {
        describe('I visit the page for the data element', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/data-elements/${this.dataElement.id}`);
          });

          it('does not show a link for editing the data element', function() {
            expect(find('.data-element-edit-link').length).to.equal(0);
          });

          describe('I visit the page for editing the data element', function() {
            beforeEach(function() {
              visit(`projects/${this.project.id}/data-elements/${this.dataElement.id}/edit`);
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

        describe('I visit the page for the data element', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/data-elements/${this.dataElement.id}`);
          });

          it('does not show a link for editing the data element', function() {
            expect(find('.data-element-edit-link').length).to.equal(0);
          });

          describe('I visit the page for editing the data element', function() {
            beforeEach(function() {
              visit(`projects/${this.project.id}/data-elements/${this.dataElement.id}/edit`);
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

        describe('I visit the page for the data element', function() {
          beforeEach(function() {
            visit(`projects/${this.project.id}/data-elements/${this.dataElement.id}`);
          });

          it('shows a link for editing the data element', function() {
            expect(find('.data-element-edit-link').length).to.not.equal(0);
          });

          describe('I visit the page for editing the data element', function() {
            beforeEach(function() {
              visit(`projects/${this.project.id}/data-elements/${this.dataElement.id}/edit`);
            });

            it('shows a form for editing the data element', function() {
              expect(find('.data-element-edit-form').length).to.not.equal(0);
            });

            describe('I fill out the form with valid data element data', function() {
              beforeEach(function() {
                fillIn('#label', 'New data element label');
                fillIn('#description', 'Some description');
              });

              describe('I leave the page without submitting the form', function() {
                beforeEach(function() {
                  visit('/');
                });

                describe('I visit the page for the data element', function() {
                  beforeEach(function() {
                    visit(`projects/${this.project.id}/data-elements/${this.dataElement.id}`);
                  });

                  it('shows the old name for the project', function() {
                    expect(find('main').text()).to.contain('Some Data Element');
                  });
                });
              });

              describe('I submit the form', function() {
                beforeEach(function() {
                  click('.data-element-edit-form .btn-primary');
                });

                it('transitions to the data elements\'s overview page', function() {
                  expect(currentPath()).to.equal('projects.show.data-elements.show');
                });

                it('displays a flash message indicating that the new project was updated successfully', function() {
                  expect(find('main').text()).to.contain('The data element was updated successfully');
                });

                it('shows the updated name for the project', function() {
                  expect(find('main').text()).to.contain('New data element label');
                });
              });
            });
          });
        });
      });
    });
  });
});
