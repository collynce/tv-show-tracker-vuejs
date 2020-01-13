<template>
    <v-app>
        {{conversations}}
        <v-data-table
                :headers="headers"
                sort-by="calories"
                class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>My CRUD</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    />
                    <v-spacer/>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="Dessert name"/>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.calories" label="Calories"/>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.fat" label="Fat (g)"/>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"/>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.protein"
                                                          label="Protein (g)"/>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <!--            <template v-slot:item.action="{ item }">-->
            <!--                <v-icon-->
            <!--                        small-->
            <!--                        class="mr-2"-->
            <!--                        @click="editItem(item)"-->
            <!--                >-->
            <!--                    edit-->
            <!--                </v-icon>-->
            <!--                <v-icon-->
            <!--                        small-->
            <!--                        @click="deleteItem(item)"-->
            <!--                >-->
            <!--                    delete-->
            <!--                </v-icon>-->
            <!--            </template>-->
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </v-app>
</template>
<script>
    import firebase from "firebase";
    import {mapState} from 'vuex';

    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'TV Show',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                {text: 'Genre', value: 'genre'},
                {text: 'Ratings', value: 'ratings'},
                {text: 'Reviews', value: 'reviews'},
                {text: 'Subscriptions', value: 'subscriptions'},
                {text: 'Actions', value: 'action', sortable: false},
            ],
            desserts: [],
            editedIndex: -1,
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            ...mapState(['conversations', 'all'])
        },
        watch: {
            dialog(val) {
                val || this.close()
            }
            ,
        }
        ,

        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.email;
                console.log(this.currentUser);
            }
            this.initialize();

        }
        ,

        methods: {
            initialize() {
                this.$store.dispatch('users/get')
                this.loading = true;
                this.$store.dispatch('conversations/get')

            }
            ,
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            }
            ,
        }
        ,
    }
</script>
