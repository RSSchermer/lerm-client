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

describeModel('statement', 'Unit - Models: statement', {
  needs: ['model:rule', 'model:project']
}, function() {
  beforeEach(function() {
    setupFactoryGuy(this.container);
  });

  beforeEach(function() {
    this.rule = FactoryGuy.make('rule', { proactiveForm: 'Some proactive form' });
    this.subject().set('rule', this.rule);
  });

  describe('condition', function() {
    beforeEach(function() {
      this.subject().set('originalCondition', 'Original condition');
    });

    context('no cleaned condition is specified', function() {
      it('returns the original condition', function() {
        expect(this.subject().get('condition')).to.equal('Original condition');
      });
    });

    context('cleaned condition is specified', function() {
      beforeEach(function() {
        this.subject().set('cleanedCondition', 'Cleaned condition');
      });

      it('returns the cleaned condition', function() {
        expect(this.subject().get('condition')).to.equal('Cleaned condition');
      });
    });
  });

  describe('consequence', function() {
    beforeEach(function() {
      this.subject().set('originalConsequence', 'Original consequence');
    });

    context('no cleaned consequence is specified', function() {
      it('returns the original consequence', function() {
        expect(this.subject().get('consequence')).to.equal('Original consequence');
      });
    });

    context('cleaned consequence is specified', function() {
      beforeEach(function() {
        this.subject().set('cleanedConsequence', 'Cleaned consequence');
      });

      it('returns the cleaned consequence', function() {
        expect(this.subject().get('consequence')).to.equal('Cleaned consequence');
      });
    });
  });
});
