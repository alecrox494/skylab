import '../css/index.scss'
import Services from './services.js'

const service = new Services();
const url = 'http://localhost:3000/news'
service.getData(url).then(data => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
      });



























