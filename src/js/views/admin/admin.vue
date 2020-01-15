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
        <v-text-field
                v-model="search"
                label="Search..."
        />
        <ul>
            <li v-for="item in items"> {{item.name}}</li>
        </ul>
        <p>Admin page</p>
        <div v-if="loading">
            <div class="text-center">
                <v-overlay>
                    <v-progress-circular indeterminate size="64"/>
                </v-overlay>
            </div>
        </div>
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
            />
            <v-text-field
                    v-model="blub"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
            />

            <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
            >
                Validate
            </v-btn>
        </v-form>
    </v-app>
</template>

<script>
    import InitializeData from './InitializeData.vue'
    import firebase from "firebase";
    import loader from "./loader";
    import uuidv4 from "uuid/v4";

    export default {
        name: 'ConversationContainer',
        data() {
            return {
                newMessageText: '',
                search: '',
                blub: '',
                isLoggedIn: false,
                currentUser: false,
                name: '',
                valid: true,
                loading: false,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
            }
        },
        components: {
            InitializeData,
            loader
        },
        // computed: mapState([
        //     'items'
        // ]),
        computed: {
            items() {
                return this.$store.getters.getItems.filter(show => {
                    return show.name.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.email;
                console.log(this.currentUser);
            }
            this.get()
        },
        methods: {
            send() {
                this.$store.dispatch('conversations/sendMessage', {
                    blub: this.newMessageText,
                    created: Date.now(),
                    conversationId: this.id,
                    sender: this.$store.state.users.currentUser
                })
            },
            get() {
                this.loading = true;
                this.$store.dispatch('setItems').then(() => this.loading = false);
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    this.$store.dispatch('seed', {
                        id: uuidv4(),
                        blub: this.blub,
                        name: this.name
                    }).then(() => this.loading = false)
                }
            },
            deleteItem() {
                this.$store.dispatch('conversations/delete')
            },
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

<style scoped>
</style>
