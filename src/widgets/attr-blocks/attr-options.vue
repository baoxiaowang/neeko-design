<template>
  <ConfigBlockVue label="选项" class="attr-options">
    <a-select
      :style="{ width: '100%', marginBottom: '8px' }"
      placeholder=""
      :model-value="optionType"
      @update:model-value="changeOptionType"
    >
      <a-option value="custom">自定义</a-option>
      <a-option value="link">关联其他字段</a-option>
      <a-option value="relation">数据联动</a-option>
    </a-select>
    <template v-if="optionType === 'link'">
      <a-cascader
        :options="linkWidgets"
        path-mode
        :style="{ width: '100%' }"
        placeholder="选择关联字段"
        allow-search
        :model-value="optionConfig?.optionLink"
        @update:model-value="changeOptionLink"
      />
    </template>
    <template v-else-if="optionType === 'relation'">
      <div class=""></div>
    </template>
    <template v-else>
      <VueDraggable
        v-model="options"
        class="options__draggable"
        tag="transition-group"
        item-key="index"
        :component-data="{ tag: 'div', name: 'flip-list', type: 'transition' }"
        ghost-class="options-item--ghost"
        chosen-class="options-item--chosen"
        handle=".attr-option__drag"
      >
        <template #item="{ index, element }">
          <div fill class="attr-option__item">
            <a-radio :model-value="element.defaultCheck" value="radio">
            </a-radio>
            <a-input v-model="element.label" class="attr-option__ipt"></a-input>
            <a-space :size="2">
              <a-button class="attr-option__drag" type="outline">
                <template #icon>
                  <icon-drag-dot-vertical />
                </template>
              </a-button>
              <a-button type="text" status="danger" @click="delOption(index)">
                <template #icon>
                  <icon-delete />
                </template>
              </a-button>
            </a-space>
          </div>
        </template>
      </VueDraggable>
      <div class="options__action" :size="2">
        <a-button size="mini" type="text" @click="addOption">添加选项</a-button>
        <a-divider direction="vertical" />
        <a-button size="mini" type="text">添加其他选项</a-button>
        <a-divider direction="vertical" />
        <a-button size="mini" type="text">批量添加</a-button>
      </div>
    </template>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-options">
  import { getAppLinkWidget } from '@/api/widgets';
  import VueDraggable from '@/components/vue-draggable/src/vuedraggable';
  import { computed, onBeforeMount, onMounted, ref, watchEffect } from 'vue';
  import ConfigBlockVue from '../common/config-block.vue';
  import { OptionWidget, WidgetOptionItem } from '../types';

  // defineProps<any>();
  const props = defineProps<{
    node: OptionWidget;
    change: (e: Partial<OptionWidget>) => void;
  }>();

  const optionType = computed(() => props.node.optionConfig?.optionType);
  const linkWidgets = ref<any[]>([]);

  const options = computed<WidgetOptionItem[]>({
    get() {
      return props.node.optionConfig?.options || [];
    },
    set(val) {
      props.change({
        optionConfig: {
          options: val,
        },
      });
    },
  });
  const optionConfig = computed(() => props.node.optionConfig);
  function delOption(index: number) {
    options.value.splice(index, index);
  }
  function addOption() {
    options.value.push({
      label: '选项',
      defaultCheck: 0,
    });
  }
  watchEffect(async () => {
    const { data } = await getAppLinkWidget();
    linkWidgets.value = data as any;
  });
  function changeOptionLink(val: any) {
    props.change({
      optionConfig: {
        ...optionConfig.value,
        optionLink: val,
      },
    });
  }
  function changeConfig(data: any) {
    props.change({
      optionConfig: {
        ...optionConfig.value,
        ...data,
      },
    });
  }
  function changeOptionType(type: any) {
    props.change({
      optionConfig: {
        options: [
          { defaultCheck: 0, label: '选项一' },
          { defaultCheck: 0, label: '选项二' },
          { defaultCheck: 0, label: '选项三' },
        ],
        ...optionConfig.value,
        optionType: type,
      },
    });
  }
</script>

<style lang="less">
  .attr-options {
    .options__action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      padding: 0 12px;

      .arco-btn {
        padding: 0 6px;
      }

      .arco-divider {
        margin: 0 4px;
      }
    }

    .flip-list-move {
      transition: transform 0.5s;
    }

    .no-move {
      transition: transform 0s;
    }

    .attr-option__drag {
      width: 22px;
      border-color: transparent !important;
      cursor: move;
    }

    .attr-option__item {
      display: flex;
      padding: 2px 0;
      border: 1px dashed transparent;

      &:first {
        margin-top: 0;
      }
    }

    .options__draggable {
      margin: 0;
      padding: 0;
    }

    .options-item--ghost {
      background-color: var(--color-neutral-1) !important;
      // box-shadow: inset 0 0 0 1px #f00;
      border: 1px dashed var(--color-neutral-6);

      & > * {
        opacity: 0;
      }
    }

    .options-item--chosen {
      background-color: #fff;
    }

    .attr-option__ipt {
      flex: 1;
      margin: 0 10px;
      margin-right: 4px;
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    background: #c8ebfb;
    opacity: 0.5;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }
</style>
