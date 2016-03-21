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

describe('Acceptance - Projects | Rules: LERM step 4 - reinstating a phrase', function() {
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

      describe('3 discarded phrases exist for the rule', function() {
        beforeEach(function() {
          server.createList('phrase', 3, { ruleId: this.rule.id, discarded: true });
        });

        describe('I am not logged in', function() {
          describe('I visit the page for step 4 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-4`);
            });

            it('does not show buttons for reinstating the phrases', function() {
              expect(find('.lerm-step-4a .phrase-table .reinstate-btn').length).to.equal(0);
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

            it('does not show buttons for reinstating the phrases', function() {
              expect(find('.lerm-step-4a .phrase-table .reinstate-btn').length).to.equal(0);
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

            it('shows reinstate buttons for each of the phrases', function() {
              expect(find('.lerm-step-4a .phrase-table .reinstate-btn').length).to.equal(3);
            });

            describe('I click the reinstate button for the first phrase', function() {
              beforeEach(function() {
                click('.lerm-step-4a .phrase-table tbody tr:first-of-type .reinstate-btn');
              });

              it('does not mark the first phrase as discarded', function() {
                expect(find('.lerm-step-4a .phrase-table tbody tr:first-of-type').hasClass('discarded')).to.be.false;
              });

              it('shows a button for discarding the first phrase', function() {
                expect(find('.lerm-step-4a .phrase-table tbody tr:first-of-type .discard-btn').length).to.equal(1);
              });
            });
          });
        });
      });
    });
  });
});
