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

describeModel('phrase', 'Unit - Models: phrase', {
  needs: ['model:rule', 'model:project', 'model:membership']
}, function() {
  beforeEach(function() {
    setupFactoryGuy(this.container);
  });

  beforeEach(function() {
    this.rule = FactoryGuy.make('rule', { proactiveForm: 'Some proactive form' });
    this.subject().set('rule', this.rule);
  });

  describe('textMatchesProactiveForm', function() {
    context('phrase text does not match proactive form', function() {
      beforeEach(function() {
        this.subject().set('originalText', 'no match');
      });

      it('returns false', function() {
        expect(this.subject().get('textMatchesProactiveForm')).to.be.false;
      });
    });

    context('with a single word phrase that occurs in the proactive form in a different case', function() {
      beforeEach(function() {
        this.subject().set('originalText', 'Proactive');
      });

      it('returns false', function() {
        expect(this.subject().get('textMatchesProactiveForm')).to.be.false;
      });
    });

    context('with a single word phrase that occurs in the proactive form with matching different case', function() {
      beforeEach(function() {
        this.subject().set('originalText', 'proactive');
      });

      it('returns true', function() {
        expect(this.subject().get('textMatchesProactiveForm')).to.be.true;
      });
    });

    context('with a multiple word phrase that occurs in the proactive form', function() {
      beforeEach(function() {
        this.subject().set('originalText', 'proactive form');
      });

      it('returns true', function() {
        expect(this.subject().get('textMatchesProactiveForm')).to.be.true;
      });
    });
  });
});
