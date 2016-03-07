/* jshint expr:true */
import { expect } from 'chai';
import { describeModule } from 'ember-mocha';
import {
  beforeEach,
  context,
  describe,
  it
} from 'mocha';
import FactoryGuy from 'ember-data-factory-guy';
import setupFactoryGuy from 'ember-data-factory-guy/utils/manual-setup';
import sinon from 'sinon';

describeModule('ability:data-element', 'Unit - Abilities: Data element', {
  needs: ['model:data-element', 'model:project']
}, function() {
  beforeEach(function() {
    setupFactoryGuy(this.container);
  });

  beforeEach(function() {
    this.dataElement = FactoryGuy.make('data-element');
    this.subject().set('model', this.dataElement);
    this.canServiceStub = { can: () => false };
    this.subject().set('can', this.canServiceStub);
  });

  describe('canView', function() {
    context('the project the data element belongs cannot be viewed', function() {
      it('is false', function() {
        expect(this.subject().get('canView')).to.be.false;
      });
    });

    context('the project the data element belongs to can be viewed', function() {
      beforeEach(function() {
        sinon.stub(this.canServiceStub, 'can').withArgs('view project', this.dataElement.get('project')).returns(true);
      });

      it('is true', function() {
        expect(this.subject().get('canView')).to.be.true;
      });
    });
  });

  describe('canEdit', function() {
    context('the project the data element belongs cannot be edited', function() {
      it('is false', function() {
        expect(this.subject().get('canEdit')).to.be.false;
      });
    });

    context('the project the data element belongs to can be edited', function() {
      beforeEach(function() {
        sinon.stub(this.canServiceStub, 'can').withArgs('edit project', this.dataElement.get('project')).returns(true);
      });

      it('is true', function() {
        expect(this.subject().get('canEdit')).to.be.true;
      });
    });
  });

  describe('canDestroy', function() {
    context('the project the data element belongs cannot be edited', function() {
      it('is false', function() {
        expect(this.subject().get('canDestroy')).to.be.false;
      });
    });

    context('the project the data element belongs to can be edited', function() {
      beforeEach(function() {
        sinon.stub(this.canServiceStub, 'can').withArgs('edit project', this.dataElement.get('project')).returns(true);
      });

      it('is true', function() {
        expect(this.subject().get('canDestroy')).to.be.true;
      });
    });
  });
});
