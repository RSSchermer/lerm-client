/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../helpers/start-app';
import destroyApp from '../../helpers/destroy-app';

describe('Acceptance | Projects: Listing projects', function () {
  let application;

  beforeEach(function () {
    application = startApp();
  });

  afterEach(function () {
    destroyApp(application);
  });

  describe('3 projects exist', function () {
    beforeEach(function () {
      server.createList('project', 3);
    });

    describe('I visit the page for listing projects', function () {
      beforeEach(function () {
        visit('projects');
      });

      it('lists 3 projects', function () {
        expect(find('.projects-table tr.project-row').length).to.equal(3);
      });
    });
  });
});
