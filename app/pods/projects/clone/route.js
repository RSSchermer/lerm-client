import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  can: inject.service(),

  model(params) {
    return this.store.findRecord('project', params['project_id']);
  },

  afterModel(project, transition) {
    if (this.get('can').cannot('clone project', project)) {
      this.send('unauthorized');
      transition.abort();
    }
  },

  deactivate() {
    this.controller.set('name', null);
  }
});
