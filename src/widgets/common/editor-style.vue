<template>
  <div class="editor-style">
    <!-- <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="Layout" name="Layout">
      </el-collapse-item>
      <el-collapse-item title="Text" name="Text">
      </el-collapse-item>
      <el-collapse-item title="Appearance" name="Appearance">
      </el-collapse-item>
      <el-collapse-item title="Other" name="Other">
      </el-collapse-item>
    </el-collapse> -->
    <div class="switch-mode">
      <el-tag>基础模式</el-tag>
      <el-icon @click="switchMode">
        <Switch />
      </el-icon>
    </div>
    <transition name="el-zoom-in-top" mode="out-in">
      <!-- <el-tree v-if="editMode === 'default'" :highlight-current="false" :indent="16" :data="data"
        :expand-on-click-node="false" node-key="key" :props="defaultProps" :default-expanded-keys="defaultExpandedKeys"
        @node-click="handleNodeClick">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree> -->
      <CssEditor
        :value="styleCode"
        :delay="200"
        class="css-editor-warp"
        @update:value="codeChange"
      ></CssEditor>
    </transition>
    <!-- <transition name="el-zoom-in-bottom" mode="out-in">
      <div v-show="editMode === 'code'" >
        <CssEditor class="css-editor-warp"></CssEditor>
      </div>
    </transition> -->
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, toRaw } from 'vue';
  import CssEditor from '@/components/codemirror-editor/css-editor/index.vue';
  import { Widget } from '../types';
  import { styleObjToCode } from '../utils';

  const props = defineProps<{
    value: Widget;
  }>();
  const emit = defineEmits<{
    (e: 'update:value', c: string): void;
  }>();
  // const activeNames = ref(['1']);
  const editMode = ref<'default' | 'code'>('code');
  // const handleChange = (val: string[]) => {
  //   console.log(val);
  // };
  // interface Tree {
  //   label: string;
  //   key: string;
  //   children?: Tree[];
  // }

  // const handleNodeClick = (data: Tree) => {
  //   console.log(data);
  // };

  // const data: Tree[] = [
  //   {
  //     label: '布局',
  //     key: 'Layout',
  //     children: [
  //       {
  //         key: 'height',
  //         label: '高',
  //       },
  //       {
  //         key: 'width',
  //         label: '宽',
  //       },
  //       {
  //         label: '外边距',
  //         key: 'maring',
  //         children: [
  //           {
  //             key: 'margin-top',
  //             label: '上',
  //           },
  //           {
  //             key: 'margin-right',
  //             label: '右',
  //           },
  //           {
  //             key: 'margin-bottom',
  //             label: '下',
  //           },
  //           {
  //             key: 'margin-left',
  //             label: '左',
  //           },
  //         ],
  //       },
  //       {
  //         label: '内边距',
  //         key: 'padding',
  //         children: [
  //           {
  //             label: '上',
  //             key: 'padding-top',
  //           },
  //           {
  //             label: '右',
  //             key: 'padding-right',
  //           },
  //           {
  //             label: '下',
  //             key: 'padding-bottom',
  //           },
  //           {
  //             label: '左',
  //             key: 'padding-left',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     label: '文字',
  //     key: 'Text',
  //     children: [
  //       {
  //         label: '字体',
  //         key: 'font-family',
  //       },
  //       {
  //         label: '颜色',
  //         key: 'color',
  //       },
  //       {
  //         label: '字号',
  //         key: 'font-size',
  //       },
  //       {
  //         label: '字重',
  //         key: 'font-weight',
  //       },
  //       {
  //         label: '文字样式',
  //         key: 'font-style',
  //       },
  //       {
  //         label: '行高',
  //         key: 'line-height',
  //       },
  //     ],
  //   },
  //   {
  //     label: '外观',
  //     key: 'Appearance',
  //     children: [
  //       {
  //         label: '背景',
  //         key: 'background',
  //         children: [
  //           {
  //             label: '颜色',
  //             key: 'background-color',
  //           },
  //           {
  //             label: '图片',
  //             key: 'background-image',
  //           },
  //         ],
  //       },
  //       {
  //         key: 'border',
  //         label: '边框',
  //         children: [
  //           {
  //             label: '上',
  //             key: 'border-top',
  //             // children: [
  //             //   {
  //             //     label: '颜色',
  //             //     key: 'color',
  //             //   },
  //             //   {
  //             //     label: '线形',
  //             //     key: 'style',
  //             //   },
  //             //   {
  //             //     label: '颜色',
  //             //     key: 'width',
  //             //   },
  //             // ]
  //           },
  //           {
  //             label: '右',
  //             key: 'border-right',
  //             // children: [
  //             //   {
  //             //     label: '颜色',
  //             //     key: 'color',
  //             //   },
  //             //   {
  //             //     label: '样式',
  //             //     key: 'style',
  //             //   },
  //             //   {
  //             //     label: '颜色',
  //             //     key: 'width',
  //             //   },
  //             // ]
  //           },
  //           {
  //             label: '下',
  //             key: 'border-bottom',
  //             // children: [
  //             //   {
  //             //     label: '颜色',
  //             //     key: 'color',
  //             //   },
  //             //   {
  //             //     label: '样式',
  //             //     key: 'style',
  //             //   },
  //             //   {
  //             //     label: '颜色',
  //             //     key: 'width',
  //             //   },
  //             // ]
  //           },
  //           {
  //             key: 'border-left',
  //             label: '左',
  //             // children: [
  //             //   {
  //             //     label: '颜色',
  //             //     key: 'color',
  //             //   },
  //             //   {
  //             //     label: '样式',
  //             //     key: 'style',
  //             //   },
  //             //   {
  //             //     label: '颜色',
  //             //     key: 'width',
  //             //   },
  //             // ]
  //           },
  //         ],
  //       },
  //       {
  //         label: '圆角',
  //         key: 'border-radius',
  //         children: [
  //           {
  //             label: '左上',
  //             key: 'border-radius-top-left',
  //           },
  //           {
  //             label: '右上',
  //             key: 'border-radius-top-right',
  //           },
  //           {
  //             label: '左下',
  //             key: 'border-radius-bottom-left',
  //           },
  //           {
  //             label: '右下',
  //             key: 'border-radius-bottom-right',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   // {
  //   //   label: '动画',
  //   //   key: 'Animation',
  //   //   children: [
  //   //     {
  //   //       label: '时间',
  //   //       key: 'Level'
  //   //     },
  //   //     {
  //   //       label: '种类',
  //   //       key: 'Level two 3-2'
  //   //     },
  //   //   ],
  //   // },
  // ];

  const styleCode = computed<string>(() => {
    return styleObjToCode(toRaw(props.value?.codeStyle));
  });
  // const defaultProps = {
  //   children: 'children',
  //   label: 'label',
  // };
  // const defaultExpandedKeys = ['Layout', 'Text', 'Appearance', 'Animation'];

  const switchMode = () => {
    if (editMode.value === 'code') {
      editMode.value = 'default';
    } else {
      editMode.value = 'code';
    }
  };
  const codeChange = (s: string) => {
    emit('update:value', s);
  };
</script>

<style lang="less">
  .editor-style {
    .custom-tree-node {
      height: 38px;
      color: #000;
      font-weight: 600;
      font-size: 14px;
      line-height: 40px;
    }

    .switch-mode {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      padding: 2px 12px;
      font-weight: 600;
      font-size: 14px;
    }

    .css-editor-warp .CodeMirror {
      height: 500px;
    }
  }
</style>
