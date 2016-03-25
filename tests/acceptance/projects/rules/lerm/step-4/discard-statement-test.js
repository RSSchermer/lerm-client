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

describe('Acceptance - Projects | Rules: LERM step 4 - discarding a statement', function() {
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

            it('does not show buttons for discarding the statements', function() {
              expect(find('.lerm-step-4b .statement-panel .discard-btn').length).to.equal(0);
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

            it('does not show buttons for discarding the statements', function() {
              expect(find('.lerm-step-4b .statement-panel .discard-btn').length).to.equal(0);
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

            it('shows discard buttons for each of the statements', function() {
              expect(find('.lerm-step-4b .statement-panel .discard-btn').length).to.equal(3);
            });

            describe('I am not editing the statement', function() {
              describe('I click the discard button for the first statement', function() {
                beforeEach(function() {
                  click('.lerm-step-4b .statement-panel:first .discard-btn');
                });

                it('marks the first statement as discarded', function() {
                  expect(find('.lerm-step-4b .statement-panel:first').hasClass('discarded')).to.be.true;
                });

                it('shows a button for reinstating the first statement', function() {
                  expect(find('.lerm-step-4b .statement-panel:first .reinstate-btn').length).to.equal(1);
                });
              });
            });

            describe('I am editing the statement', function() {
              beforeEach(function() {
                click('.lerm-step-4b .statement-panel:first .edit-btn');
              });

              it('shows a form for editing the cleaned statement', function() {
                expect(find('.lerm-step-4b .statement-panel:first .save-btn').length).to.equal(1);
              });

              describe('I fill in a new cleaned condition and consequence', function() {
                beforeEach(function() {
                  fillIn('.lerm-step-4b .cleaned-statement-form:first .cleaned-condition-field', 'New cleaned condition');
                  fillIn('.lerm-step-4b .cleaned-statement-form:first .cleaned-consequence-field', 'New cleaned consequence');
                });

                describe('I click the discard button', function() {
                  beforeEach(function() {
                    click('.lerm-step-4b .statement-panel:first .discard-btn');
                  });

                  it('does not displays an form for editing the cleaned statement', function() {
                    expect(find('.lerm-step-4b .statement-panel:first .save-btn').length).to.equal(0);
                  });

                  it('displays the old cleaned statement condition', function() {
                    expect(find('.lerm-step-4b .statement-panel:first').text()).to.contain('Some cleaned condition');
                  });

                  it('displays the old cleaned statement consequence', function() {
                    expect(find('.lerm-step-4b .statement-panel:first').text()).to.contain('Some cleaned consequence');
                  });

                  it('marks the first statement as discarded', function() {
                    expect(find('.lerm-step-4b .statement-panel:first').hasClass('discarded')).to.be.true;
                  });

                  it('shows a button for reinstating the first statement', function() {
                    expect(find('.lerm-step-4b .statement-panel:first .reinstate-btn').length).to.equal(1);
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
