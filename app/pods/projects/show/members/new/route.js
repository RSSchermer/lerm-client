import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  can: inject.service(),

  model() {
    let project = this.modelFor('projects.show');

    project.hasMany('memberships').load({ include: 'user' });

    return project;
  },

  afterModel(project, transition) {
    if (this.get('can').cannot('edit project', project)) {
      this.send('unauthorized');
      transition.abort();
    }
  }
});
