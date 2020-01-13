<template>
    <v-app>
        <v-card
                color="grey lighten-4"
                flat
                tile
        >
            <v-toolbar>
                <v-toolbar-title>Client</v-toolbar-title>

                <v-spacer/>

                <v-toolbar-items v-show="!isLoggedIn">
                    <v-btn text to="/login">Login</v-btn>
                    <v-btn text to="/signup">Sign Up</v-btn>

                </v-toolbar-items>
                <v-btn outlined @click="logout" data-cy="logoutSubmitBtn">Logout</v-btn>
            </v-toolbar>
        </v-card>
        <p>Welcome {{currentUser}}</p>
        <p>client page</p>
    </v-app>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: 'home',
        data() {
            return {
                isLoggedIn: false,
                currentUser: false,
                loading: true
            }
        },
        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.email;
                console.log(this.currentUser);
            }
            this.get();
        },
        methods: {
            logout() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.go({path: this.$router.path});
                    });
            },
            get() {
                this.loading = true;
                this.$store.dispatch('conversations/get').then(() => this.loading = false)
            }
        }
    }
</script>

<style scoped>

</style>
