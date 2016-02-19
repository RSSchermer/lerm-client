import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr(),
  username: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),

  memberships: DS.hasMany('memberships'),

  fullName: function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }.property('firstName', 'lastName')
});
