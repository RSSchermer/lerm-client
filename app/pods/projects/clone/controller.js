import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  ajax: inject.service(),

  session: inject.service(),

  flashMessages: inject.service(),

  project: alias('model'),

  cloneProjectTask: task(function *() {
    try {
      let result = yield this.get('ajax').request(`/api/v1/projects/${this.get('project.id')}/clones`, {
        method: 'POST',
        data: JSON.stringify({
          clone: {
            name: this.get('name')
          }
        }),
        dataType: 'json',
        contentType: 'application/vnd.api+json',
        headers: {
          'Authorization': `Bearer ${this.get('session.session.content.authenticated.access_token')}`
        }
      });

      this.get('flashMessages').success('The project was cloned successfully.');
      this.transitionToRoute('projects.show', result.data.id);
    } catch (error) {
      this.set('errors', error.errors);
    }
  }).drop()
});
