<template>
    <section>{{dataJson.data}}</section>
</template>

<script>
    export default {
        name: "requestVue",
        props: {
            dataJson: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>