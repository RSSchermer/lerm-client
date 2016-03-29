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
    'model:rule-relationship',
    'model:data-element'
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

  describe('dataElements', function() {
    context('the rule has no phrases', function() {
      it('returns an empty list', function() {
        expect(this.subject.get('dataElements').length).to.be.empty;
      });
    });

    context('the rule has 3 phrases', function() {
      beforeEach(function() {
        this.phrases = FactoryGuy.makeList('phrase', 3, { rule: this.subject });
      });

      context('the phrases have no dataElements', function() {
        it('returns an empty list', function() {
          expect(this.subject.get('dataElements').length).to.be.empty;
        });
      });

      context('the first and second phrases have 1 data element, the third phrase has 2 data elements', function() {
        beforeEach(function() {
          this.dataElements = FactoryGuy.makeList('data-element', 4, { project: this.project });

          this.phrases[0].get('dataElements').addObject(this.dataElements[0]);
          this.phrases[1].get('dataElements').addObject(this.dataElements[1]);
          this.phrases[2].get('dataElements').addObjects([
            this.dataElements[2],
            this.dataElements[3]
          ]);
        });

        it('returns a list with 4 elements', function() {
          expect(this.subject.get('dataElements').length).to.equal(4);
        });

        it('returns a list that includes the first data element', function() {
          expect(this.subject.get('dataElements').contains(this.dataElements[0])).to.be.true;
        });

        it('returns a list that includes the second data element', function() {
          expect(this.subject.get('dataElements').contains(this.dataElements[1])).to.be.true;
        });

        it('returns a list that includes the third data element', function() {
          expect(this.subject.get('dataElements').contains(this.dataElements[2])).to.be.true;
        });

        it('returns a list that includes the fourth data element', function() {
          expect(this.subject.get('dataElements').contains(this.dataElements[3])).to.be.true;
        });
      });

      context('the phrases each have the same data element', function() {
        beforeEach(function() {
          this.dataElement = FactoryGuy.make('data-element', { project: this.project });

          this.phrases[0].get('dataElements').addObject(this.dataElement);
          this.phrases[1].get('dataElements').addObject(this.dataElement);
          this.phrases[2].get('dataElements').addObject(this.dataElement);
        });
        it('returns a list of length 1', function() {
          expect(this.subject.get('dataElements').length).to.equal(1);
        });

        it('returns a list that contains the data element', function() {
          expect(this.subject.get('dataElements').contains(this.dataElement)).to.be.true;
        });
      });
    });
  });
});
