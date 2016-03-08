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

describe('Acceptance - Projects | Data Elements: Deleting a data element', function() {
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

          it('does not show a link for deleting the data element', function() {
            expect(find('.data-element-delete-modal-link').length).to.equal(0);
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

          it('does not show a link for deleting the data element', function() {
            expect(find('.data-element-delete-modal-link').length).to.equal(0);
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

          it('shows a link for deleting the data element', function() {
            expect(find('.data-element-delete-modal-link').length).to.not.equal(0);
          });

          describe('I click the link for deleting the data element', function() {
            beforeEach(function() {
              click('.data-element-delete-modal-link');
            });

            it('shows a modal popup asking if I am sure I want to delete the data element', function() {
              expect(find('.ember-modal-dialog').text()).to.contain('Are you sure you wish to delete this data element?');
            });

            it('shows the correct data element label in the modal', function() {
              expect(find('.ember-modal-dialog').text()).to.contain('Some Data Element');
            });

            describe('I click the cancel button', function() {
              beforeEach(function() {
                click('.ember-modal-dialog .delete-cancel-btn');
              });

              it('closes the modal', function() {
                expect(find('.ember-modal-dialog').length).to.equal(0);
              });

              it('still displays the data element', function() {
                expect(find('main').text()).to.contain('Some Data Element');
              });
            });

            describe('I click the delete button', function() {
              beforeEach(function() {
                click('.ember-modal-dialog .delete-btn');
              });

              it('redirects me to the page listing the data elements of the project', function() {
                expect(currentPath()).to.equal('projects.show.data-elements.index');
              });

              it('it displays a flash message indicating that the data element was deleted successfully', function() {
                expect(find('main').text()).to.contain('The data element was deleted successfully');
              });

              it('does not list the data element in the data element list', function() {
                expect(find('.project-data-elements-table tbody').text()).to.not.contain('Some Data Element');
              });
            });
          });
        });
      });
    });
  });
});
