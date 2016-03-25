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

describe('Acceptance - Projects | Rules: LERM step 2 - adding a statement', function() {
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

      describe('I am not logged in', function() {
        describe('I visit the page for step 2 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
          });

          it('does not show a button for adding a statement', function() {
            expect(find('.lerm-step-2b .add-statement-btn').length).to.equal(0);
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

          it('does not show a button for adding a statement', function() {
            expect(find('.lerm-step-2b .add-statement-btn').length).to.equal(0);
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

          it('shows a button for adding a statement', function() {
            expect(find('.lerm-step-2b .add-statement-btn').length).to.equal(1);
          });

          describe('I click the button to add a statement', function() {
            beforeEach(function() {
              click('.lerm-step-2b .add-statement-btn');
            });

            it('adds an empty form to the statement list', function() {
              expect(find('.lerm-step-2b .statement-list .statement-form').length).to.equal(1);
            });

            describe('I fill in valid data', function() {
              beforeEach(function() {
                fillIn('.lerm-step-2b .statement-form:first .condition-field', 'Some condition');
                fillIn('.lerm-step-2b .statement-form:first .consequence-field', 'Some consequence');
              });

              describe('I click the cancel button', function() {
                beforeEach(function() {
                  click('.lerm-step-2b .statement-form:first .cancel-btn');
                });

                it('displays an empty statement list', function() {
                  expect(find('.lerm-step-2b .statement-list-section').text()).to
                    .contain('No statements have been added yet for this rule');
                });
              });

              describe('I click the save button', function() {
                beforeEach(function() {
                  click('.lerm-step-2b .statement-form:first .save-btn');
                });

                it('does not display the statement edit form', function() {
                  expect(find('.lerm-step-2b .statement-list .statement-form').length).to.equal(0);
                });

                it('displays 1 statement in the statement list', function() {
                  expect(find('.lerm-step-2b .statement-panel').length).to.equal(1);
                });

                it('displays the correct condition', function() {
                  expect(find('.lerm-step-2b .statement-panel:first').text()).to.contain('Some condition');
                });

                it('displays the correct consequence', function() {
                  expect(find('.lerm-step-2b .statement-panel:first').text()).to.contain('Some consequence');
                });
              });
            });
          });
        });
      });
    });
  });
});
