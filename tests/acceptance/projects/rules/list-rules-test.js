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

describe('Acceptance - Projects | Rules: Listing the rules of a project', function() {
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

    describe('the project has no rules', function() {
      describe('I visit the page that lists the rules of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/rules`);
        });

        it('tells me that no rules exist yet for this project', function() {
          expect(find('main').text()).to.contain('No rules exist yet for this project');
        });
      });
    });

    describe('the project has 3 rules', function() {
      beforeEach(function() {
        server.createList('rule', 3, { projectId: this.project.id });
      });

      describe('I visit the page that lists the rules of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/rules`);
        });

        it('lists 3 rules', function() {
          expect(find('.project-rules-table tbody tr').length).to.equal(3);
        });
      });
    });
  });
});
