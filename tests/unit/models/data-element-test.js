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

describeModel('data-element', 'Unit - Models: data element', {
  needs: [
    'model:project',
    'model:rule',
    'model:phrase'
  ]
}, function() {
  beforeEach(function() {
    setupFactoryGuy(this.container);
  });

  beforeEach(function() {
    this.project = FactoryGuy.make('project');
    this.subject = FactoryGuy.make('data-element', { project: this.project });
  });

  describe('rules', function() {
    context('the data element has no phrases', function() {
      it('returns an empty list', function() {
        expect(this.subject.get('rules').length).to.be.empty;
      });
    });

    context('the data element has 3 phrases that each belongs to a different rule', function() {
      beforeEach(function() {
        this.rules = FactoryGuy.makeList('rule', 3, { project: this.project });

        this.subject.get('phrases').addObjects([
          FactoryGuy.make('phrase', { rule: this.rules[0] }),
          FactoryGuy.make('phrase', { rule: this.rules[1] }),
          FactoryGuy.make('phrase', { rule: this.rules[2] })
        ]);
      });

      it('returns a list with 3 elements', function() {
        expect(this.subject.get('rules').length).to.equal(3);
      });

      it('returns a list that includes the first rule', function() {
        expect(this.subject.get('rules').map((r) => r.get('id')).contains(this.rules[0].get('id'))).to.be.true;
      });

      it('returns a list that includes the second rule', function() {
        expect(this.subject.get('rules').map((r) => r.get('id')).contains(this.rules[1].get('id'))).to.be.true;
      });

      it('returns a list that includes the third rule', function() {
        expect(this.subject.get('rules').map((r) => r.get('id')).contains(this.rules[2].get('id'))).to.be.true;
      });
    });

    context('the data element has 3 phrases that each belongs to the same rule', function() {
      beforeEach(function() {
        this.rule = FactoryGuy.make('rule', { project: this.project });

        this.subject.get('phrases').addObjects(FactoryGuy.makeList('phrase', 3, { rule: this.rule }));
      });

      it('returns a list with 1 element', function() {
        expect(this.subject.get('rules').length).to.equal(1);
      });

      it('returns a list that includes the rule', function() {
        expect(this.subject.get('rules').map((r) => r.get('id')).contains(this.rule.get('id'))).to.be.true;
      });
    });
  });
});
