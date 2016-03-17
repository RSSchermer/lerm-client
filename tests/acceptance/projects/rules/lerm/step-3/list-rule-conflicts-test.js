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

describe('Acceptance - Projects | Rules: LERM step 3 - listing statements', function() {
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

      describe('no rule conflicts exist for the project that concern the rule', function() {
        describe('I visit the page for step 3 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-3`);
          });

          it('displays a message saying no rule conflicts exist yet for the rule', function() {
            expect(find('.lerm-step-3 .conflict-list-section').text()).to
              .contain('No conflicts have been identified yet for this rule');
          });
        });
      });

      describe('5 rule conflicts exist for the project of which 3 concern the rule', function() {
        beforeEach(function() {
          let otherRules = server.createList('rule', 2, { projectId: this.project.id });
          server.createList('rule-conflict', 2, {
            projectId: this.project.id,
            ruleOneId: otherRules[0].id,
            ruleTwoId: otherRules[1].id
          });
          server.createList('rule-conflict', 2, {
            projectId: this.project.id,
            ruleOneId: this.rule.id,
            ruleTwoId: otherRules[1].id
          });
          server.create('rule-conflict', {
            projectId: this.project.id,
            ruleOneId: otherRules[0].id,
            ruleTwoId: this.rule.id
          });
        });

        describe('I visit the page for step 3 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-3`);
          });

          it('lists 3 rule conflicts', function() {
            expect(find('.lerm-step-3 .conflict-list li').length).to.equal(3);
          });
        });
      });
    });
  });
});
