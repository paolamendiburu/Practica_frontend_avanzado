export class ArticlesService {

  constructor(url) {
    this.url = url;
  }

  async list() {
    const response = await fetch(this.url);
    return response.json();
  }


}
