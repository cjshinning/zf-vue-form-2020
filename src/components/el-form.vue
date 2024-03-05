<template>
  <form @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
// 跨组件传递数据
export default {
  name: 'elForm',
  provide() {
    return { elForm: this } //去找父亲的._provided属性，找到后合并到自己的身上
  },
  props: {
    rules: {
      type: Object,
      default: () => { }  //保证数据不被共享和data一样
    },
    model: {
      type: Object,
      default: () => { }  //保证数据不被共享和data一样
    }
  },
  methods: {
    async validate(cb) {
      // 看一下内部的elFormItem 是否都通过了校验
      // 获取所有的子组件
      let children = this.$broadcast('elFormItem');  //获取所有子元素
      try {
        await Promise.all(children.map(child => child.validate()));
        cb(true);
      } catch {
        cb(false);
      }
    }
  },
  mounted() {
    console.log(this);
  }
}

// provide/inject $on/$emit $parent/$children ref
</script>