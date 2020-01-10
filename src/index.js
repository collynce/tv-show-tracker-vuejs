import Vue from 'vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import store from './store/index'
import router from './router/index'
import './firebase/firebase'

require

('./js/components/components');


let app;
firebase.auth().onAuthStateChanged(user => {
    if (!app) {
        new Vue({
            el: '#app',
            store,
            router,
            vuetify
        })
    }
});
