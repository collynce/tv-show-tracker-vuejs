import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../js/views/home'
import login from "../js/views/auth/login";
import register from "../js/views/auth/register";
import client from "../js/views/client/client";
import admin from "../js/views/admin/admin";
import dashboard from "../js/views/admin/dashboard";
import Tabs from "../js/views/admin/tabs/Tabs";
import * as firebase from "firebase";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            auth: false
        }
    },
    {
        path: '/admin',
        component: dashboard,
        meta: {
            auth: true
        },
        children: [
            {
                path: '/tabs',
                component: Tabs,
                meta: {
                    auth: true
                },
            },
            {
                path: '/add',
                component: admin,
                meta: {
                    auth: true
                },
            }
        ]
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

// router.beforeEach((to, from, next) => {
//
//     firebase.auth().onAuthStateChanged(userAuth => {
//
//         if (userAuth) {
//             firebase.auth().currentUser.getIdTokenResult()
//                 .then(function ({
//                                     claims
//                                 }) {
//
//                     if (claims.client) {
//                         if (to.path !== '/client')
//                             return next({
//                                 path: '/client',
//                             })
//                     } else if (claims.admin) {
//                         if (to.path !== '/admin')
//                             return next({
//                                 path: '/admin',
//                                 query: {
//                                     redirect: to.fullPath
//                                 }
//                             })
//                     }
//                 })
//         } else {
//             if (to.matched.some(record => record.meta.auth)) {
//                 next({
//                     path: '/login',
//                     query: {
//                         redirect: to.fullPath
//                     }
//                 })
//             } else {
//                 next()
//             }
//         }
//
//     });
//
//     next()
//
// });

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (!firebase.auth().currentUser) {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (firebase.auth().currentUser) {
            next({
                path: "/",
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
