import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  can: inject.service(),

  model() {
    return this.store.createRecord('rule', { project: this.modelFor('projects.show') });
  },

  afterModel(rule, transition) {
    if (this.get('can').cannot('edit project', rule.get('project'))) {
      this.send('unauthorized');
      transition.abort();
    }
  },

  deactivate() {
    this.controller.get('model').rollbackAttributes();
  }
});
