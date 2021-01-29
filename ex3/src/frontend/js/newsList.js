import Services from './services.js';

class NewsList {
    constructor() {
        this.services = new Services();
        this.container = document.querySelector('#newsContainer');
        this.buttonLoading = document.querySelector('#newsLoading');
        this.init();
    }

    init() {

        const loadNews = () => {
            this.clearCards();
			const url = 'http://localhost:3000/news'
            this.services.getData(url).then(data => {
                // console.log(data);
                this.printNews(data);
            }).catch((err) => {
                console.log(err);
            });
        };
        
        loadNews();        
        this.buttonLoading.addEventListener('click', loadNews);
    }

    printNews(newsArray) {
        const host = this.services.getHost();
        let index = 0;
        newsArray.forEach(entryNews => {
			let card =
			`<div class="col">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h3 class="card-title">${entryNews.title}</h3>
                        <hr>
                        <p class="card-text">${entryNews.body}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <a href="${host}/articleDetails/${index}" class="btn btn-sm btn-outline-primary">Read More</a>
                            <small class="text-muted">${entryNews.author}</small>
                        </div>
                    </div>
                </div>
            </div>`;
            this.container.insertAdjacentHTML('beforeend', card);
            index++;
        });
    }

    clearCards () {
		this.elements = this.container.querySelectorAll('.col');
		for (let i = 0; i < this.elements.length; i++) {
			this.elements[i].remove();
		}
	}
}

export default NewsList;