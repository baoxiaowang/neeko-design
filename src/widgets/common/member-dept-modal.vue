<template>
  <a-modal
    v-model:visible="modelVisible"
    width="600"
    :title="modalTitle"
    title-align="start"
    class="member-dept-modal"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div>
      <div class="top-tag__block">
        <a-input-tag
          v-model="tagValue"
          size="large"
          :style="{ width: '100%' }"
          placeholder="请选择"
          allow-clear
        />
      </div>
      <div class="dept-tree-block">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="组织架构">
            <div class="tab-pane__wrap">
              <div class="dept-tree-wrap">
                <!-- action-on-node-click="expand" -->
                <a-tree
                  ref="treeRef"
                  v-model:selected-keys="selectedKeys"
                  size="small"
                  class="dept-tree"
                  :default-expanded-keys="['0']"
                  :field-names="{
                    key: 'id',
                    title: 'name',
                  }"
                  block-node
                  :data="deptTreeData"
                >
                  <template #extra="nodeData">
                    <div v-if="type === 'dept'" class="dept-tree__extra">
                      <a-radio
                        :model-value="!!selectDeptMap[nodeData.id]"
                        @click="clickDept(nodeData)"
                      ></a-radio>
                    </div>
                    <div
                      v-if="type === 'dept-multiple'"
                      class="dept-tree__extra"
                    >
                      <a-checkbox
                        :model-value="!!selectDeptMap[nodeData.id]"
                        @click="clickDept(nodeData, true)"
                      ></a-checkbox>
                    </div>
                  </template>
                </a-tree>
              </div>

              <!-- // 成员单选-多选 -->
              <div
                v-if="type === 'member' || type === 'member-multiple'"
                class="dept-member-list"
              >
                <a-empty
                  v-if="memberList.length === 0"
                  class="dept-member-lits__empty"
                />
                <div
                  v-for="item in memberList"
                  :key="item.id"
                  class="dept-member-lits-item"
                >
                  <span>{{ item.userName }}</span>
                  <a-radio
                    v-if="type === 'member'"
                    :model-value="!!selectMemberMap[item.id]"
                    @click="clickMember(item)"
                  />
                  <a-checkbox
                    v-if="type === 'member-multiple'"
                    :model-value="!!selectMemberMap[item.id]"
                    @click="clickMember(item, true)"
                  />
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" title="当前登录用户"> 当前登录 </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts" name="member-dept-model">
  import { getAllDept, DeptModel } from '@/api/dept';
  import { getMemberByPage } from '@/api/member';
  import { useUserStore } from '@/store';
  import { computed, onBeforeMount, ref, watch, watchEffect } from 'vue';

  const userStore = useUserStore();

  const titleMap = {
    'member': '成员单选',
    'member-multiple': '成员多选',
    'dept': '部门单选',
    'dept-multiple': '部门多选',
  };
  const props = withDefaults(
    defineProps<{
      visible: boolean;
      defaultValue: string[];
      type?: 'member' | 'member-multiple' | 'dept' | 'dept-multiple';
    }>(),
    {
      type: 'member',
      defaultValue: () => [],
    }
  );
  const emit = defineEmits<{
    (e: 'update:visible', d: boolean): void;
    (e: 'ok', d: any): void;
  }>();
  const selectDeptMap = ref<Record<string, boolean>>({});
  const selectMemberMap = ref<Record<string, boolean>>({});
  const selectedKeys = ref(['0']);
  const modalTitle = computed(() => {
    return titleMap[props.type] || '';
  });

  watch(
    () => props.visible,
    (val: boolean) => {
      if (val) {
        if (['member', 'member-multiple'].includes(props.type)) {
          selectMemberMap.value = props.defaultValue.reduce(
            (a, b) =>
              Object.assign(a, {
                [b]: true,
              }),
            {}
          );
        } else {
          selectDeptMap.value = props.defaultValue.reduce(
            (a, b) =>
              Object.assign(a, {
                [b]: true,
              }),
            {}
          );
        }
      }
    }
  );
  const modelVisible = computed({
    get() {
      return props.visible;
    },
    set(d: boolean) {
      emit('update:visible', d);
    },
  });
  const memberList = ref<any[]>([]);
  watchEffect(() => {
    const [deptId = 0] = selectedKeys.value;
    getMemberByPage({
      deptId,
    }).then((res) => {
      memberList.value = res.data;
    });
  });
  function clickDept(node: any, multiple = false) {
    if (multiple) {
      selectDeptMap.value = {
        ...selectDeptMap.value,
        [node.id]: !selectDeptMap.value[node.id],
      };
    } else {
      selectDeptMap.value = {
        [node.id]: !selectDeptMap.value[node.id],
      };
    }
  }

  function handleOk() {
    const deptIds = Object.keys(selectDeptMap.value);
    const memberIds = Object.keys(selectMemberMap.value);
    if (props.type === 'member' || props.type === 'member-multiple') {
      emit('ok', memberIds);
    } else {
      emit('ok', deptIds);
    }
  }
  function handleCancel() {
    modelVisible.value = false;
  }
  function clickMember(item: any, multiple = false) {
    const old = selectMemberMap.value[item.id];
    if (multiple) {
      selectMemberMap.value = {
        ...selectMemberMap.value,
        [item.id]: !old,
      };
    } else {
      selectMemberMap.value = {
        [item.id]: !old,
      };
    }
  }

  const tagValue = computed({
    get() {
      if (['member', 'member-multiple'].includes(props.type)) {
        return Object.keys(selectMemberMap.value).map((id) => {
          return window.globalData.memberCacheMap[id]?.userName || id;
        });
      }
      if (['dept', 'dept-multiple'].includes(props.type)) {
        return Object.keys(selectDeptMap.value).map((id) => {
          if (id === '0') {
            return userStore.companyName;
          }
          return window.globalData.deptCacheMap[id]?.name || id;
        });
      }
      return [];
    },
    set(val: any) {
      if (['member', 'member-multiple'].includes(props.type)) {
        selectMemberMap.value = val.reduce(
          (a: Record<string, boolean>, b: string) => ({ [b]: true }),
          {}
        );
      }
    },
  });
  const deptList = ref([]);
  const deptTreeData = computed(() => {
    return [
      {
        name: userStore.companyName,
        id: '0',
        children: deptList.value,
      },
    ];
  });
  onBeforeMount(async () => {
    const { data } = await getAllDept();
    // const { data } = await getAllDeptTree();
    const treeData = data.reduce(
      (p: DeptModel[], b: DeptModel, _index: number, list: DeptModel[]) => {
        if (b.parentId === '0' || !b.parentId) {
          p.push(b);
          return p;
        }
        list.some((item: DeptModel) => {
          if (b.parentId?.toString() === item.id?.toString()) {
            item.children = item.children ? item.children.concat(b) : [b];
            return true;
          }
          return false;
        });
        return p;
      },
      []
    );
    deptList.value = treeData;
  });
</script>

<style lang="less">
  .member-dept-modal {
    .arco-modal-header {
      border-bottom: 1px solid var(--color-neutral-3);
    }

    .dept-tree-block {
      height: 321px;
      border: 1px solid var(--color-neutral-3);
    }

    .top-tag__block {
      margin-bottom: 10px;
    }

    .arco-modal-body {
      padding-top: 12px;
      padding-bottom: 0;
    }

    .tab-pane__wrap {
      display: flex;
    }

    .dept-tree-wrap {
      flex: 1;
      align-items: stretch;
      padding: 8px;
    }

    .dept-member-list {
      width: 200px;
      height: 280px;
      padding: 8px;
      border-left: 1px solid var(--color-neutral-3);
    }

    .arco-tabs-content {
      padding: 0;
    }

    .dept-tree__extra {
      position: absolute;
      top: 5px;
      right: 6px;
    }

    .dept-member-lits-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 28px;
      padding: 0 6px;

      &:hover {
        color: rgb(var(--primary-6));
        background-color: var(--color-fill-2);
      }
    }
  }
</style>
