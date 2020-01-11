import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../js/views/home'
import login from "../js/views/auth/login";
import register from "../js/views/auth/register";
import * as firebase from "firebase";
import client from "../js/views/client/client";
import admin from "../js/views/admin/admin";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            auth: true
        }
    },
    {
        path: '/admin',
        component: admin,
        meta: {
            auth: true
        }
    },
    {
        path: '/client',
        component: client,
        meta: {
            auth: true
        }
    },
    {
        path: '/signup',
        component: register,
        meta: {
            guest: true
        }
    },
    {
        path: '/login',
        component: login,
        meta: {
            guest: true
        }
    }
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {

    firebase.auth().onAuthStateChanged(userAuth => {

        if (userAuth) {
            firebase.auth().currentUser.getIdTokenResult()
                .then(function ({
                                    claims
                                }) {

                    if (claims.client) {
                        if (to.path !== '/client')
                            return next({
                                path: '/client',
                            })
                    } else if (claims.admin) {
                        if (to.path !== '/admin')
                            return next({
                                path: this.$router.path,
                            })
                    }
                })
        } else {
            if (to.matched.some(record => record.meta.auth)) {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    }
                })
            } else {
                next()
            }
        }

    });

    next()

});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (!firebase.auth().currentUser) {
//             next({
//                 path: "/login",
//                 query: {
//                     redirect: to.fullpath
//                 }
//             });
//         } else {
//             next();
//         }
//     } else if (to.matched.some(record => record.meta.requiresGuest)) {
//         if (firebase.auth().currentUser) {
//             next({
//                 path: "/",
//                 query: {
//                     redirect: to.fullPath
//                 }
//             });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

export default router;
