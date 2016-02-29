import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service(),

  canList: true,

  canCreate: Ember.computed('session.isAuthenticated', function() {
    return this.get('session.isAuthenticated');
  }),

  canView: true,

  canEdit: Ember.computed('model', 'session.currentUser.memberships.[]', function() {
    const memberships = this.get('session.currentUser.memberships');

    if (memberships) {
      return memberships.any((membership) =>  membership.get('project.id') === this.get('model.id'));
    } else {
      return false;
    }
  }),

  canDestroy: false
});
