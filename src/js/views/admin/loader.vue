<template>
    <div v-show="loading">
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="55"/>
        </v-overlay>
    </div>
</template>
<script>
    export default {
        props: {
            loading: Boolean
        },
        data() {
            return {
                overlay: true,
            }
        }
    }
</script>
