import '../scss/index.scss'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import Customize from './customize.js'

class main {
    constructor() {
        this.addToCart = document.querySelector('#addToCart');
        this.colorList = document.querySelector('#colorList');
        this.sizeList = document.querySelector('#sizeList');
        this.productDataModal = new bootstrap.Modal(document.getElementById('productDataModal'));
        
        this.productSize = document.querySelector('#size');
        this.productColor = document.querySelector('#color');
        this.productCustomize = document.querySelector('#customize');
        this.productIdSticker = document.querySelector('#idSticker');
        this.productDimension = document.querySelector('#dimension');
        this.productX = document.querySelector('#dataX');
        this.productY = document.querySelector('#dataY');

        this.init();
    };

    init() {
        this.startEventListener();
    };

    startEventListener() {
        this.addToCart.addEventListener('click', ()=>{
            this.productDataModal.show();

            //dati prodotto
            this.productSize.innerText = this.sizeList.value;
            const color = this.colorList.querySelector('.list-inline-item.active').dataset.colorid;
            this.productColor.innerText = color;
            // dati sticker
            const stickerdata = localStorage.getItem('stickerData');
            if(stickerdata) {
                const stickerdataJson = JSON.parse(stickerdata);
                this.productCustomize.innerText = 'Si';
                this.productIdSticker.innerText = stickerdataJson.id;
                this.productDimension.innerText = stickerdataJson.size;
                this.productX.innerText = stickerdataJson.x;
                this.productY.innerText = stickerdataJson.y;
            } else {
                this.productCustomize.innerText = 'No';
                this.productIdSticker.innerText = '';
                this.productDimension.innerText = '';
                this.productX.innerText = '';
                this.productY.innerText = '';
            }
            
        });
    }

}

new Customize();
new main();



























