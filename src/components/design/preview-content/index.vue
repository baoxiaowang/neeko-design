<template>
  <div
    class="preview__wrap"
    :style="wrapStyle"
    :class="'preview__wrap--' + windowType"
  >
    <!-- <div class="preview-render-wrap"> -->
    <template v-if="pageType === PageTypeEnum.form">
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
    </template>
    <template v-else>
      <IframeContainer
        :show-frame="windowType === 'mobile'"
        :widgets="widgetList"
      />
    </template>

    <!-- </div> -->
  </div>

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
  import { ref, computed, onMounted, CSSProperties } from 'vue';
  // eslint-disable-next-line import/no-cycle
  import { useDesignStore } from '@/store';
  import RenderWidgetVue from '@/widgets/render/render-widget.vue';
  import { Button, Tooltip } from '@arco-design/web-vue';
  import { IconClose } from '@arco-design/web-vue/es/icon';
  import renderProvider from '@/widgets/render/render-provider.vue';
  import { WindowType } from '@/store/modules/design/types';
  import IframeContainer from 'src/components/iframe-container/index.vue';
  import { PageTypeEnum } from '@/api/page';

  const store = useDesignStore();
  const widgetList = computed(() => store.widgetList);
  const previewDialogShow = computed(() => store.previewDialogShow);
  const visible = ref<boolean>(false);
  const mode = computed(() => store);
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
  const props = defineProps<{
    windowType: WindowType;
    pageType?: PageTypeEnum;
  }>();
  const wrapStyle = ref<CSSProperties>({});
  onMounted(() => {
    if (props.windowType === 'mobile') {
      const windowHeight = window.innerHeight;
      wrapStyle.value = {
        zoom: Math.min(windowHeight / 862.5, 1),
      };
    }
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
    z-index: 9999;
  }

  .preview-render-wrap {
    position: relative;
    z-index: 99;
  }

  .design-model-body-page {
    height: 100%;
  }

  .preview__wrap {
    height: 100%;
    // &--mobile {
    //   height: 862.5px;
    //   width: 432px;
    //   margin: 0 auto;
    //   position: relative;
    //   background: #fff;
    //   padding: 26px 29px;
    // }
  }
</style>
