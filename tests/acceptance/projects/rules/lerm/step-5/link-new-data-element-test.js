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

describe('Acceptance - Projects | Rules: LERM step 5 - creating and linking a new data element to a phrase', function() {
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

        describe('I am not logged in', function() {
          describe('I visit the page for step 5 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-5`);
            });

            it('does not display links that open the modal for creating and linking new data elements', function() {
              expect(find('.lerm-step-5b .create-data-element-link').length).to.equal(0);
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

            it('does not display links that open the modal for creating and linking new data elements', function() {
              expect(find('.lerm-step-5b .create-data-element-link').length).to.equal(0);
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

            it('displays links that open the modal for creating and linking new data elements for each phrase', function() {
              expect(find('.lerm-step-5b .create-data-element-link').length).to.equal(3);
            });

            describe('I click the link for creating and linking a new data element for the first phrase', function() {
              beforeEach(function() {
                click('.lerm-step-5b .phrase-panel:first .create-data-element-link');
              });

              it('displays a modal for creating and linking a new data element', function() {
                expect(find('.ember-modal-dialog').text()).to.contain('Create and link a new data element');
              });

              describe('I fill in the modal form with valid data element data', function() {
                beforeEach(function() {
                  fillIn('.ember-modal-dialog .create-and-link-data-element-form .label-field', 'New data element');
                  fillIn('.ember-modal-dialog .create-and-link-data-element-form .description-field', 'Some description');
                });

                describe('I click the cancel button', function() {
                  beforeEach(function() {
                    click('.ember-modal-dialog .create-and-link-data-element-form .cancel-btn');
                  });

                  it('does not display a modal', function() {
                    expect(find('.ember-modal-dialog').length).to.equal(0);
                  });

                  it('does not list the data element in the list of data elements linked to the phrase', function() {
                    expect(find('.lerm-step-5b .data-element-table:first').text()).to.not.contain('New data element');
                  });
                });

                describe('I click the button to create and link the data element', function() {
                  beforeEach(function() {
                    click('.ember-modal-dialog .create-and-link-data-element-form .save-btn');
                  });

                  it('does not display a modal', function() {
                    expect(find('.ember-modal-dialog').length).to.equal(0);
                  });

                  it('lists the data element in the list of data elements linked to the phrase', function() {
                    expect(find('.lerm-step-5b .data-element-table:first').text()).to.contain('New data element');
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
