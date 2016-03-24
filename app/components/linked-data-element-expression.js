import Ember from 'ember';

const { Component, computed, inject, observer, on, $ } = Ember;
const { sort } = computed;

export default Component.extend({
  routing: inject.service('-routing'),

  sortedDataElements: sort('dataElements', (a, b) => {
    if (a.get('label.length') > b.get('label.length')) {
      return -1;
    } else if (a.get('label.length') < b.get('label.length')) {
      return 1;
    } else {
      return 0;
    }
  }),

  renderLinkedExpression: on('didInsertElement', observer('sortedDataElements.@each.label', 'expression', function() {
    this.$().html(this.get('expression'));

    this.get('sortedDataElements').forEach((dataElement) => {
      let label = dataElement.get('label');
      let URL = this.get('routing').generateURL('projects.show.data-elements.show', [
        dataElement.get('project'),
        dataElement
      ]);
      let link = `<a href="${URL}">${label}</a>`;

      this.$().contents().filter(function() {
        return this.nodeType === 3;
      }).each(function() {
        let $node = $(this);
        let text = $node.text();
        let rendered = text.replace(label, link);

        $node.replaceWith(rendered);
      });
    });
  }))
});
