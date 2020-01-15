<template>
    <v-app>
        <v-container fluid>
            <v-carousel
                    cycle
                    progress
                    progress-color="green"
                    height="400"
                    hide-delimiter-background
                    delimiter-icon="mdi-minus"
                    :show-arrows="false"
            >
                <v-carousel-item
                        v-for="(slide, i) in slides"
                        :key="i"
                        :src="slide.src"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                >
                </v-carousel-item>
            </v-carousel>
        </v-container>
    </v-app>
</template>
<script>
    export default {
        data() {
            return {
                slides: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                    },
                ],
            }
        },
    }
</script>
