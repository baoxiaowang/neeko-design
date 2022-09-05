<template>
  <div class="form-data-modal__content">
    <el-scrollbar>
      <renderProvider v-if="firstForm" :meta="{}" mode="runtime">
        <FormWidgerRender
          ref="rootWidget"
          :meta="{}"
          :state="{}"
          :node="firstForm"
        >
        </FormWidgerRender>
      </renderProvider>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="FormDataModal">
  import { FormWidget } from '@/widgets/types';
  import RenderWidgetVue from '@/widgets/render/render-widget.vue';
  import renderProvider from '@/widgets/render/render-provider.vue';
  import { computed, ref } from 'vue';

  import WidgetRenderConfig from '@/widgets/render.index';
  import { getRenderWidget } from '@/widgets/render';

  const FormWidgerRender = getRenderWidget({
    type: 'form',
  });
  const props = defineProps<{
    widgetList: FormWidget[];
  }>();

  const firstForm = computed(() => {
    return props.widgetList[0];
  });
  const rootWidget = ref<any>();
  defineExpose({
    rootWidget,
    validate() {},
  });
</script>

<style lang="less">
  .index {
  }
</style>
