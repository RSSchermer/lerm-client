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

describe('Acceptance - Projects | Data Elements: adding a data element to a project', function() {
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
      describe('I visit the page for listing the data elements of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/data-elements`);
        });

        it('does not show a link for adding a data-element to the project', function() {
          expect(find('.add-data-element-link').length).to.equal(0);
        });

        describe('I visit the page for adding a data-element to the project', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/data-elements/new`);
          });

          it('redirects me to the login page', function() {
            expect(currentURL()).to.equal('/login');
          });
        });
      });
    });

    describe('I am logged as a user who is not a project member', function() {
      beforeEach(function() {
        logIn();
      });

      describe('I visit the page for listing the data elements of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/data-elements`);
        });

        it('does not show a link for adding a data element to the project', function() {
          expect(find('.add-data-element-link').length).to.equal(0);
        });

        describe('I visit the page for adding a data-element to the project', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/data-elements/new`);
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

      describe('I visit the page for the listing the data-elements of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/data-elements`);
        });

        it('shows a link for adding a data element the project', function() {
          expect(find('.add-data-element-link').length).to.not.equal(0);
        });

        describe('I visit the page for adding a data element to the project', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/data-elements/new`);
          });

          it('shows a form for editing adding a data element', function() {
            expect(find('.add-data-element-form').length).to.not.equal(0);
          });

          describe('I fill in the form with valid data', function() {
            beforeEach(function() {
              fillIn('#label', 'Some Data Element');
              fillIn('#description', 'Some description');
            });

            describe('I click the button the add the data element', function() {
              beforeEach(function() {
                click('.add-data-element-form .btn-primary');
              });

              it('redirects me to the page listing the data elements of the project', function() {
                expect(currentURL()).to.equal(`/projects/${this.project.id}/data-elements`);
              });

              it('it displays a flash message indicating that the data element was added successfully', function() {
                expect(find('main').text()).to.contain('The data element was added successfully');
              });

              it('lists the data element in the data element list', function() {
                expect(find('.project-data-elements-table tbody').text()).to.contain('Some Data Element');
              });
            });
          });
        });
      });
    });
  });
});
