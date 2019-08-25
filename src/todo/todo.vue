<template>
    <section class="real-app">
<!--        autofocus进入页面时默认选中，keyup释放键盘时触发-->
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么？"
            @keyup.enter="addTodo"
        >
        <Item
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />
        <Tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearCompleted="clearAllCompleted"/>
        <request-vue :dataJson="dataJson"></request-vue>
    </section>
</template>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'
    import RequestVue from './requestVue.vue'

    let id = 0;
    export default {
        name: "todo",
        components: {
            Item,
            Tabs,
            RequestVue
        },
        data() {
            return {
                todos: [],
                filter: 'all',
                dataJson: {}
            }
        },
        methods: {
            addTodo(e) {
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                });
                e.target.value = "";
            },
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id),1);
            },
            toggleFilter(state) {
                this.filter = state;
            },
            clearAllCompleted() {
                // this.todos.splice(0,this.todos.length);
                this.todos = this.todos.filter(todo => !todo.completed);
                return this.todos;
            }
        },
        computed: {
            filteredTodos() {
                if (this.filter === 'all'){
                    return this.todos
                }
                const completed = this.filter === 'completed';
                return this.todos.filter(todo => completed === todo.completed)
            }
        },
        comments: true,
        created() {
            this.$axios({
                // method:'get',
                // url: '/get/test3/1'
                method: 'post',
                url: '/post/test2',
                data: {"productNo":"2222","interType":null,"flightType":null,"subFlightType":null}
            }).then(res => {
                debugger
                this.dataJson = res.data;
            }).catch((reason) => {
                debugger
                console.log(reason);
            })
        }
    }
</script>

<style lang="stylus" scoped>
.real-app{
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #c0c0c0
}
    .add-input{
        position relative
        width 100%
        font-size 24px
        font-family inherit
        font-weight inherit
        line-height 1.4em
        border 0
        outline none
        color inherit
        padding 6px
        border 1px solid #999
        box-shadow inset 0 -1px 5px 0 rgb(0,0,0,0.9)
        box-sizing border-box
        font-smoothing antialiased
        padding 16px 16px 16px 60px
        border none
        box-shadow inset 0 -2px 1px #0000004f
    }
</style>
