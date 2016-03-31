import Ember from 'ember';

const { Route, run, $, inject } = Ember;
const { scheduleOnce } = run;

export default Route.extend({
  routing: inject.service('-routing'),

  model() {
    return this.modelFor('projects.show.rules.show');
  },

  actions: {
    didTransition() {
      console.log(this.get('queryParams.anchor'));
      let url = this.get('router.url');

      if (url.indexOf('#')) {
        let anchor = url.split('#')[-1];
        let $target = $(`#${anchor}`);

        if ($target.length) {
          scheduleOnce('afterRender', this, () => {
            $('html, body').animate({
              scrollTop: $target.offset().top - 10
            });
          });
        }
      }
    }
  }
});
