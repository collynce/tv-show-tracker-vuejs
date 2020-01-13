<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item
                        v-for="item in items"
                        :key="item.text"
                        :to="item.link"
                        link
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
                dense
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title class="mr-12 align-center">
                <span>VueSHow</span>
            </v-toolbar-title>

            <v-spacer/>
            <v-progress-linear
                    :active="loading"
                    :indeterminate="loading"
                    absolute
                    bottom
                    color="cyan accent-4"
            />

            <v-toolbar-items v-show="!isLoggedIn">
                <v-btn text to="/login">Login</v-btn>
                <v-btn text to="/signup">Sign Up</v-btn>

            </v-toolbar-items>
            <v-btn outlined @click="logout" data-cy="logoutSubmitBtn">Logout</v-btn>
            <v-row
                    align="center"
                    style="max-width: 650px"
            >
            </v-row>
        </v-app-bar>

        <v-content>
            <v-container>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import firebase from "firebase";
    import modal from "./modal";

    export default {
        components: {
            modal
        },
        props: {
            source: String,
        },
        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.email;
                console.log(this.currentUser);
            }
            // this.loading = true
        },

        data: () => ({
            drawer: false,
            items: [
                {icon: 'trending_up', text: 'Most Popular', link: '/tabs'},
            ],
            isLoggedIn: false,
            loading: false,
            currentUser: false,
        }),
        methods: {

            logout() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.go({path: this.$router.path});
                    });
            },
        }

    }
</script>
