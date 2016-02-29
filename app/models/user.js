import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  username: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  memberships: DS.hasMany('memberships'),

  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName') || ''} ${this.get('lastName') || ''}`.trim();
  })
});
