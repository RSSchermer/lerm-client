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

describe('Acceptance - Projects | Rules: LERM step 5 - marking a phrase as crisp', function() {
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

            it('the checkboxes for marking phrase crispness are disabled', function() {
              find('.lerm-step-5a .phrase-table .crispness-checkbox').each(function() {
                expect($(this).prop('disabled')).to.be.true;
              });
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

            it('the checkboxes for marking phrase crispness are enabled', function() {
              find('.lerm-step-5a .phrase-table .crispness-checkbox').each(function() {
                expect($(this).prop('disabled')).to.be.true;
              });
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

            it('the checkboxes for marking phrase crispness are enabled', function() {
              find('.lerm-step-5a .phrase-table .crispness-checkbox').each(function() {
                expect($(this).prop('disabled')).to.be.false;
              });
            });

            describe('I click the checkbox button for the first phrase', function() {
              beforeEach(function() {
                click('.lerm-step-5a .phrase-table tbody tr:first-of-type .crispness-checkbox');
              });

              it('marks the first phrase as crisp', function() {
                expect(find('.lerm-step-5a .phrase-table tbody tr:first-of-type .crispness-checkbox').prop('checked')).to.be.true;
              });
            });
          });
        });
      });
    });
  });
});
