import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service(),

  canList: true,

  canCreate: function () {
    return this.get('session.isAuthenticated');
  }.property('session.isAuthenticated'),

  canView: true,

  canEdit: function () {
    const memberships = this.get('session.currentUser.memberships');

    if (memberships) {
      return memberships.any((membership) =>  membership.get('project.id') === this.get('model.id'));
    } else {
      return false;
    }
  }.property('model', 'session.currentUser.memberships.[]'),

  canDestroy: false
});
