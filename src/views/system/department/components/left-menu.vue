<template>
  <div class="left-menu-wrap">
    <a-radio-group
      v-model="tabType"
      class="left-menu-wrap__tab"
      size="large"
      type="button"
    >
      <a-radio v-for="item in originTab" :key="item.key" :value="item.key">
        {{ item.title }}
      </a-radio>
    </a-radio-group>
    <div class="menu-tab__body">
      <template v-if="tabType === 'dept'">
        <div class="setting-block" data-title="员工">
          <slot name="member"></slot>
        </div>
        <div class="setting-block" data-title="部门">
          <slot name="dept"> </slot>
        </div>
      </template>
      <template v-else-if="tabType === 'role'">
        <div class="setting-block" data-title="角色"> </div>
      </template>

      <!-- 成员 -->
      <!-- <div class="setting-block" data-title="成员">
        <div class="member-block all-member"> 全部成员 </div>
        <div class="member-block resigned-member"> 离职成员 </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="left-menu">
  import { computed, onBeforeMount, ref } from 'vue';
  import { tabTypeEnum, originTab } from '../constant';

  const emit = defineEmits<{
    (e: 'update:tab', d: tabTypeEnum): void;
  }>();

  const props = defineProps<{
    tab: tabTypeEnum;
    deptList: any[];
  }>();

  const tabType = computed<tabTypeEnum>({
    get() {
      return props.tab;
    },
    set(val) {
      emit('update:tab', val);
    },
  });
</script>

<style lang="less">
  .left-menu-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .left-menu-wrap__tab {
    width: calc(100% - 30px);
    margin: 9px 15px;

    .arco-radio-button {
      flex: 1;

      .arco-radio-button-content {
        width: 100%;
        text-align: center;
      }
    }

    .arco-radio-group-button {
      display: flex;
    }

    .arco-radio-button {
      margin: 4px;
    }
  }

  .menu-tab__body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    .setting-block {
      width: 100%;

      &::before {
        height: 32px;
        padding-left: 15px;
        color: #91a1b7;
        font-size: 14px;
        line-height: 32px;
        content: attr(data-title);
      }
    }

    .member-block {
      display: block;
      width: 100%;
      max-width: none;
      height: 36px;
      padding: 0 20px;
      line-height: 36px;
      background: transparent;
      cursor: pointer;

      &:hover {
        background-color: rgba(var(--arcoblue-1), 0.3);
      }
    }

    .member-block--active {
      background-color: rgb(var(--arcoblue-1));
      box-shadow: inset 3px 0 rgb(var(--arcoblue-6));
    }

    .dept-tree {
      .arco-tree-node {
        padding: 0 12px;

        &:hover {
          background-color: rgba(var(--arcoblue-1), 0.3);
        }

        .arco-tree-node-title:hover {
          background-color: rgba(var(--arcoblue-1), 0.3);
        }
      }

      .arco-tree-node-selected {
        box-sizing: border-box;
        background-color: rgb(var(--arcoblue-1));
        box-shadow: inset 3px 0 rgb(var(--arcoblue-6));
        transition: all 0.1s;
      }
    }
  }
</style>
