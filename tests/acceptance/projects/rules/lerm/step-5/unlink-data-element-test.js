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

describe('Acceptance - Projects | Rules: LERM step 5 - unlinking a data element from a phrase', function() {
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

      describe('a phrases exists for the rule', function() {
        beforeEach(function() {
          this.phrase = server.create('phrase', { ruleId: this.rule.id });
        });

        describe('3 data elements are linked to the phrase', function() {
          beforeEach(function() {
            this.dataElements = server.createList('data-element', 3, {
              projectId: this.project.id
            });

            this.phrase.dataElements = this.dataElements;
          });

          describe('I am not logged in', function() {
            describe('I visit the page for step 5 of the LERM for the rule', function() {
              beforeEach(function() {
                visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-5`);
              });

              it('does not display buttons for unlinking data elements from the phrase', function() {
                expect(find('.lerm-step-5b .data-element-table:first .unlink-data-element-btn').length).to.equal(0);
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

              it('does not display buttons for unlinking data elements from the phrase', function() {
                expect(find('.lerm-step-5b .data-element-table:first .unlink-data-element-btn').length).to.equal(0);
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

              it('displays buttons for unlinking data elements from the phrase for each data element', function() {
                expect(find('.lerm-step-5b .data-element-table:first .unlink-data-element-btn').length).to.equal(3);
              });

              describe('I click the unlink button for the first data element', function() {
                beforeEach(function() {
                  click('.lerm-step-5b .data-element-table:first .unlink-data-element-btn:first');
                });

                it('lists 2 data elements linked to the phrase', function() {
                  expect(find('.lerm-step-5b .data-element-table:first tbody tr').length).to.equal(2);
                });

                it('does not list the first data element', function() {
                  expect(find('.lerm-step-5b .data-element-table:first tbody').text()).to.not.contain(this.dataElements[0].label);
                });
              });
            });
          });
        });
      });
    });
  });
});
