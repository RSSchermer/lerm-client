import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject, run, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  flashMessages: inject.service(),

  session: inject.service(),

  project: alias('model'),

  createProjectTask: task(function *() {
    try {
      let project = yield this.get('project').save();

      run(() => {
        this.get('session.currentUser.memberships').reload();
      });

      this.get('flashMessages').success('The project was created successfully.');
      this.transitionToRoute('projects.show', project.id);
    } catch (error) {
      this.set('error', error);
    }
  }).drop()
});
