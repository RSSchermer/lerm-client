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

describe('Acceptance - Projects | Rules: LERM step 2 - listing phrases', function() {
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

      describe('no phrases exist for the rule', function() {
        describe('I visit the page for step 2 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
          });

          it('displays a message saying no phrases have been identified yet', function() {
            expect(find('.phrase-table-section').text()).to.contain('No phrases have been identified yet');
          });
        });
      });

      describe('2 phrases exist for the rule, one that matches and one that does not match', function() {
        beforeEach(function() {
          server.create('phrase', {
            text: 'proactive',
            ruleId: this.rule.id
          });
          server.create('phrase', {
            text: 'no match',
            ruleId: this.rule.id
          });
        });

        describe('I visit the page for step 2 of the LERM for the rule', function() {
          beforeEach(function() {
            visit(`/projects/${this.project.id}/rules/${this.rule.id}/lerm/step-2`);
          });

          it('lists 2 phrases', function() {
            expect(find('.phrase-table tbody tr').length).to.equal(2);
          });

          it('displays the matching phrase as valid', function() {
            expect(find('.phrase-column:contains("proactive")').hasClass('valid-phrase')).to.be.true;
          });

          it('displays the non-matching phrase as invalid', function() {
            expect(find('.phrase-column:contains("no match")').hasClass('invalid-phrase')).to.be.true;
          });
        });
      });
    });
  });
});
