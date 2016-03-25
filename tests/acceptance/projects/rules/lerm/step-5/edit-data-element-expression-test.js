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

describe('Acceptance - Projects | Rules: LERM step 5 - editing the data element expression of a phrase', function() {
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

      describe('3 phrases exist for the rule', function() {
        beforeEach(function() {
          server.createList('phrase', 3, {
            ruleId: this.rule.id,
            dataElementExpression: 'Some data element expression'
          });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 5 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-5`);
            });

            it('does not display buttons for editing the data element expressions', function() {
              expect(find('.lerm-step-5b .data-element-expression-section .edit-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is not a project member', function() {
          beforeEach(function() {
            logIn();
          });

          describe('I visit the page for step 5 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-5`);
            });

            it('does not display buttons for editing the data element expressions', function() {
              expect(find('.lerm-step-5b .data-element-expression-section .edit-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is a project member', function() {
          beforeEach(function() {
            this.currentUser = server.create('user');
            server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
            logIn(this.currentUser);
          });

          describe('I visit the page for step 5 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-5`);
            });

            it('displays buttons for editing the data element expressions of each phrase', function() {
              expect(find('.lerm-step-5b .data-element-expression-section .edit-btn').length).to.equal(3);
            });

            describe('I click the edit button for the first phrase', function() {
              beforeEach(function() {
                click('.lerm-step-5b .data-element-expression-section:first .edit-btn');
              });

              it('displays a form for editing the data element expression', function() {
                expect(find('.lerm-step-5b .phrase-panel:first .data-element-expression-form').length).to.equal(1);
              });

              describe('I fill in a new data element expression', function() {
                beforeEach(function() {
                  fillIn('.lerm-step-5b .data-element-expression-form:first .data-element-expression-field', 'New data element expression');
                });

                describe('I click the cancel button', function() {
                  beforeEach(function() {
                    click('.lerm-step-5b .data-element-expression-form:first .cancel-btn');
                  });

                  it('does not display a form for editing the data element expression', function() {
                    expect(find('.lerm-step-5b .phrase-panel:first .data-element-expression-form').length).to.equal(0);
                  });

                  it('displays the old data element expression for the first phrase', function() {
                    expect(find('.lerm-step-5b .phrase-panel:first .data-element-expression-section').text()).to
                      .contain('Some data element expression');
                  });
                });

                describe('I click the save button', function() {
                  beforeEach(function() {
                    click('.lerm-step-5b .data-element-expression-form:first .save-btn');
                  });

                  it('does not display a form for editing the data element expression', function() {
                    expect(find('.lerm-step-5b .phrase-panel:first .data-element-expression-form').length).to.equal(0);
                  });

                  it('displays the new data element expression for the first phrase', function() {
                    expect(find('.lerm-step-5b .phrase-panel:first .data-element-expression-section').text()).to
                      .contain('New data element expression');
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
