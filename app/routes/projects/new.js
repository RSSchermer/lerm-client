import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('project');
  },

  deactivate() {
    this.controller.get('model').rollbackAttributes();
  }
});
