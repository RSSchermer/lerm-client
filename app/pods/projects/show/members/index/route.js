import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    let project = this.modelFor('projects.show');

    project.hasMany('memberships').load({ include: 'user' });

    return {
      project,
      memberships: project.get('memberships')
    };
  }
});
