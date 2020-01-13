<template>
    <div>


    </div>
</template>

<script>
    export default {
        name: 'Message',
        data() {
            return {
                overlay: false,

            }
        },
        props: {
            message: {
                type: Object,
                required: true
            }
        },

        computed: {
            getPosition() {
                if (this.message.sender === this.$store.state.users.currentUser) {
                    return 'my message'
                } else {
                    return 'message'
                }
            }
        }
    }
</script>

<style scoped>

</style>
