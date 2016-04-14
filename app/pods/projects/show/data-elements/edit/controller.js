import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, inject, computed } = Ember;
const { alias } = computed;

export default Controller.extend({
  flashMessages: inject.service(),

  dataElement: alias('model'),

  saveDataElementTask: task(function *() {
    let dataElement = yield this.get('dataElement').save();

    this.get('flashMessages').success('The data element was updated successfully.');
    this.transitionToRoute('projects.show.data-elements.show', dataElement.get('project'), dataElement);
  }).drop()
});
