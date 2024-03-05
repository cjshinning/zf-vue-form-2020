<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <span v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import Schema from 'async-validator';
export default {
  name: 'elFormItem',
  inject: ['elForm'],
  data() {
    return { errorMessage: null }
  },
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  methods: {
    validate() {
      let value = this.elForm.model[this.prop]; //当前数据
      let ruleValue = this.elForm.rules[this.prop];

      if (this.prop) {
        let schema = new Schema({
          [this.prop]: ruleValue
        })

        return schema.validate({ [this.prop]: value }, (err, res) => {
          if (err) {
            this.errorMessage = err[0].message;
          } else {
            this.errorMessage = null;
          }
        });
      }

      // element async-validater
    }
  },
  mounted() {  //挂载顺序是先子后父
    this.$on('validate', () => {
      // console.log('校验', this._uid);
      this.validate();
    })
  }
}
// 在el-form-item中需要校验当前你输入的内容是否符合规范 用户更改对应的输入框 对应的el-form-item应该知道
</script>