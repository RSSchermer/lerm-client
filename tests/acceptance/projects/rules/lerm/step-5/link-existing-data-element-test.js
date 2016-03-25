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

describe('Acceptance - Projects | Rules: LERM step 5 - linking a data element to a phrase', function() {
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
          server.createList('phrase', 3, { ruleId: this.rule.id });
        });

        describe('A data element exists for the project', function() {
          beforeEach(function() {
            server.create('data-element', {
              label: 'Some Data Element',
              projectId: this.project.id
            });
          });

          describe('I am not logged in', function() {
            describe('I visit the page for step 5 of the LERM for the rule', function() {
              beforeEach(function() {
                visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-5`);
              });

              it('does not display forms for linking existing data elements to the phrases', function() {
                expect(find('.lerm-step-5b .data-element-linking-form').length).to.equal(0);
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

              it('does not display forms for linking existing data elements to the phrases', function() {
                expect(find('.lerm-step-5b .data-element-linking-form').length).to.equal(0);
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

              it('displays forms for linking existing data elements to the phrases for each phrase', function() {
                expect(find('.lerm-step-5b .data-element-linking-form').length).to.equal(3);
              });

              describe('I select the data element for the first phrase', function() {
                beforeEach(function() {
                  selectChoose('.lerm-step-5b .data-element-linking-form:first .data-element-field', 'Some Data Element');
                });

                describe('I click the button to link the data element', function() {
                  beforeEach(function() {
                    click('.lerm-step-5b .data-element-linking-form:first .link-data-element-btn');
                  });

                  it('lists the data element in the list of data elements linked to the phrase', function() {
                    expect(find('.lerm-step-5b .data-element-table:first').text()).to.contain('Some Data Element');
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
