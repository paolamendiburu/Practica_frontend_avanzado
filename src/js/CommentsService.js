

export class CommentsService {

  constructor(url) {
    this.url = url;
  }

  async list() {
    const response = await fetch(this.url);
    return response.json();
  }

  async save(comment) {
    const response = await fetch(this.url, {
      method: 'post',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

}
