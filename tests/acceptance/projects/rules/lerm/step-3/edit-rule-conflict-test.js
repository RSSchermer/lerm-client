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

describe('Acceptance - Projects | Rules: LERM step 3 - editing a conflict', function() {
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

      describe('a conflict exists for the rule', function() {
        beforeEach(function() {
          server.create('rule-conflict', {
            ruleOneId: this.rule.id,
            ruleTwoId: server.create('rule', { projectId: this.project.id }).id,
            description: 'Some description',
            projectId: this.project.id
          });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 3 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-3`);
            });

            it('does not show a button for editing the conflict', function() {
              expect(find('.lerm-step-3 .conflict-panel .edit-btn').length).to.equal(0);
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

            it('does not show a button for editing the conflict', function() {
              expect(find('.lerm-step-3 .conflict-panel .edit-btn').length).to.equal(0);
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

            it('shows a button for editing the conflict', function() {
              expect(find('.lerm-step-3 .conflict-panel .edit-btn').length).to.equal(1);
            });

            describe('I click the button to edit conflict', function() {
              beforeEach(function() {
                click('.lerm-step-3 .conflict-panel .edit-btn');
              });

              it('displays a form for editing the conflict\'s description', function() {
                expect(find('.lerm-step-3 .conflict-list .conflict-form').length).to.equal(1);
              });

              describe('I fill in a new description', function() {
                beforeEach(function() {
                  fillIn('.lerm-step-3 .conflict-list .conflict-form .description-field', 'New description');
                });

                describe('I click the cancel button', function() {
                  beforeEach(function() {
                    click('.lerm-step-3 .conflict-list .conflict-form .cancel-btn');
                  });

                  it('displays the old conflict description', function() {
                    expect(find('.lerm-step-3 .conflict-list').text()).to.contain('Some description');
                  });
                });

                describe('I click the save button', function() {
                  beforeEach(function() {
                    click('.lerm-step-3 .conflict-list .conflict-form .save-btn');
                  });

                  it('does not display the conflict edit form', function() {
                    expect(find('.lerm-step-3 .conflict-list .conflict-form').length).to.equal(0);
                  });

                  it('displays 1 conflict in the conflict list', function() {
                    expect(find('.lerm-step-3 .conflict-list li').length).to.equal(1);
                  });

                  it('displays the new description', function() {
                    expect(find('.lerm-step-3 .conflict-list').text()).to.contain('New description');
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
