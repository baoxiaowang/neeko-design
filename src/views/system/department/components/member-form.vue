<template>
  <div class="member-form">
    <a-form auto-label-width :model="value">
      <a-form-item required label-col-flex="60px" field="name" label="姓名：">
        <a-input
          key="member-name"
          :model-value="value.name"
          placeholder="员工姓名"
          @update:model-value="(e: any) => changeForm('name', e)"
        />
      </a-form-item>
      <a-form-item label-col-flex="60px" field="jobNum" label="编号：">
        <a-input
          :model-value="value.jobNum"
          placeholder="员工编号，建议是工号"
          @update:model-value="(e: any) => changeForm('jobNum', e)"
        />
      </a-form-item>
      <a-form-item required label-col-flex="60px" field="phone" label="手机：">
        <a-input-group class="flex-expand">
          <div :style="{ width: '100px' }" class="flex flex-expand">
            <a-select
              :options="['+86']"
              :style="{ width: '100px' }"
              placeholder=""
              :model-value="'+86'"
            />
            <div class="flex-expand">
              <a-input
                :model-value="value.phone"
                placeholder="手机号必填"
                :style="{ width: '100%' }"
                @update:model-value="(e: any) => changeForm('phone', e)"
              >
              </a-input>
            </div>
          </div>
        </a-input-group>
      </a-form-item>
      <a-form-item label-col-flex="60px" field="email" label="邮箱：">
        <a-input
          :model-value="value.email"
          placeholder="员工邮箱"
          @update:model-value="(e: any) => changeForm('email', e)"
        />
      </a-form-item>
      <a-form-item label-col-flex="60px" field="dept" label="部门：">
        <DeptMultiple
          :value="value.dept"
          :node="deptNode"
          @update:value="(e: any) => changeForm('dept', e)"
        ></DeptMultiple>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="member-form">
  import { watchEffect } from 'vue';
  import DeptMultiple from 'src/widgets/components/dept-multiple/render.vue';
  import { InputWidget } from '@/widgets/types';
  import { MemberModel } from '@/types/global';

  const props = defineProps<{
    value: MemberModel;
  }>();
  const emit = defineEmits<{
    (e: 'update:value', d: MemberModel): void;
  }>();

  const deptNode: InputWidget = {
    type: 'dept-multiple',
    key: 'dept',
  };

  function changeForm(key: keyof MemberModel, val: any) {
    emit('update:value', {
      ...props.value,
      [key]: val,
    });
  }
  // const memberForm = reactive({
  //   name: '',
  //   jobNum: '',
  //   phone: '',
  //   dept: [],
  // });

  watchEffect(() => {
    // Object.assign(memberForm, props.value);
  });
</script>

<style lang="less">
  .member-form {
  }
</style>
