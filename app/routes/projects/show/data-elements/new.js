import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  can: inject.service(),

  model() {
    return this.store.createRecord('data-element', { project: this.modelFor('projects.show') });
  },

  afterModel(dataElement, transition) {
    if (this.get('can').cannot('edit project', dataElement.get('project'))) {
      this.send('unauthorized');
      transition.abort();
    }
  },

  deactivate() {
    this.controller.get('model').rollbackAttributes();
  }
});
