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
                currentUser: false
            }
        },
        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.email;
                console.log(this.currentUser);
            }
        },
        methods: {
            logout() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.go({path: this.$router.path});
                    });
            }
        }
    }
</script>

<style scoped>

</style>
