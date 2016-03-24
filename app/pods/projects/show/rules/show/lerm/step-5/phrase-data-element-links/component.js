import Ember from 'ember';

const { Component, computed, inject } = Ember;

export default Component.extend({
  store: inject.service(),

  isEditingExpression: false,

  showCreateDataElementModal: false,

  dataElementOptions: computed('dataElements', 'phrase.dataElements.[]', function() {
    return this.get('dataElements').filter((e) => !this.get('phrase.dataElements').contains(e));
  }),

  actions: {
    unlinkDataElement(dataElement) {
      this.get('unlinkDataElementTask').perform(this.get('phrase'), dataElement);
    },

    linkDataElement() {
      let selectedDataElement = this.get('selectedDataElement');

      if (selectedDataElement) {
        this.get('linkDataElementTask').perform(this.get('phrase'), selectedDataElement).then(() => {
          this.set('selectedDataElement', null);
        });
      }
    },

    startEditingExpression() {
      this.set('isEditingExpression', true);
    },

    stopEditingExpression() {
      this.get('phrase').rollbackAttributes();
      this.set('isEditingExpression', false);
    },

    saveDataElementExpression() {
      this.get('savePhraseTask').perform(this.get('phrase')).then(() => {
        this.set('isEditingExpression', false);
      });
    },

    openCreateDataElementModal() {
      let newDataElement = this.get('store').createRecord('data-element', {
        project: this.get('phrase.rule.project')
      });

      newDataElement.get('phrases').addObject(this.get('phrase'));

      this.setProperties({
        newDataElement,
        showCreateDataElementModal: true
      });
    },

    closeCreateDataElementModal() {
      this.get('newDataElement').rollbackAttributes();
      this.setProperties({
        newDataElement: null,
        showCreateDataElementModal: false
      });
    },

    createAndLinkDataElement() {
      this.get('saveDataElementTask').perform(this.get('newDataElement')).then(() => {
        this.setProperties({
          newDataElement: null,
          showCreateDataElementModal: false
        });
      });
    }
  }
});
