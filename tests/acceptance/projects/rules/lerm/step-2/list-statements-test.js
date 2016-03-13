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

describe('Acceptance - Projects | Rules: LERM step 2 - listing statements', function() {
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

      describe('no statements exist for the rule', function() {
        describe('I visit the page for step 2 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
          });

          it('displays a message saying no statements exist yet', function() {
            expect(find('.lerm-step-2b .statement-list-section').text()).to
              .contain('No statements have been added yet for this rule');
          });
        });
      });

      describe('3 statements exist for the rule', function() {
        beforeEach(function() {
          server.createList('statement', 3, { ruleId: this.rule.id });
        });

        describe('I visit the page for step 2 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
          });

          it('lists 3 statements', function() {
            expect(find('.lerm-step-2b .statement-list li').length).to.equal(3);
          });
        });
      });
    });
  });
});
