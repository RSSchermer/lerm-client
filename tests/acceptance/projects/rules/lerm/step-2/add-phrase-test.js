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

describe('Acceptance - Projects | Rules: LERM step 2 - adding a phrase', function() {
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

      describe('I am not logged in', function() {
        describe('I visit the page for step 2 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
          });

          it('does not show a form for adding a phrase', function() {
            expect(find('.lerm-step-2a .add-phrase-form').length).to.equal(0);
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

          it('does not show a form for adding a phrase', function() {
            expect(find('.lerm-step-2a .add-phrase-form').length).to.equal(0);
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

          it('shows a form for adding a phrase', function() {
            expect(find('.lerm-step-2a .add-phrase-form').length).to.equal(1);
          });

          describe('I click the button to add a phrase while leaving the phrase text empty', function() {
            beforeEach(function() {
              click('.lerm-step-2a .add-phrase-form .add-phrase-btn');
            });

            it('does not add a phrase to the phrase list', function() {
              expect(find('.lerm-step-2a .phrase-table-section').text()).to
                .contain('No phrases have been identified yet');
            });
          });

          describe('I fill in a phrase', function() {
            beforeEach(function() {
              fillIn('#new_phrase_text', 'proactive');
            });

            describe('I click the button to add a phrase', function() {
              beforeEach(function() {
                click('.lerm-step-2a .add-phrase-form .add-phrase-btn');
              });

              it('displays the phrase in the phrase list', function() {
                expect(find('.lerm-step-2a .phrase-table tbody tr:first').text()).to.contain('proactive');
              });
            });
          });
        });
      });
    });
  });
});
