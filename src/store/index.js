import Vue from 'vue'
import Vuex from 'vuex'
import {db} from "../firebase/firestore";
import * as firebase from "firebase";
import router from "../router";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
        db: db,
        items: []
    },
    getters: {
        getItems(state) {
            return state.items;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setItems(state, items) {
            state.items = items
        },
        deleteItem(state, payload) {
            const item = state.items.map(item => item.id).indexOf(payload);
            state.items.splice(item, 1);
        }
    },
    actions: {
        async setItems(context) {
            let items = [];
            await db.collection('shows').onSnapshot((snapshot) => {
                items = [];
                return snapshot.forEach((doc) => {
                    let data = doc.data();
                    items.push(data);
                    context.commit('setItems', items);
                });

            });


        },
        async seed(context, payload) {
            let coll = db.collection('shows');
            await coll.add(payload).then(docRef => {
                console.log('Document written with ID: ', docRef.id);
            }).catch(function (error) {
                console.error('Error adding document: ', error)
            });
        },
        async deleteItems(context, id) {
            console.log(id);
            let collectionRef = db.collection('shows');
            await collectionRef.where("id", "==", id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete().then(() => {
                            console.log("Document successfully deleted!");
                        }).catch(function (error) {
                            console.error("Error removing document: ", error);
                        });
                        context.commit('deleteItem', id);
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        },
        userLogin({commit}, {email, password}) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    //alert(`You are logged in as ${user.email}`);
                    this.$router.go('/');
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/wrong-password':
                            alert('Oops!! Invalid email/password!');
                        case 'auth/user-not-found':
                            alert('Oops!! Invalid email/password!');
                    }
                });

        },
        userJoin({commit}, {email, password}) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/');
                    //Email Verification
                    firebase.auth().currentUser.sendEmailVerification().then(function () {
                        // Email sent.
                    }, function (error) {
                        // An error happened.
                    });

                })
                .catch(error => {

                    alert(error.message);

                });
        },
        userSignOut({commit}) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
    },

})
