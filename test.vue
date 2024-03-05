<template>
  <div @click="handleClick" class="test">
    hello world
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('click');
    }
  }
}
</script>

<style>
.test {
  background: red;
}
</style>