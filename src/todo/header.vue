<template>
    <Header class="main-header">
        <h1>JTodo</h1>
    </Header>
</template>

<script>
    export default {
        name: "header"
    }
</script>

<style lang="stylus" scoped>
    .main-header{
        text-align center
        h1{
            font-size 8rem
            color rgba(175,47,47,0.5)
            font-weight 700
            margin 3rem
            z-index 5
        }
    }
</style>
