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
  import RenderWidgetVue from '@/widgets/render/render-widget.vue';
  import renderProvider from '@/widgets/render/render-provider.vue';

  const props = defineProps<{
    widgetList: FormWidget[];
  }>();

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
