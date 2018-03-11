import css from './scss/style.scss';
import 'bootstrap';
import moment from 'moment';
import { ArticlesListController } from './js/ArticlesListController';
import { ArticlesService } from './js/ArticlesService';
import { CommentsListController } from './js/CommentsListController';
import { FormController } from './js/FormController';
import { CommentsService } from './js/CommentsService';
import { PubSub } from 'pubsub-js';


document.addEventListener("DOMContentLoaded", () => {
  let indexPage = document.querySelector('.articles-list');
  if (indexPage) {
    let articlesService = new ArticlesService('http://localhost:3001/articles/');

    let articlesListController = new ArticlesListController(".articles-list", articlesService);
    articlesListController.loadArticles();
  }
  let detailsPage = document.querySelector('.comments-list');
  if (detailsPage) {
    let commentsService = new CommentsService('http://localhost:3001/comments/');

    let commentsListController = new CommentsListController(".comments-list", commentsService, PubSub);
    commentsListController.loadComments();

    let commentsNumberController = new CommentsListController(".number-comments", commentsService, PubSub);
    commentsNumberController.loadNumberComments();

    let formController = new FormController('.comments-form', commentsService, PubSub);
  }





});
