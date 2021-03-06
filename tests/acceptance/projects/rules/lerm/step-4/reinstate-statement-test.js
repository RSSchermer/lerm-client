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

describe('Acceptance - Projects | Rules: LERM step 4 - reinstating a statement', function() {
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

      describe('3 statements exist for the rule', function() {
        beforeEach(function() {
          server.createList('statement', 3, {
            ruleId: this.rule.id,
            discarded: true
          });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 4 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-4`);
            });

            it('does not show buttons for reinstating the statements', function() {
              expect(find('.lerm-step-4b .statement-panel .reinstate-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is not a project member', function() {
          beforeEach(function() {
            logIn();
          });

          describe('I visit the page for step 4 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-4`);
            });

            it('does not show buttons for reinstating the statements', function() {
              expect(find('.lerm-step-4b .statement-panel .reinstate-btn').length).to.equal(0);
            });
          });
        });

        describe('I am logged as a user who is a project member', function() {
          beforeEach(function() {
            this.currentUser = server.create('user');
            server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
            logIn(this.currentUser);
          });

          describe('I visit the page for step 4 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-4`);
            });

            it('shows reinstate buttons for each of the statements', function() {
              expect(find('.lerm-step-4b .statement-panel .reinstate-btn').length).to.equal(3);
            });

            describe('I click the reinstate button for the first statement', function() {
              beforeEach(function() {
                click('.lerm-step-4b .statement-panel:first .reinstate-btn');
              });

              it('does not mark the first statement as discarded', function() {
                expect(find('.lerm-step-4b .statement-panel:first').hasClass('discarded')).to.be.false;
              });

              it('shows a button for discarding the first statement', function() {
                expect(find('.lerm-step-4b .statement-panel:first .discard-btn').length).to.equal(1);
              });
            });
          });
        });
      });
    });
  });
});
