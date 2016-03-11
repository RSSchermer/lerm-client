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

describe('Acceptance - Projects | Members: Listing project members', function() {
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

    describe('the project has 3 members', function() {
      beforeEach(function() {
        server.createList('user', 3).forEach((user) => {
          server.create('membership', { projectId: this.project.id, userId: user.id });
        });
      });

      describe('I visit the page that lists the members of the project', function() {
        beforeEach(function() {
          visit(`/projects/${this.project.id}/members`);
        });

        it('lists 3 members', function() {
          expect(find('.project-members-table tbody tr').length).to.equal(3);
        });
      });
    });
  });
});
