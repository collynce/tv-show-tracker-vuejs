<template>
    <v-app>
        <loader v-show="loading"/>
        <v-data-table
                :headers="headers"
                :items="items"
                sort-by="id"
                class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>TV Store</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    />
                    <v-spacer/>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Show</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.name" label="Show name"/>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.blub" label="Synopsis"/>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    edit
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item.id)"
                >
                    delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </v-app>
</template>
<script>
    import firebase from "firebase";
    import loader from "../loader";

    export default {
        components: {
            loader
        },
        data: () => ({
            dialog: false,
            loading: false,
            headers: [
                {
                    text: 'TV Show',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                {text: 'Genre', value: 'blub'},
                {text: 'Actions', value: 'action', sortable: false},
            ],
            shows: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                blub: ''
            },
            defaultItem: {
                name: '',
                blub: ''
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
            },
            items() {
                return this.$store.getters.getItems
            }
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        beforeMount() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.email;
                console.log(this.currentUser);
            }
            this.loading = true;
            this.$store.dispatch('setItems').then(() => this.loading = false)
        },

        methods: {
            initialize() {
                // this.loading = true;
                this.$store.dispatch('setItems')

            },
            editItem(item) {
                this.editedIndex = this.shows.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem(id) {
                this.loading = true;
                confirm('Are you sure you want to delete this item?')
                && this.$store.dispatch('deleteItems', id)
                    .then(() => this.loading = false)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                // if (this.editedIndex > -1) {
                //     Object.assign(this.shows[this.editedIndex], this.editedItem)
                // } else {
                //     this.desserts.push(this.editedItem)
                // }
                this.close()
            },
        },
    }
</script>
