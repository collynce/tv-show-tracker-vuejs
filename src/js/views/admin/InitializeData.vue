<template>
    <div>
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive}">
                    <a href="#" @click="selectTab(tab)">{{tab.name}}</a>
                </li>
            </ul>
        </div>
        <div>
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs: []
            }
        },
        created() {
            this.tabs = this.$children;
        },
        methods: {
            selectTab(selectedTab) {
                this.tabs.forEach(tab => {
                    this.isActive = (tab.name === selectedTab.name)
                })
            }
        }
    }
</script>
