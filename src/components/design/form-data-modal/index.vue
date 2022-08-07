<template>
  <div class="form-data-modal__content">
    <el-scrollbar>
      <renderProvider :meta="{}" mode="runtime">
        <RenderWidgetVue
          v-for="item in widgetList"
          :key="item.key"
          :meta="{}"
          :state="{}"
          :node="item"
        >
        </RenderWidgetVue>
      </renderProvider>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="FormDataModal">
  import { FormWidget } from '@/widgets/types/index.js';
  import { computed } from 'vue';
  import RenderWidgetVue from '@/widgets/render/render-widget.vue';
  import renderProvider from '@/widgets/render/render-provider.vue';

  const props = defineProps<{
    visible: boolean;
    widgetList: FormWidget[];
  }>();
  const emit = defineEmits<{
    (e: 'ok'): void;
    (e: 'update:visible', d: boolean): void;
  }>();
  const show = computed({
    get() {
      return props.visible;
    },
    set(val: boolean) {
      emit('update:visible', val);
    },
  });
  function handleOk() {
    //
  }
  function handleCancel() {
    //
  }
</script>

<style lang="less">
  .index {
  }
</style>
