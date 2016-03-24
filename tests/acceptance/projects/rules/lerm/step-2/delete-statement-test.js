/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../../../../helpers/start-app';
import destroyApp from '../../../../../helpers/destroy-app';

describe('Acceptance - Projects | Rules: LERM step 2 - deleting a statement', function() {
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
          label: 'Some Rule',
          projectId: this.project.id,
          proactiveForm: 'Some proactive form'
        });
      });

      describe('2 statements exist for the rule', function() {
        beforeEach(function() {
          this.statements = server.createList('statement', 2, { ruleId: this.rule.id });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 2 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
            });

            it('does not show delete buttons for the statements', function() {
              expect(find('.lerm-step-2b .statement-list .delete-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is not a project member', function() {
          beforeEach(function() {
            logIn();
          });

          describe('I visit the page for step 2 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
            });

            it('does not show delete buttons for the statements', function() {
              expect(find('.lerm-step-2b .statement-list .delete-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is a project member', function() {
          beforeEach(function() {
            this.currentUser = server.create('user');
            server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
            logIn(this.currentUser);
          });

          describe('I visit the page for step 2 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
            });

            it('shows delete buttons for the statements', function() {
              expect(find('.lerm-step-2b .statement-list .delete-btn').length).to.equal(2);
            });

            describe('I click the delete button for the first statement', function() {
              beforeEach(function() {
                click('.lerm-step-2b .statement-list .delete-btn:first');
              });

              it('displays a modal asking for confirmation', function() {
                expect(find('.ember-modal-dialog').text()).to
                  .contain('Are you sure you wish to delete this statement?');
              });

              it('displays the details for the first statement in the modal', function() {
                expect(find('.ember-modal-dialog').text()).to.contain(this.statements[0].originalCondition);
              });

              describe('I click the cancel button', function() {
                beforeEach(function() {
                  click('.ember-modal-dialog .delete-cancel-btn');
                });

                it('closes the modal', function() {
                  expect(find('.ember-modal-dialog').length).to.equal(0);
                });

                it('lists 2 statements in the statement list', function() {
                  expect(find('.lerm-step-2b .statement-list li').length).to.equal(2);
                });
              });

              describe('I click the button to confirm the delete', function() {
                beforeEach(function() {
                  click('.ember-modal-dialog .delete-confirm-btn');
                });

                it('closes the modal', function() {
                  expect(find('.ember-modal-dialog').length).to.equal(0);
                });

                it('lists 1 statement in the statement list', function() {
                  expect(find('.lerm-step-2b .statement-list li').length).to.equal(1);
                });

                it('lists the statement that was not deleted', function() {
                  expect(find('.lerm-step-2b .statement-list').text()).to.contain(this.statements[1].originalCondition);
                });
              });
            });
          });
        });
      });
    });
  });
});
