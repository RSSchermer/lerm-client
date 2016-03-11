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

describe('Acceptance - Projects | Rules: Deleting a rule', function() {
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

    describe('A rule exists for the project', function() {
      beforeEach(function() {
        this.rule = server.create('rule', {
          label: 'Some rule',
          projectId: this.project.id
        });
      });

      describe('I am not logged in', function() {
        describe('I visit the page for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('does not show a link for deleting the rule', function() {
            expect(find('.rule-delete-modal-link').length).to.equal(0);
          });
        });
      });

      describe('I am logged as a user who is not a project member', function() {
        beforeEach(function() {
          logIn();
        });

        describe('I visit the page for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('does not show a link for deleting the rule', function() {
            expect(find('.rule-delete-modal-link').length).to.equal(0);
          });
        });
      });

      describe('I am logged as a user who is a project member', function() {
        beforeEach(function() {
          this.currentUser = server.create('user');
          server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
          logIn(this.currentUser);
        });

        describe('I visit the page for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}`);
          });

          it('shows a link for deleting the rule', function() {
            expect(find('.rule-delete-modal-link').length).to.not.equal(0);
          });

          describe('I click the link for deleting the rule', function() {
            beforeEach(function() {
              click('.rule-delete-modal-link');
            });

            it('shows a modal popup asking if I am sure I want to delete the rule', function() {
              expect(find('.ember-modal-dialog').text()).to.contain('Are you sure you wish to delete this rule?');
            });

            it('shows the correct rule label in the modal', function() {
              expect(find('.ember-modal-dialog').text()).to.contain('Some rule');
            });

            describe('I click the cancel button', function() {
              beforeEach(function() {
                click('.ember-modal-dialog .delete-cancel-btn');
              });

              it('closes the modal', function() {
                expect(find('.ember-modal-dialog').length).to.equal(0);
              });

              it('still displays the rule', function() {
                expect(find('main').text()).to.contain('Some rule');
              });
            });

            describe('I click the delete button', function() {
              beforeEach(function() {
                click('.ember-modal-dialog .delete-btn');
              });

              it('redirects me to the page listing the rules of the project', function() {
                expect(currentURL()).to.equal(`/projects/${this.project.id}/rules`);
              });

              it('it displays a flash message indicating that the rule was deleted successfully', function() {
                expect(find('main').text()).to.contain('The rule was deleted successfully');
              });

              it('does not list the rule in the rule list', function() {
                expect(find('.project-rules-table tbody').text()).to.not.contain('Some rule');
              });
            });
          });
        });
      });
    });
  });
});
