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

describe('Acceptance - Projects | Rules: LERM step 6 - adding a relationship', function() {
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
          this.relatedRule = server.create('rule', {
            label: 'Some Other Rule',
            projectId: this.project.id
          });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 6 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-6`);
            });

            it('does not show a button for adding a relationship', function() {
              expect(find('.lerm-step-6 .add-relationship-btn').length).to.equal(0);
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

            it('does not show a button for adding a relationship', function() {
              expect(find('.lerm-step-6 .add-relationship-btn').length).to.equal(0);
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

            it('shows a button for adding a relationship', function() {
              expect(find('.lerm-step-6 .add-relationship-btn').length).to.equal(1);
            });

            describe('I click the button to add a relationship', function() {
              beforeEach(function() {
                click('.lerm-step-6 .add-relationship-btn');
              });

              it('adds an empty form to the relationship list', function() {
                expect(find('.lerm-step-6 .relationship-list .relationship-form').length).to.equal(1);
              });

              describe('I fill in valid data', function() {
                beforeEach(function() {
                  selectChoose('.lerm-step-6 .relationship-list .relationship-form .related-rule-field', 'Some Other Rule');
                  fillIn('.lerm-step-6 .relationship-list .relationship-form .description-field', 'Some description');
                });

                describe('I click the cancel button', function() {
                  beforeEach(function() {
                    click('.lerm-step-6 .relationship-list .relationship-form .cancel-btn');
                  });

                  it('displays an empty relationship list', function() {
                    expect(find('.lerm-step-6 .relationship-list-section').text()).to
                      .contain('No relationships have been identified yet for this rule');
                  });
                });

                describe('I click the save button', function() {
                  beforeEach(function() {
                    click('.lerm-step-6 .relationship-list .relationship-form .save-btn');
                  });

                  it('does not display the relationship edit form', function() {
                    expect(find('.lerm-step-6 .relationship-list .relationship-form').length).to.equal(0);
                  });

                  it('displays 1 relationship in the relationship list', function() {
                    expect(find('.lerm-step-6 .relationship-list li').length).to.equal(1);
                  });

                  it('displays the correct rule label', function() {
                    expect(find('.lerm-step-6 .relationship-list').text()).to.contain('Some Other Rule');
                  });

                  it('displays the correct description', function() {
                    expect(find('.lerm-step-6 .relationship-list').text()).to.contain('Some description');
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
