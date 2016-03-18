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

describe('Acceptance - Projects | Rules: LERM step 4 - editing cleaned phrase text', function() {
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
          describe('I visit the page for step 4 of the LERM for the rule', function() {
            beforeEach(function() {
              visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-4`);
            });

            it('does not show buttons for editing the cleaned phrase texts', function() {
              expect(find('.lerm-step-4a .phrase-table .edit-btn').length).to.equal(0);
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

            it('does not show buttons for editing the cleaned phrase texts', function() {
              expect(find('.lerm-step-4a .phrase-table .edit-btn').length).to.equal(0);
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

            it('shows button for editing each of the cleaned phrase texts', function() {
              expect(find('.lerm-step-4a .phrase-table .edit-btn').length).to.equal(3);
            });

            describe('I click the edit button for the first phrase', function() {
              beforeEach(function() {
                click('.lerm-step-4a .phrase-table tbody tr:first-of-type .edit-btn');
              });

              it('shows a form for editing the cleaned phrase text', function() {
                expect(find('.lerm-step-4a .phrase-table tbody tr:first-of-type .cleaned-phrase-form').length).to.equal(1);
              });

              describe('I fill in a new cleaned phrase text', function() {
                beforeEach(function() {
                  fillIn('.lerm-step-4a .phrase-table .cleaned-text-field', 'New cleaned text');
                });

                describe('I click the save button', function() {
                  beforeEach(function() {
                    click('.lerm-step-4a .phrase-table .cleaned-phrase-form .save-btn');
                  });

                  it('does not displays an form for editing the cleaned phrase text', function() {
                    expect(find('.lerm-step-4a .phrase-table tbody tr:first-of-type .cleaned-phrase-form').length).to.equal(0);
                  });

                  it('displays the updated cleaned phrase text', function() {
                    expect(find('.lerm-step-4a .phrase-table tbody tr:first-of-type').text()).to.contain('New cleaned text');
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
