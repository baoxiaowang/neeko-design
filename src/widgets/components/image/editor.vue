<template>
  <EditorLayout class="image-editor" :change="change" :value="value">
    <config-block required title="图片地址">
      <el-input
        :value="value?.config?.url"
        class="w-50 m-2"
        placeholder="Pick a date"
        @update:model-value="changeUrl"
      >
        <template #suffix>
          <el-icon class="input__link"><Link /></el-icon>
        </template>
      </el-input>
    </config-block>
  </EditorLayout>
</template>

<script setup lang="ts" name="ImageEditor">
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import EditorLayout from '@/widgets/common/form-editor-layout.vue';
  import { Widget } from '@/widgets/types';

  const props = defineProps<{
    value: Widget;
    change: (e: Partial<Widget>) => void;
  }>();
  function changeUrl(val: string) {
    props.change({
      url: val,
    });
  }
</script>

<style lang="less">
  .image-editor {
    .input__link {
      cursor: pointer;
    }
  }
</style>
