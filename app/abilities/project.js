import Ember from 'ember';
import { Ability } from 'ember-can';

const { inject, computed } = Ember;

export default Ability.extend({
  session: inject.service(),

  canList: true,

  canCreate: computed('session.isAuthenticated', function() {
    return this.get('session.isAuthenticated');
  }),

  canView: true,

  canEdit: computed('model', 'session.currentUser.memberships.[]', function() {
    let memberships = this.get('session.currentUser.memberships');

    if (memberships) {
      return memberships.any((membership) =>  membership.get('project.id') === this.get('model.id'));
    } else {
      return false;
    }
  }),

  canDestroy: false,

  canClone: computed('canCreate', 'canView', function() {
    return this.get('canCreate') && this.get('canView');
  })
});
