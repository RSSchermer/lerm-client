import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  can: inject.service(),

  model(params) {
    return this.store.findRecord('rule', params['rule_id']);
  },

  afterModel(rule, transition) {
    if (this.get('can').cannot('edit rule', rule)) {
      this.send('unauthorized');
      transition.abort();
    }
  },

  deactivate() {
    this.controller.get('model').rollbackAttributes();
  }
});
