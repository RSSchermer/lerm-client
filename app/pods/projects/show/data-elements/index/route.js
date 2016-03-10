import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    let project = this.modelFor('projects.show');

    return {
      project,
      dataElements: project.get('dataElements')
    };
  }
});
