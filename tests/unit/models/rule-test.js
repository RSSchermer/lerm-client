/* jshint expr:true */
import { expect } from 'chai';
import { describeModel } from 'ember-mocha';
import {
  beforeEach,
  context,
  describe,
  it
} from 'mocha';
import FactoryGuy from 'ember-data-factory-guy';
import setupFactoryGuy from 'ember-data-factory-guy/utils/manual-setup';

describeModel('rule', 'Unit - Models: rule', {
  needs: [
    'model:project',
    'model:phrase',
    'model:statement',
    'model:rule-conflict',
    'model:rule-relationship'
  ]
}, function() {
  beforeEach(function() {
    setupFactoryGuy(this.container);
  });

  beforeEach(function() {
    this.project = FactoryGuy.make('project');
    this.subject = FactoryGuy.make('rule', { project: this.project });
  });

  describe('conflicts', function() {
    context('2 rule conflicts exist for the project, neither of which involve the rule', function() {
      beforeEach(function() {
        FactoryGuy.makeList('rule-conflict', 2, { project: this.project });
      });

      it('returns an empty list', function() {
        expect(this.subject.get('conflicts')).to.be.empty;
      });
    });

    context('3 rule conflicts exist for the project, 1 not involving the rule, 1 involving the rule as ruleOne, 1 involving the rule as ruleTwo', function() {
      beforeEach(function() {
        FactoryGuy.make('rule-conflict', { project: this.project });
        this.conflictA = FactoryGuy.make('rule-conflict', { project: this.project, ruleOne: this.subject });
        this.conflictB = FactoryGuy.make('rule-conflict', { project: this.project, ruleTwo: this.subject });
      });

      it('returns 2 conflicts', function() {
        expect(this.subject.get('conflicts').length).to.equal(2);
      });

      it('returns a list including the conflict that involves the rule as ruleOne', function() {
        expect(this.subject.get('conflicts')).to.contain(this.conflictA);
      });

      it('returns a list including the conflict that involves the rule as ruleTwo', function() {
        expect(this.subject.get('conflicts')).to.contain(this.conflictB);
      });
    });
  });

  describe('relationships', function() {
    context('2 rule relationships exist for the project, neither of which involve the rule', function() {
      beforeEach(function() {
        FactoryGuy.makeList('rule-relationship', 2, { project: this.project });
      });

      it('returns an empty list', function() {
        expect(this.subject.get('relationships')).to.be.empty;
      });
    });

    context('3 rule relationships exist for the project, 1 not involving the rule, 1 involving the rule as ruleOne, 1 involving the rule as ruleTwo', function() {
      beforeEach(function() {
        FactoryGuy.make('rule-relationship', { project: this.project });
        this.relationshipA = FactoryGuy.make('rule-relationship', { project: this.project, ruleOne: this.subject });
        this.relationshipB = FactoryGuy.make('rule-relationship', { project: this.project, ruleTwo: this.subject });
      });

      it('returns 2 relationships', function() {
        expect(this.subject.get('relationships').length).to.equal(2);
      });

      it('returns a list including the relationship that involves the rule as ruleOne', function() {
        expect(this.subject.get('relationships')).to.contain(this.relationshipA);
      });

      it('returns a list including the relationship that involves the rule as ruleTwo', function() {
        expect(this.subject.get('relationships')).to.contain(this.relationshipB);
      });
    });
  });
});
