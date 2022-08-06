<template>
  <div class="design-tools">
    <div class="design-menu-tool">
      <div
        v-for="t in tools"
        :key="t.type"
        :class="{ 'tool-item__active': activeTool === t.type }"
        :title="t.name"
        class="tool-item"
        @click="onClick(t)"
      >
        <svg-icon
          :name="activeTool === t.type ? t.icon.active : t.icon.default"
          size="20px"
          :color="activeTool === t.type ? '#FFF' : '#FFF'"
        />
      </div>
    </div>
    <div class="design-menu-panel">
      <el-scrollbar
        :view-style="{
          paddingBottom: '50px',
        }"
      >
        <WidgetsTree v-show="activeTool === 'tree'"></WidgetsTree>
        <WidgetsPanel v-show="activeTool === 'widget'"></WidgetsPanel>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts" name="DesignTool">
  import { computed, onMounted, ref } from 'vue';
  import { Tool } from '@/store/modules/design/types';
  import { useDesignStore } from '@/store';
  import WidgetsTree from './widgets-tree/index.vue';
  import WidgetsPanel from './widgets-panel/widgets-panel.vue';

  const store = useDesignStore();
  const tools = computed(() => store.tools);
  const activeTool = ref('');
  const onClick = (item: Tool) => {
    activeTool.value = item.type;
  };
  onMounted(() => {
    activeTool.value = tools.value[0]?.type;
  });
</script>

<style lang="less">
  @left-bg: var(--color-neutral-10);
  @select-bg: rgb(var(--arcoblue-6)); // #fb9337; //rgb(var(--orange-6));

  .design-tools {
    display: flex;
    width: 300px;
    height: 100%;

    .design-menu-tool {
      box-sizing: border-box;
      width: 56px;
      height: 100%;
      padding-top: 18px;
      // background-color: var(--color-neutral-10);
      // background-color: var(--color-neutral-1);
      background-color: @left-bg;
    }

    .tool-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin: 0 auto 8px;
      // background-color: var(--color-neutral-10);
      // background-color: var(--color-neutral-1);
      background-color: @left-bg;
      border-radius: 8px;
      cursor: pointer;
      transition: all 200ms ease-in-out;

      &:hover {
        background: rgba(255, 255, 255, 0.16);
      }

      &::before {
        transform: scaleY(0);
        transition: all 200ms ease-in-out;
        content: '';
      }

      &__active {
        background: rgba(255, 255, 255, 0.16);
        // background: rgba(var(--arcoblue-6), 0.1);
        &::before {
          position: absolute;
          top: 8px;
          left: -12px;
          height: 16px;
          border-left: 4px solid @select-bg;
          border-radius: 0 2px 2px 0;
          transform: scaleY(1);
          content: '';
          scale: 1;
        }
      }
    }

    .design-menu-panel {
      flex: 1;
      height: 100%;
      overflow: hidden;
      // overflow-y: auto;
      // padding-bottom: 30px;
      // box-sizing: border-box;
      // ::-webkit-scrollbar {
      //   display: none;
      //   width: 10px;
      //   background: transparent;
      // }
      // ::-webkit-scrollbar-thumb {
      //   background: var(--color-fill-3) content-box;
      //   border: 2px solid transparent;
      //   border-radius: 5px;
      // }
    }
  }
</style>
