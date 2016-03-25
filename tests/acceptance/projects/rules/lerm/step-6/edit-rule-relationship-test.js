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

describe('Acceptance - Projects | Rules: LERM step 6 - editing a relationship', function() {
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

      describe('a relationship exists for the rule', function() {
        beforeEach(function() {
          server.create('rule-relationship', {
            ruleOneId: this.rule.id,
            ruleTwoId: server.create('rule', { projectId: this.project.id }).id,
            description: 'Some description',
            projectId: this.project.id
          });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 6 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-6`);
            });

            it('does not show a button for editing the relationship', function() {
              expect(find('.lerm-step-6 .relationship-panel:first .edit-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is not a project member', function() {
          beforeEach(function() {
            logIn();
          });

          describe('I visit the page for step 6 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-6`);
            });

            it('does not show a button for editing the relationship', function() {
              expect(find('.lerm-step-6 .relationship-panel:first .edit-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is a project member', function() {
          beforeEach(function() {
            this.currentUser = server.create('user');
            server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
            logIn(this.currentUser);
          });

          describe('I visit the page for step 6 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-6`);
            });

            it('shows a button for editing the relationship', function() {
              expect(find('.lerm-step-6 .relationship-panel:first .edit-btn').length).to.equal(1);
            });

            describe('I click the button to edit relationship', function() {
              beforeEach(function() {
                click('.lerm-step-6 .relationship-panel:first .edit-btn');
              });

              it('displays a form for editing the relationship\'s description', function() {
                expect(find('.lerm-step-6 .relationship-list .relationship-form').length).to.equal(1);
              });

              describe('I fill in a new description', function() {
                beforeEach(function() {
                  fillIn('.lerm-step-6 .relationship-form:first .description-field', 'New description');
                });

                describe('I click the cancel button', function() {
                  beforeEach(function() {
                    click('.lerm-step-6 .relationship-form:first .cancel-btn');
                  });

                  it('displays the old relationship description', function() {
                    expect(find('.lerm-step-6 .relationship-panel:first').text()).to.contain('Some description');
                  });
                });

                describe('I click the save button', function() {
                  beforeEach(function() {
                    click('.lerm-step-6 .relationship-form:first .save-btn');
                  });

                  it('does not display the relationship edit form', function() {
                    expect(find('.lerm-step-6 .relationship-list .relationship-form').length).to.equal(0);
                  });

                  it('displays 1 relationship in the relationship list', function() {
                    expect(find('.lerm-step-6 .relationship-panel').length).to.equal(1);
                  });

                  it('displays the new description', function() {
                    expect(find('.lerm-step-6 .relationship-panel:first').text()).to.contain('New description');
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
