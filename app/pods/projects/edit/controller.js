import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  flashMessages: inject.service(),

  project: alias('model'),

  saveProjectTask: task(function *() {
    try {
      let project = yield this.get('project').save();

      this.get('flashMessages').success('The project was updated successfully.');
      this.transitionToRoute('projects.show', project.id);
    } catch (error) {
      this.send('error', error);
    }
  }).drop()
});
