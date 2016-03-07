/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

describe('Acceptance - Projects | Data Elements: Listing the data elements of a project', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  describe('A project exists', function() {
    beforeEach(function() {
      this.project = server.create('project');
    });

    describe('the project has no data elements', function() {
      describe('I visit the page that lists the data elements of the project', function() {
        beforeEach(function() {
          visit(`projects/${this.project.id}/data-elements`);
        });

        it('tells me that no data elements exist yet for this project', function() {
          expect(find('main').text()).to.contain('No data elements exist yet for this project');
        });
      });
    });

    describe('the project has 3 data elements', function() {
      beforeEach(function() {
        server.logging = true;
        server.createList('data-element', 3, { projectId: this.project.id });
      });

      describe('I visit the page that lists the data elements of the project', function() {
        beforeEach(function() {
          visit(`projects/${this.project.id}/data-elements`);
        });

        it('lists 3 data elements', function() {
          expect(find('.project-data-elements-table tbody tr').length).to.equal(3);
        });
      });
    });
  });
});
