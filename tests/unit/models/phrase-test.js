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
  needs: ['model:rule', 'model:project', 'model:membership', 'model:data-element']
}, function() {
  beforeEach(function() {
    setupFactoryGuy(this.container);
  });

  beforeEach(function() {
    this.rule = FactoryGuy.make('rule', { proactiveForm: 'Some proactive form' });
    this.subject().set('rule', this.rule);
  });

  describe('text', function() {
    beforeEach(function() {
      this.subject().set('originalText', 'Original text');
    });

    context('no cleaned text is specified', function() {
      it('returns the original text', function() {
        expect(this.subject().get('text')).to.equal('Original text');
      });
    });

    context('cleaned text is specified', function() {
      beforeEach(function() {
        this.subject().set('cleanedText', 'Cleaned text');
      });

      it('returns the cleaned text', function() {
        expect(this.subject().get('text')).to.equal('Cleaned text');
      });
    });
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

  describe('defaultDataElementExpression', function() {
    context('no data elements have been linked', function() {
      it('returns null', function() {
        expect(this.subject().get('defaultDataElementExpression')).to.be.null;
      });
    });

    context('one data element has been linked', function() {
      beforeEach(function() {
        let dataElement = FactoryGuy.make('data-element', { label: 'Some data element' });

        this.subject().get('dataElements').addObject(dataElement);
      });

      it('returns the data element label', function() {
        expect(this.subject().get('defaultDataElementExpression')).to.equal('Some data element');
      });
    });

    context('three data elements have been linked', function() {
      beforeEach(function() {
        this.subject().get('dataElements').addObjects([
          FactoryGuy.make('data-element', { label: 'First' }),
          FactoryGuy.make('data-element', { label: 'Second' }),
          FactoryGuy.make('data-element', { label: 'Third' })
        ]);
      });

      it('returns the data element labels joined with OR and wrapped in parentheses', function() {
        expect(this.subject().get('defaultDataElementExpression')).to.equal('(First OR Second OR Third)');
      });
    });
  });
});
