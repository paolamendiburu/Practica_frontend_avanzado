export class FormController {

  constructor(selector, commentsService, pubSub) {
    this.element = document.querySelector(selector);
    this.commentsService = commentsService;
    this.pubSub = pubSub;
    this.loading = false;
    this.addEventListeners();
  }

  setLoading(loading) {
    this.loading = loading;
    this.element.querySelectorAll('input, button').forEach(item => { item.disabled = loading });
  }


  addEventListeners() {
    this.addInputListeners();
    this.addTextareaListeners();
    this.addFormSubmitListener();
  }

  addFormSubmitListener() {
    this.element.addEventListener('submit', event => {
      event.preventDefault();
      if (this.loading) {
        return;
      }
      this.setLoading(true);
      let comment = this.buildCommentData();
      this.commentsService.save(comment).then(createdComment => {
        console.log("Comment created", createdComment);
        this.element.reset();
        this.pubSub.publish('comment:created', createdComment);
      }).catch(error => {
        console.error("There was an error");
        alert(`There was an error ${error}`);
      }).finally(() => {
        this.setLoading(false);
      })
    });
  }

  buildCommentData() {
    return {
      fullname: this.element.querySelector('#fullnameInput').value,
      email: this.element.querySelector('#emailInput').value,

      comment: this.element.querySelector('#comment-text').value
    }
  }

  addInputListeners() {
    this.element.querySelectorAll('input,textarea').forEach(input => {

      input.addEventListener('keyup', event => {
        if (input.checkValidity() == false) {
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
        this.checkFormValidity();
      });
    });
  }

  addTextareaListeners() {
    let maxLength = 120;
    let commentText = this.element.querySelector('textarea');
    let button = this.element.querySelector('button');

    commentText.addEventListener('keyup', event => {
      if (commentText.value <= 0) {
        button.disabled = true;
      } else if (commentText.value.match(/\S+/g).length > maxLength) {
        commentText.classList.add('error');
        button.disabled = true;
        alert("Please write max. 120 words");
      } else {
        textarea.classList.remove('error');
        this.checkFormValidity();
      }
    });
  }

  checkFormValidity() {
    let button = this.element.querySelector('button');
    if (this.element.checkValidity()) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

}