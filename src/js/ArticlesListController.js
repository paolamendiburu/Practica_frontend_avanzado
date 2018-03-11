var moment = require('moment');
export class ArticlesListController {

  constructor(selector, articlesService) {
    this.element = document.querySelector(selector);
    this.articlesService = articlesService;
  }

  showLoadingMessage() {
    this.element.innerHTML = `<div class="loading">Loading...</div>`;
  }

  showErrorMessage() {
    this.element.innerHTML = `<div class="error">There was an error</div>`;
  }

  showNoArticlesMessage() {
    this.element.innerHTML = `<div class="info">Ther are no articles</div>`;
  }

  getDatePassed(date) {

  }
  renderArticles(articles) {
    let html = '';
    for (let article of articles) {
      moment.locale(this.language);
      let duration = moment.duration(moment().diff(moment(article.date)));

      let days = parseInt(duration.asDays());
      let hours = parseInt(duration.asHours());
      let minutes = parseInt(duration.asMinutes());
      let seconds = parseInt(duration.asSeconds());

      let timePassed = '';

      if (seconds <= 60) {
        timePassed = `${seconds} seconds ago`;
      }
      if (hours < 1) {
        if (minutes = 1) {
          timePassed = `${minutes} minute ago`;
        }
        else {
          timePassed = `${minutes} minutes ago`;
        }

      }

      if (days < 1) {
        if (hours = 1) {
          timePassed = `${hours} hour ago`;
        }
        else {
          timePassed = `${hours} hours ago`;
        }

      }
      if (days > 1 && days <= 7) {
        timePassed = moment(article.date).format("dddd");
      }
      if (days >= 7) {
        timePassed = moment(article.date).format("MMM Do YY");
      }




      let codeImage = "";
      if (article.mediaType == 'img') {

        codeImage = '<img src="../assets/img/' + article.media + '">';
      }
      else {
        codeImage = '<video  controls><source src="../assets/img/' + article.media + '" type="video/mp4">Your browser does not support the video tag.</video>'
      }
      let authorImg = '';
      if (article.authorImg == "") {
        authorImg = '<img src="../assets/img/noprofile.png" class="img-author">';
      }
      else {
        authorImg = `<img src="../assets/img/${article.authorImg}" class="img-author">`
      }
      html += `
      <a href="./detail.html">
            <article class="article">

              <div class="article-img">

                ${codeImage}
              </div>
              <div class="info">
                <div class="heading">${article.heading}</div>
                <div class="summary">${article.summary}</div>
                <div class="author-info">
                  ${authorImg}
                  <span class="author-name">${article.author} </span>
                  <span> | </span>
                  <i class="far fa-clock"></i>
                  <span class="time-post"> ${timePassed} </span>
                  <span> | </span>

                  <i class="fas fa-comments"></i>
                  <span class="number-comments"> 23</span>
                </div>
              </div>

            </article>
          </a > `;
    }
    this.element.innerHTML = html;
  }

  loadArticles() {
    this.showLoadingMessage();
    this.articlesService.list().then(articles => {
      if (articles.length == 0) {
        this.showNoArticlesMessage();
      } else {
        this.renderArticles(articles);
      }
    }).catch((error) => {
      console.error("ERROR RETRIEVING ARTICLES", error);
      this.showErrorMessage();
    });

  }

}
