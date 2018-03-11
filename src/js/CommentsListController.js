export class CommentsListController {

  constructor(selector, commentsService, pubSub) {
    this.element = document.querySelector(selector);
    this.commentsService = commentsService;
    pubSub.subscribe('comment:created', (event, comment) => {
      console.log("CommentsListController", comment);
      this.loadComments();
      this.loadNumberComments();
    });
  }

  showLoadingMessage() {
    this.element.innerHTML = '<div class="loading">Loading...</div>';
  }

  showErrorMessage() {
    this.element.innerHTML = '<div class="error">There was an error</div>';
  }

  showNoCommentsMessage() {
    this.element.innerHTML = '<div class="info">There are no comments';
  }

  renderComments(comments) {
    let html = '';
    for (let comment of comments) {
      html += `<div class="comment-name">${comment.fullname}</div>
      <div class="comment-text">${comment.comment}</div > `;
    }
    this.element.innerHTML = html;
  }
  renderNumberComments(comments) {
    let html = '';

    html += comments.length;

    this.element.innerHTML = html;
  }

  loadComments() {
    this.showLoadingMessage();
    this.commentsService.list().then(comments => {
      if (comments.length == 0) {
        this.showNoCommentsMessage();
      } else {
        this.renderComments(comments);
      }
    }).catch((error) => {
      console.error("ERROR RETRIEVING COMMENTS", error);
      this.showErrorMessage();
    });

  }
  loadNumberComments() {
    this.showLoadingMessage();
    this.commentsService.list().then(comments => {
      if (comments.length == 0) {
        this.showNoCommentsMessage();
      } else {
        this.renderNumberComments(comments);
      }
    }).catch((error) => {
      console.error("ERROR RETRIEVING COMMENTS", error);
      this.showErrorMessage();
    });

  }

}
