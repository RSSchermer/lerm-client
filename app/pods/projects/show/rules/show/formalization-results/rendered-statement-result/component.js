import Ember from 'ember';

const { Component, computed, observer, on, $ } = Ember;
const { sort } = computed;

export default Component.extend({
  sortedPhrases: sort('phrases', (a, b) => {
    if (a.get('text.length') > b.get('text.length')) {
      return -1;
    } else if (a.get('text.length') < b.get('text.length')) {
      return 1;
    } else {
      return 0;
    }
  }),

  renderCondition: on('didInsertElement', observer('statement.condition', 'sortedPhrases.[]', function() {
    let condition = this.get('statement.condition');
    let $renderedCondition = this.$('.rendered-condition');

    $renderedCondition.html(condition);

    this.get('sortedPhrases').forEach((phrase) => {
      console.log('test');
      let dataElementExpression = this.$(`.phrase-reference-list #phrase_${phrase.get('id')}`).html();

      $renderedCondition.contents().filter(function() {
        return this.nodeType === 3;
      }).each(function() {
        let $node = $(this);
        let text = $node.text();
        let rendered = text.replace(phrase.get('text'), dataElementExpression);

        $node.replaceWith(rendered);
      });
    });
  })),

  renderConsequence: on('didInsertElement', observer('statement.consequence', 'sortedPhrases.[]', function() {
    let condition = this.get('statement.consequence');
    let $renderedCondition = this.$('.rendered-consequence');

    $renderedCondition.html(condition);

    this.get('sortedPhrases').forEach((phrase) => {
      console.log('test');
      let dataElementExpression = this.$(`.phrase-reference-list #phrase_${phrase.get('id')}`).html();

      $renderedCondition.contents().filter(function() {
        return this.nodeType === 3;
      }).each(function() {
        let $node = $(this);
        let text = $node.text();
        let rendered = text.replace(phrase.get('text'), dataElementExpression);

        $node.replaceWith(rendered);
      });
    });
  }))
});
