<template>
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

  <Tooltip v-if="previewDialogShow" content="点击退出预览" position="right">
    <Button
      status="normal"
      size="large"
      class="preview-close__btn"
      shape="circle"
      @click="onClose"
    >
      <IconClose></IconClose>
    </Button>
  </Tooltip>
</template>

<script setup lang="ts" name="preview-content">
  import { ref, computed, onMounted } from 'vue';
  // eslint-disable-next-line import/no-cycle
  import { useDesignStore } from '@/store';
  import RenderWidgetVue from '@/widgets/render/render-widget.vue';
  import { Button, Tooltip } from '@arco-design/web-vue';
  import { IconClose } from '@arco-design/web-vue/es/icon';
  import renderProvider from '@/widgets/render/render-provider.vue';

  const store = useDesignStore();
  const widgetList = computed(() => store.widgetList);
  const previewDialogShow = computed(() => store.previewDialogShow);
  const visible = ref<boolean>(false);
  const mode = computed(() => store);
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
  onMounted(() => {
    setTimeout(() => {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, 2000);
    }, 200);
  });
  function onClose() {
    emit('close');
  }
</script>

<style lang="less">
  .preview-close__btn {
    position: fixed;
    top: 20px;
    left: 20px;
    // background: #fff;
  }
</style>
