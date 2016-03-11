import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.modelFor('projects.show.rules.show');
  },

  setupController(controller, model) {
    controller.setProperties({
      model,
      proactiveForm: model.get('proactiveForm'),
      isEditing: false
    });
  }
});
