<template>
    <div class="helper">
        <span class="left">
            {{unFinishedTodoLength}} items left
        </span>
        <span class="tabs">
<!--      v-for循环出来的或者jsx中map、foreach循环出来的，要给一个唯一的key去标识它，
             循环是一个非常耗时的操作，下一次操作会复用节点不会去重新循环
             filter代表现在正选中的某一个状态-->
            <span
                    v-for="state in states"
                    :key="state"
                    :class="[state,filter === state ? 'actived' : '']"
                    @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">Clear Completed</span>
    </div>
</template>

<script>
    export default {
        props: {
            filter: {
                type: String,
                required: true
            },
            todos: {
                type: Array,
                required: true
            }
        },
        name: "tabs",
        data() {
            return {
                states: ['all','active','completed']
            }
        },
        methods: {
            toggleFilter(state) {
                this.$emit('toggle',state);
            },
            clearAllCompleted() {
                this.$emit('clearCompleted');
            }
        },
        computed: {
            unFinishedTodoLength() {
                return this.todos.filter(todo => todo.completed).length;
            }
        },
        comments: true
    }
</script>

<style lang="stylus" scoped>
    .helper
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #ffffff
        font-size 14px
        font-smoothing antialiased
    .left, .clear, .tabs
        padding 0 10px
    .left .clear
        width 150px
    .left
        text-align center
    .clear
        text-align right
        cursor pointer
    .tabs
        width 200px
        display flex
        justify-content space-between
        *
            display inline-block
            padding 0 10px
            cursor pointer
            border 1px solid rgba(175,47,47,0)
            &.actived
                border-color rgba(175,47,47,0.4)
                border-radius 5px
</style>
