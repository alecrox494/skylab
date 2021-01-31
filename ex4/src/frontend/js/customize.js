class Customize {
    constructor() {
        this.stickerActive = null;
        this.stickersContainer = document.querySelector('#stickers-list');
        this.stickerList = [
            {id:'1', desc:'Descrizione Adesivo 1', url:'./img/stikers/stk_1.png', isActive:true},
            {id:'2', desc:'Descrizione Adesivo 2', url:'./img/stikers/stk_2.png', isActive:false},
            {id:'3', desc:'Descrizione Adesivo 3', url:'./img/stikers/stk_3.png', isActive:false},
            {id:'4', desc:'Descrizione Adesivo 4', url:'./img/stikers/stk_4.png', isActive:false}
        ];
        this.customizedImgContainer = document.querySelector('#customizedImgContainer');
        this.stickerTop = document.querySelector('#stickerTop');
        this.stickerLeft = document.querySelector('#stickerLeft');
        this.stickerSize = document.querySelector('#stickerSize');
        this.saveSticker = document.querySelector('#saveSticker');
        this.deleteSticker = document.querySelector('#deleteSticker');
        this.modalSticker = new bootstrap.Modal(document.getElementById('customizeModal'));

        this.customizedBadge = document.querySelector('#customizedBadge');
        

        this.jsonToSave = { id: '', size: 'default', x: 'default', y: 'default'}

        this.init();

    }

    init() {
        this.stickerList.forEach(sticker => {
            const isActive = sticker.isActive ? 'active' : '';
            this.stickersContainer.insertAdjacentHTML('beforeend', `
            <li class="sticker-item ${isActive}" data-idSticker="${sticker.id}" data-url="${sticker.url}" data-desc="${sticker.desc}" data-active="${sticker.isActive}">
                <img src="${sticker.url}" class="d-block w-100" alt="${sticker.desc}">
            </li>
            `);

            if(sticker.isActive) {
                this.customizedImgContainer.insertAdjacentHTML('beforeend', `
                <img src="${sticker.url}" data-idSticker="${sticker.id}" class="d-block w-100 sticker" id="stickerActive" alt="${sticker.desc}">
                `);
                this.jsonToSave.id = sticker.id;
            }
        });

        this.setStickerActiveEl();
        this.startEventListener();
    }

    setStickerActiveEl() {
        this.stickerActive = document.querySelector('#stickerActive');
    }

    startEventListener() {
        const stickersReady = this.stickersContainer.querySelectorAll('.sticker-item');
        stickersReady.forEach(stikerReady => {
            stikerReady.addEventListener('click', (el)=>{
                const currentSticker = el.currentTarget;
                const currentId = currentSticker.dataset.idsticker;

                const lastActive = this.stickersContainer.querySelector('.sticker-item.active');
                const lastActiveId = lastActive.dataset.idsticker;
                if(lastActiveId !== currentId) {
                    lastActive.dataset.active = 'false';
                    lastActive.classList.remove('active');
                    currentSticker.classList.add('active');
                    currentSticker.dataset.active = 'true';

                    this.stickerActive.src = currentSticker.dataset.url;
                    this.stickerActive.alt = currentSticker.dataset.desc;
                    this.stickerActive.dataset.idsticker = currentId;

                    this.jsonToSave.id = currentId;
                }
            });
        });

        /*Il calcolo di size, x e y è ovviamente irreale, 
        bisognerebbe effettare una serie di calcoli 
        per portarli alle dimensoni reali. Magari da delegare al Server.
        I dati salvati sono puramente esemplificativi.
        */
        this.stickerSize.addEventListener('change', (e) => {
            const width = e.currentTarget.value;
            this.stickerActive.style.maxWidth = `${width}%`;
            this.jsonToSave.size = width;
        });

        this.stickerTop.addEventListener('change', (e) => {
            const position = e.currentTarget.value;
            this.stickerActive.style.top = `${position}%`;
            this.jsonToSave.y = position;
        });

        this.stickerLeft.addEventListener('change', (e) => {
            const position = e.currentTarget.value;
            this.stickerActive.style.left = `${position}%`;
            this.jsonToSave.x = position;
        });

        this.saveSticker.addEventListener('click', ()=>{
            localStorage.setItem('stickerData', JSON.stringify(this.jsonToSave));
            this.customizedBadge.classList.remove('hidden');
            this.deleteSticker.classList.remove('hidden');
            this.modalSticker.hide();
        });

        this.deleteSticker.addEventListener('click', ()=>{
            localStorage.removeItem('stickerData');
            this.customizedBadge.classList.add('hidden');
            this.deleteSticker.classList.add('hidden');
            this.modalSticker.hide();
        });
    }
}

export default Customize;