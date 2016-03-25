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

describe('Acceptance - Projects | Rules: LERM step 3 - adding a conflict', function() {
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

      describe('another rule exists for the project', function() {
        beforeEach(function() {
          this.conflictingRule = server.create('rule', {
            label: 'Some Other Rule',
            projectId: this.project.id
          });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 3 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-3`);
            });

            it('does not show a button for adding a conflict', function() {
              expect(find('.lerm-step-3 .add-conflict-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is not a project member', function() {
          beforeEach(function() {
            logIn();
          });

          describe('I visit the page for step 3 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-3`);
            });

            it('does not show a button for adding a conflict', function() {
              expect(find('.lerm-step-3 .add-conflict-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is a project member', function() {
          beforeEach(function() {
            this.currentUser = server.create('user');
            server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
            logIn(this.currentUser);
          });

          describe('I visit the page for step 3 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-3`);
            });

            it('shows a button for adding a conflict', function() {
              expect(find('.lerm-step-3 .add-conflict-btn').length).to.equal(1);
            });

            describe('I click the button to add a conflict', function() {
              beforeEach(function() {
                click('.lerm-step-3 .add-conflict-btn');
              });

              it('adds an empty form to the conflict list', function() {
                expect(find('.lerm-step-3 .conflict-list .conflict-form').length).to.equal(1);
              });

              describe('I fill in valid data', function() {
                beforeEach(function() {
                  selectChoose('.lerm-step-3 .conflict-form:first .conflicting-rule-field', 'Some Other Rule');
                  fillIn('.lerm-step-3 .conflict-form:first .description-field', 'Some description');
                });

                describe('I click the cancel button', function() {
                  beforeEach(function() {
                    click('.lerm-step-3 .conflict-form:first .cancel-btn');
                  });

                  it('displays an empty conflict list', function() {
                    expect(find('.lerm-step-3 .conflict-list-section').text()).to
                      .contain('No conflicts have been identified yet for this rule');
                  });
                });

                describe('I click the save button', function() {
                  beforeEach(function() {
                    click('.lerm-step-3 .conflict-form:first .save-btn');
                  });

                  it('does not display the conflict edit form', function() {
                    expect(find('.lerm-step-3 .conflict-list .conflict-form').length).to.equal(0);
                  });

                  it('displays 1 conflict in the conflict list', function() {
                    expect(find('.lerm-step-3 .conflict-panel').length).to.equal(1);
                  });

                  it('displays the correct rule label', function() {
                    expect(find('.lerm-step-3 .conflict-panel:first').text()).to.contain('Some Other Rule');
                  });

                  it('displays the correct description', function() {
                    expect(find('.lerm-step-3 .conflict-panel:first').text()).to.contain('Some description');
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
