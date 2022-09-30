import {createApp} from 'vue';
import App from './App.vue';
import Down from './Down.vue';
import router from './router';
import 'flowbite';

import './assets/main.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 

    faScrewdriverWrench,
    faCrown,
    faChessPawn,
    faChessRook,
    faChessQueen,
    faArrowRight,
    faCode,
    faTruckFast,
    faPeopleGroup,
    faRobot,
    faChess,
    faUserGroup,
    faInbox,
    faHeart,
    faThumbTack,
    faTriangleExclamation,
    faLifeRing,
    faBook,
    faGear,
    faChartSimple,
    faFlag,
    faHouse,
    faStar,
    faMagnifyingGlass,
    faTrash,
    faBars,

} from '@fortawesome/free-solid-svg-icons'
import {
    faDiscord
} from '@fortawesome/free-brands-svg-icons'

library.add(
    faScrewdriverWrench, 
    faCrown, 
    faChessPawn, 
    faChessRook, 
    faChessQueen, 
    faArrowRight, 
    faCode, 
    faTruckFast, 
    faPeopleGroup,
    faRobot,
    faDiscord,
    faChess,
    faUserGroup,
    faInbox,
    faHeart,
    faThumbTack,
    faTriangleExclamation,
    faLifeRing,
    faBook,
    faGear,
    faChartSimple,
    faFlag,
    faHouse,
    faStar,
    faMagnifyingGlass,
    faTrash,
    faBars
);

import store from './store.js';

import { createHead } from "@vueuse/head"

const app = createApp(App);
const head = createHead();

app.use(head);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(store);
store.dispatch("fetchUserData").then(async () => {
    
    app.use(router);
    app.mount('#app');

}).catch(async () => {
    // Mount 'down for maintenance' app
    
    const down = createApp(Down);
    down.use(head);
    down.mount('#app');
});
