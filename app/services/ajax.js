import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'lerm-client/config/environment';

export default AjaxService.extend({
  host: ENV.APP.SERVER_HOST,
  namespace: ENV.APP.API_NAMESPACE
});
