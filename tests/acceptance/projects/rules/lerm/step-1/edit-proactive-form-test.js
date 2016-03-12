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

describe('Acceptance - Projects | Rules: LERM step 1', function() {
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
        describe('I visit the page for step 1 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-1`);
          });

          it('does not show a button for editing the proactive form', function() {
            expect(find('.lerm-step-1 .edit-btn').length).to.equal(0);
          });

          it('disables the proactive form input field', function() {
            expect(find('#proactive_form').prop('disabled')).to.be.true;
          });
        });
      });

      describe('I am logged as a user who is not a project member', function() {
        beforeEach(function() {
          logIn();
        });

        describe('I visit the page for step 1 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-1`);
          });

          it('does not show a button for editing the proactive form', function() {
            expect(find('.lerm-step-1 .edit-btn').length).to.equal(0);
          });

          it('disables the proactive form input field', function() {
            expect(find('#proactive_form').prop('disabled')).to.be.true;
          });
        });
      });

      describe('I am logged as a user who is a project member', function() {
        beforeEach(function() {
          this.currentUser = server.create('user');
          server.create('membership', { userId: this.currentUser.id, projectId: this.project.id });
          logIn(this.currentUser);
        });

        describe('I visit the page for step 1 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-1`);
          });

          it('shows a button for editing the proactive form', function() {
            expect(find('.lerm-step-1 .edit-btn').length).to.equal(1);
          });

          it('disables the proactive form input field', function() {
            expect(find('#proactive_form').prop('disabled')).to.be.true;
          });

          describe('I click the button for editing the proactive form', function() {
            beforeEach(function() {
              click('.lerm-step-1 .edit-btn');
            });

            it('enables the proactive form input field', function() {
              expect(find('#proactive_form').prop('disabled')).to.be.false;
            });

            describe('I fill in a new proactive form', function() {
              beforeEach(function() {
                fillIn('#proactive_form', 'New proactive form');
              });

              describe('I click the cancel button', function() {
                beforeEach(function() {
                  click('.lerm-step-1 .cancel-btn');
                });

                it('disables the proactive form input field', function() {
                  expect(find('#proactive_form').prop('disabled')).to.be.true;
                });

                it('displays the old value in the proactive form input field', function() {
                  expect(find('#proactive_form').val()).to.equal('Some proactive form');
                });
              });

              describe('I click the save button', function() {
                beforeEach(function() {
                  click('.lerm-step-1 .save-btn');
                });

                it('disables the proactive form input field', function() {
                  expect(find('#proactive_form').prop('disabled')).to.be.true;
                });

                it('displays the new value in the proactive form input field', function() {
                  expect(find('#proactive_form').val()).to.equal('New proactive form');
                });
              });
            });
          });
        });
      });
    });
  });
});
