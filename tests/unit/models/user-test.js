/* jshint expr:true */
import { expect } from 'chai';
import { describeModel } from 'ember-mocha';
import {
  beforeEach,
  context,
  describe,
  it
} from 'mocha';

describeModel('user', 'Unit - Models: user', {
  needs: ['model:membership']
}, function() {
  describe('fullName', function() {
    context('with neither a first name nor a last name', function() {
      beforeEach(function() {
        this.subject({firstName: null, lastName: null});
      });

      it('returns an empty string', function() {
        expect(this.subject().get('fullName')).to.be.empty;
      });
    });

    context('with only a first name', function() {
      beforeEach(function() {
        this.subject({firstName: 'John', lastName: null});
      });

      it('returns the first name', function() {
        expect(this.subject().get('fullName')).to.equal('John');
      });
    });

    context('with only a last name', function() {
      beforeEach(function() {
        this.subject({firstName: null, lastName: 'Jones'});
      });

      it('returns the first name', function() {
        expect(this.subject().get('fullName')).to.equal('Jones');
      });
    });

    context('with both a first name and a last name', function() {
      beforeEach(function() {
        this.subject({firstName: 'John', lastName: 'Jones'});
      });

      it('returns the first name followed by the last name', function() {
        expect(this.subject().get('fullName')).to.equal('John Jones');
      });
    });
  });
});
