import Ember from 'ember';

const { Helper } = Ember;

function regExpEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export default Helper.helper(function([text, highlights]) {
  if (text) {
    [].concat(highlights).sort((a, b) => b.length - a.length).forEach((h) => {
      text = text.replace(new RegExp(`(${regExpEscape(h)})`, "gi"), "<span class='highlight'>$1</span>");
    });
  }

  return Ember.String.htmlSafe(text);
});
