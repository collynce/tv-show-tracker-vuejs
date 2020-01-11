import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase";
import router from "../router";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        }
    },
    actions: {
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
    modules: {}
})
