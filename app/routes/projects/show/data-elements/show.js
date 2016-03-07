import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return this.store.findRecord('data-element', params['data_element_id']);
  }
});
