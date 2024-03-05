// 默认vue是runtime-only 不识别模板
import Vue from 'vue'
import App from './App.vue'

// Vue.config.productionTip = false
Vue.prototype.$dispatch = function (componentName, eventName) {
  let parent = this.$parent;
  while (parent) {
    let name = parent.$options.name;
    if (name === componentName) {
      break;
    } else {
      parent = parent.$parent;
    }
  }
  if (parent) {
    if (eventName) {
      parent.$emit(eventName);  //触发这个方法
    }
    return parent;  //返回父组件
  }
}

Vue.prototype.$broadcast = function (componentName, eventName) {
  let children = this.$children;
  let arr = [];

  function findChildren(children) {
    children.forEach(child => {
      if (child.$options.name === componentName) {
        if (eventName) {
          child.$emit(eventName);
        } else {
          arr.push(child)
        }
      }
      if (child.$children) {
        findChildren(child.$children);
      }
    })
  }

  findChildren(children);
  return arr;
}

new Vue({
  // template: '<div>hello</div>',
  render: h => h(App),
}).$mount('#app')
