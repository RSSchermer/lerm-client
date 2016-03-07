import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  can: inject.service(),

  model(params) {
    return this.store.findRecord('data-element', params['data_element_id']);
  },

  afterModel(dataElement, transition) {
    if (this.get('can').cannot('edit data-element', dataElement)) {
      this.send('unauthorized');
      transition.abort();
    }
  },

  deactivate() {
    this.controller.get('model').rollbackAttributes();
  }
});
