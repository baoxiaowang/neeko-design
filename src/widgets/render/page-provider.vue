<template>
  <slot :state="state"> </slot>
</template>

<script setup lang="ts" name="page-provider" inheritAttrs="false">
  import { ref } from 'vue';

  const state = ref<Record<string, any>>({
    count: 1,
    msg: 'state-msg',
  });
</script>

<style lang="less"></style>
