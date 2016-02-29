import Ember from 'ember';
import DS from 'ember-data';

const { Model, attr, hasMany } = DS;
const { computed } = Ember;

export default Model.extend({
  email: attr('string'),
  username: attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),

  memberships: hasMany('memberships'),

  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName') || ''} ${this.get('lastName') || ''}`.trim();
  })
});
