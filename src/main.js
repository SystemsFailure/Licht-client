import { createApp } from 'vue';
import router from './router/router';
import store from './store/store';
import App from './App.vue';
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { firebase_d } from '@/keys/secret';


import VueHighlightJS from 'vue3-highlightjs'
// import 'highlight.js/styles/solarized-light.css'


const firebaseConfig = {
    ...firebase_d
};

const appBase = initializeApp(firebaseConfig);
const db = getFirestore(appBase);
const storage = getStorage(appBase);



const app = createApp(App);


app
    .use(VueHighlightJS)
    .use(store)
    .use(router)
    .mount('#app');

export {db, storage}
