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
import setupfactoryGuy from 'ember-data-factory-guy/utils/manual-setup';
import Ember from 'ember';

describeModule('ability:project', 'Abilities: Project', {
    needs: ['model:project', 'model:user', 'model:membership']
  },
  function () {
    beforeEach(function() {
      setupfactoryGuy(this.container);
    });

    context('I am not logged in', function () {
      beforeEach(function () {
        this.subject().set('session', Ember.Object.create({
          isAuthenticated: false,
          currentUser: null
        }));
      });

      describe('canList', function () {
        it('is true', function () {
          expect(this.subject().get('canList')).to.be.true;
        });
      });

      describe('canCreate', function () {
        it('is false', function () {
          expect(this.subject().get('canCreate')).to.be.false;
        });
      });

      describe('project specific abilities', function () {
        beforeEach(function () {
          this.project = FactoryGuy.make('project');
          this.subject().set('model', this.project);
        });

        describe('canView', function () {
          it('is true', function () {
            expect(this.subject().get('canView')).to.be.true;
          });
        });

        describe('canEdit', function () {
          it('is true', function () {
            expect(this.subject().get('canEdit')).to.be.false;
          });
        });

        describe('canDestroy', function () {
          it('is false', function () {
            expect(this.subject().get('canDestroy')).to.be.false;
          });
        });
      });
    });

    context('I am logged in', function () {
      beforeEach(function () {
        this.currentUser = FactoryGuy.make('user');
        this.subject().set('session', Ember.Object.create({
          isAuthenticated: true,
          currentUser: this.currentUser
        }));
      });

      describe('canList', function () {
        it('is true', function () {
          expect(this.subject().get('canList')).to.be.true;
        });
      });

      describe('canCreate', function () {
        it('is true', function () {
          expect(this.subject().get('canCreate')).to.be.true;
        });
      });

      describe('project specific abilities', function () {
        beforeEach(function () {
          this.project = FactoryGuy.make('project');
          this.subject().set('model', this.project);
        });

        context('I am not a project member', function () {
          describe('canView', function () {
            it('is true', function () {
              expect(this.subject().get('canView')).to.be.true;
            });
          });

          describe('canEdit', function () {
            it('is true', function () {
              expect(this.subject().get('canEdit')).to.be.false;
            });
          });

          describe('canDestroy', function () {
            it('is false', function () {
              expect(this.subject().get('canDestroy')).to.be.false;
            });
          });
        });

        context('I am a project member', function () {
          beforeEach(function () {
            FactoryGuy.make('membership', {user: this.currentUser, project: this.project});
          });

          describe('canView', function () {
            it('is true', function () {
              expect(this.subject().get('canView')).to.be.true;
            });
          });

          describe('canEdit', function () {
            it('is true', function () {
              expect(this.subject().get('canEdit')).to.be.true;
            });
          });

          describe('canDestroy', function () {
            it('is false', function () {
              expect(this.subject().get('canDestroy')).to.be.false;
            });
          });
        });
      });
    });
  }
);
