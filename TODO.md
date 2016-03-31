# TODO list

- When `ember-simple-auth@1.2.0` is released, change to promise based solution in `app/services/session.js`.
- When [Pods 2.0](https://speakerdeck.com/rwjblue/a-tale-of-two-pods) lands in ember, finish up move to 
  pod architecture (currently top level stuff still lives in `app/templates`, `app/routes` and `app/controllers`, and
  models don't use pod structure yet) and remove namespacing on local component invocations.
- When routable components land in Ember:
    - Migrate controllers to routable components
    - Use `ember-component-css` (or perhaps by then this is supported out of the box by ember) to refactor the
      big and extremely messy `app/styles/app.scss` in to individual scss files to each pod.
- When `ember-suave@^2.0.2` is released Remove dependency on `broccoli-jscs`.
- When `ember-cli-mirage` support many-to-many relationships cleanly:
    - Fix failing tests for LERM step 5.
    - Add acceptance tests for formalization results and rule relationships.
- Find (create?) better form builder (wait and see how `ember-easy-form@2.0` turns out).
- Move forms shared between edit and new routes into common local component.
- Add page for editing account details directly in front-end.
- Add page for registering a new account directly in front-end.
- Add integration tests for all components.
- Add pagination, search, and formalization status filtering (all async?) to rule list page.
- Add pagination and search (both async?) to data element list page.
- Make ember-power-select retrieve options async in LERM step 3, 5 and 6?
