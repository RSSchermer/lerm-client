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

describe('Acceptance - Projects | Rules: LERM step 2 - deleting a phrase', function() {
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

      describe('2 phrases exist for the rule', function() {
        beforeEach(function() {
          this.phrases = server.createList('phrase', 2, { ruleId: this.rule.id });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 2 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
            });

            it('does not show delete buttons for the phrases', function() {
              expect(find('.lerm-step-2a .phrase-table .delete-btn').length).to.equal(0);
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

            it('does not show delete buttons for the phrases', function() {
              expect(find('.lerm-step-2a .phrase-table .delete-btn').length).to.equal(0);
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

            it('shows delete buttons for both phrases', function() {
              expect(find('.lerm-step-2a .phrase-table .delete-btn').length).to.equal(2);
            });

            describe('I click the delete button for the first phrase', function() {
              beforeEach(function() {
                click('.lerm-step-2a .phrase-table .delete-btn:first');
              });

              it('lists 1 phrase', function() {
                expect(find('.lerm-step-2a .phrase-table tbody tr').length).to.equal(1);
              });

              it('does not list the removed phrase', function() {
                expect(find('.lerm-step-2a .phrase-table tbody').text()).to.not.contain(this.phrases[0].originalText);
              });

              it('lists the phrase that was not removed', function() {
                expect(find('.lerm-step-2a .phrase-table tbody').text()).to.contain(this.phrases[1].originalText);
              });
            });
          });
        });
      });
    });
  });
});
