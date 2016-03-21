import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  originalText: (i) => `Phrase ${i}`,
  cleanedText: null,
  discarded: false,
  crisp: false
});
