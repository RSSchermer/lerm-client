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

describe('Acceptance - Projects | Rules: LERM step 4 - editing cleaned statement', function() {
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
          projectId: this.project.id
        });
      });

      describe('3 statements exist for the rule', function() {
        beforeEach(function() {
          server.createList('statement', 3, {
            ruleId: this.rule.id,
            cleanedCondition: 'Some cleaned condition',
            cleanedConsequence: 'Some cleaned consequence'
          });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 4 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-4`);
            });

            it('does not show buttons for editing the statement', function() {
              expect(find('.lerm-step-4b .statement-list .edit-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is not a project member', function() {
          beforeEach(function() {
            logIn();
          });

          describe('I visit the page for step 4 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-4`);
            });

            it('does not show buttons for editing the cleaned statement texts', function() {
              expect(find('.lerm-step-4b .statement-list .edit-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is a project member', function() {
          beforeEach(function() {
            this.currentUser = server.create('user');
            server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
            logIn(this.currentUser);
          });

          describe('I visit the page for step 4 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-4`);
            });

            it('shows button for editing each of the cleaned statement texts', function() {
              expect(find('.lerm-step-4b .statement-list .edit-btn').length).to.equal(3);
            });

            describe('I click the edit button for the first statement', function() {
              beforeEach(function() {
                click('.lerm-step-4b .statement-list li:first-of-type .edit-btn');
              });

              it('shows a form for editing the cleaned statement', function() {
                expect(find('.lerm-step-4b .statement-list li:first-of-type .save-btn').length).to.equal(1);
              });

              describe('I fill in a new cleaned condition and consequence', function() {
                beforeEach(function() {
                  fillIn('.lerm-step-4b .statement-list .cleaned-condition-field', 'New cleaned condition');
                  fillIn('.lerm-step-4b .statement-list .cleaned-consequence-field', 'New cleaned consequence');
                });

                describe('I click the cancel button', function() {
                  beforeEach(function() {
                    click('.lerm-step-4b .statement-list .cleaned-statement-form .cancel-btn');
                  });

                  it('does not displays an form for editing the cleaned statement', function() {
                    expect(find('.lerm-step-4b .statement-list li:first-of-type .save-btn').length).to.equal(0);
                  });

                  it('displays the old cleaned statement condition', function() {
                    expect(find('.lerm-step-4b .statement-list li:first-of-type').text()).to.contain('Some cleaned condition');
                  });

                  it('displays the old cleaned statement consequence', function() {
                    expect(find('.lerm-step-4b .statement-list li:first-of-type').text()).to.contain('Some cleaned consequence');
                  });
                });

                describe('I click the save button', function() {
                  beforeEach(function() {
                    click('.lerm-step-4b .statement-list .cleaned-statement-form .save-btn');
                  });

                  it('does not displays an form for editing the cleaned statement', function() {
                    expect(find('.lerm-step-4b .statement-list li:first-of-type .save-btn').length).to.equal(0);
                  });

                  it('displays the updated cleaned statement condition', function() {
                    expect(find('.lerm-step-4b .statement-list li:first-of-type').text()).to.contain('New cleaned condition');
                  });

                  it('displays the updated cleaned statement consequence', function() {
                    expect(find('.lerm-step-4b .statement-list li:first-of-type').text()).to.contain('New cleaned consequence');
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});