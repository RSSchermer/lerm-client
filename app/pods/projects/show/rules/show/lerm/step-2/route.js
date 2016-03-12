import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    let rule = this.modelFor('projects.show.rules.show');

    return Ember.RSVP.hash({
      rule,
      phrases: rule.get('phrases')
    });
  }
});
