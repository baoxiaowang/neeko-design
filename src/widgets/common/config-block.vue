<!--
 * new page
 * @author: zhaoyahui
 * @since: 2022-06-08
 * config-block.vue
-->
<template>
  <div class="config-block">
    <div :class="{ 'rule-required': required }" class="config-title">
      <slot name="label">
        <span class="title-span">
          {{ label }}
        </span>
      </slot>
    </div>
    <div class="config-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ label?: string; required?: boolean }>();
</script>

<style lang="less">
  .config-block {
    margin-bottom: 24px;

    .config-title {
      display: inline-block;
      margin: 10px 0;
      font-weight: 700;
      font-size: 14px;
    }

    .rule-required {
      position: relative;

      &::after {
        position: absolute;
        top: 0;
        right: -10px;
        display: inline-block;
        color: red;
        font-size: 10;
        content: '*';
      }
    }
  }
</style>
