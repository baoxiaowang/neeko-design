<template>
  <div class="widget-item-card">
    <div class="widget-item-icon">
      <svg-icon :name="icon" size="24px" color="#000" />
    </div>
    <div class="widget-item-label">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts" name="widget-item-card">
  defineProps<{
    icon: string;
    label: string;
  }>();
</script>

<style lang="less">
  .widget-item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 60px;
    min-height: 60px;
    padding: 8px;
    background: transparent;
    border-radius: 4px;
    transition: all 200ms ease-in-out;

    &:hover {
      background: rgba(#000, 0.1);
    }
  }
</style>
