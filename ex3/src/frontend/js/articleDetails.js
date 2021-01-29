import '../scss/index.scss'
import Services from './services.js'

class ArticleDetails {
    constructor() {
        this.services = new Services();
        this.containerTitle = document.querySelector('#articleTitle');
        this.containerText = document.querySelector('#articleAuthor');
        this.containerAuthor = document.querySelector('#articleText');
        this.init();
    }

    init() {
        const url = 'http://localhost:3000/article'
        this.services.getData(url).then(data => {
            this.containerTitle.innerText = data.title;
            this.containerText.innerText = data.author;
            this.containerAuthor.innerText = data.body;
        }).catch((err) => {
            console.log(err);
        });
    }
}

new ArticleDetails();