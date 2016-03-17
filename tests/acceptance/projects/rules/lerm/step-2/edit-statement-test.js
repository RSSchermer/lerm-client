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

describe('Acceptance - Projects | Rules: LERM step 2 - editing a statement', function() {
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

      describe('a statement exists for the rule', function() {
        beforeEach(function() {
          server.create('statement', {
            condition: 'Some condition',
            consequence: 'Some consequence',
            ruleId: this.rule.id
          });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 2 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
            });

            it('does not show a button for editing the statement', function() {
              expect(find('.lerm-step-2b .statement-panel .edit-btn').length).to.equal(0);
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

            it('does not show a button for editing the statement', function() {
              expect(find('.lerm-step-2b .statement-panel .edit-btn').length).to.equal(0);
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

            it('shows a button for editing the statement', function() {
              expect(find('.lerm-step-2b .statement-panel .edit-btn').length).to.equal(1);
            });

            describe('I click the button to edit statement', function() {
              beforeEach(function() {
                click('.lerm-step-2b .statement-panel .edit-btn');
              });

              it('displays a form for editing the statement', function() {
                expect(find('.lerm-step-2b .statement-list .statement-form').length).to.equal(1);
              });

              describe('I fill in valid new data', function() {
                beforeEach(function() {
                  fillIn('.lerm-step-2b .statement-list .statement-form .condition-field', 'New condition');
                  fillIn('.lerm-step-2b .statement-list .statement-form .consequence-field', 'New consequence');
                });

                describe('I click the cancel button', function() {
                  beforeEach(function() {
                    click('.lerm-step-2b .statement-list .statement-form .cancel-btn');
                  });

                  it('displays the old statement condition', function() {
                    expect(find('.lerm-step-2b .statement-list').text()).to.contain('Some condition');
                  });

                  it('displays the old statement consequence', function() {
                    expect(find('.lerm-step-2b .statement-list').text()).to.contain('Some consequence');
                  });
                });

                describe('I click the save button', function() {
                  beforeEach(function() {
                    click('.lerm-step-2b .statement-list .statement-form .save-btn');
                  });

                  it('does not display the statement edit form', function() {
                    expect(find('.lerm-step-2b .statement-list .statement-form').length).to.equal(0);
                  });

                  it('displays 1 statement in the statement list', function() {
                    expect(find('.lerm-step-2b .statement-list li').length).to.equal(1);
                  });

                  it('displays the new condition', function() {
                    expect(find('.lerm-step-2b .statement-list').text()).to.contain('New condition');
                  });

                  it('displays the new consequence', function() {
                    expect(find('.lerm-step-2b .statement-list').text()).to.contain('New consequence');
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
