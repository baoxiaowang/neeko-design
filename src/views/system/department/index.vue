<template>
  <a-layout class="department-page">
    <a-affix v-if="navbar">
      <div class="layout-navbar">
        <NavBar title="通讯录"></NavBar>
      </div>
    </a-affix>
    <a-layout class="department__body">
      <div class="department-wrap">
        <div class="left-menu">
          <LeftMenu v-model:tab="tabVal" :dept-list="deptList">
            <template #member>
              <div
                :class="{
                  'member-block--active':
                    selectedKeys.length === 0 &&
                    selectMemberBlock.includes('all'),
                }"
                class="member-block all-member"
                @click="changeMemberType('all')"
              >
                <icon-user />
                全部成员
              </div>
              <div
                :class="{
                  'member-block--active':
                    selectMemberBlock.includes('resigned') &&
                    selectedKeys.length === 0,
                }"
                class="member-block resigned-member"
                @click="changeMemberType('resigned')"
              >
                <icon-user />
                离职成员
              </div>
            </template>
            <template #dept>
              <!-- :default-expanded-keys="defaultExpandedKeys" -->
              <a-tree
                ref="treeRef"
                v-model:selected-keys="selectedKeys"
                v-model:expanded-keys="expandedKeys"
                size="large"
                class="dept-tree"
                :field-names="{
                  key: 'id',
                  title: 'name',
                }"
                block-node
                :data="treeData"
              >
                <template #extra="nodeData">
                  <a-dropdown @select="handleSelect">
                    <icon-more-vertical
                      stroke-width="4"
                      class="dropdow-icon"
                      @click="() => nodeData"
                    />
                    <template #content>
                      <a-doption
                        v-for="action in topActions"
                        :key="action.key"
                        :value="action.key"
                      >
                        {{ action.title }}
                      </a-doption>
                    </template>
                  </a-dropdown>
                </template>
              </a-tree>
            </template>
          </LeftMenu>
        </div>
        <div class="right-content">
          <div class="right-content__action">
            <div>{{ selectTreeNode?.name }}</div>
            <div>
              <a-button-group>
                <template
                  v-for="(action, index) in topActions"
                  :key="action.key"
                >
                  <a-divider
                    v-if="index !== 0"
                    :margin="4"
                    direction="vertical"
                  />
                  <a-button
                    size="small"
                    type="text"
                    :status="action.status"
                    @click="handlerAction(action.key)"
                  >
                    {{ action.title }}
                  </a-button>
                </template>
              </a-button-group>
            </div>
          </div>
          <div class="right-content__btn-group">
            <a-button type="primary" @click="addMember">邀请成员</a-button>
          </div>
          <div class="right-content__table">
            <a-table :columns="memberColumn" :data="memberList" />
          </div>
        </div>
      </div>
    </a-layout>
  </a-layout>
  <a-modal
    v-model:visible="visible"
    width="460px"
    title-align="start"
    class="member-from__modal"
    @ok="handleAddMemberOk"
    @cancel="handleCancel"
  >
    <template #title>邀请成员</template>
    <div class="member-from__modal-content">
      <a-tabs type="rounded" justify>
        <a-tab-pane key="1" title="手动邀请">
          <MemberForm v-model:value="currentMember"></MemberForm>
        </a-tab-pane>
        <a-tab-pane key="2" title="链接邀请"> 链接邀请 </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>

<script setup lang="ts" name="department">
  import NavBar from '@/components/navbar/index.vue';
  import { Modal, Input } from '@arco-design/web-vue';
  import { useAppStore, useUserStore } from '@/store';
  import { computed, h, onBeforeMount, ref, watchEffect } from 'vue';
  import { createDept, getAllDeptTree } from '@/api/dept';
  import { createMember, getMemberByPage } from '@/api/member';
  import { MemberModel } from '@/types/global';
  import LeftMenu from './components/left-menu.vue';
  import { tabTypeEnum, actionMap, memberColumn } from './constant';
  import MemberForm from './components/member-form.vue';

  type memberType = 'all' | 'resigned';
  const appStore = useAppStore();
  const userStore = useUserStore();
  const navbar = computed(() => appStore.navbar);
  const tabVal = ref<tabTypeEnum>(tabTypeEnum.dept);
  const memberList = ref<any[]>([]);
  const visible = ref<boolean>(false);
  const currentMember = ref<MemberModel>({
    id: '',
    name: '',
    jobNum: '',
    phone: '',
    dept: [],
  });

  const topActions = computed(() => {
    return actionMap[tabVal.value] || [];
  });
  const itemDeptName = ref('');
  const deptList = ref([]);
  const selectedKeys = ref([]);
  const expandedKeys = ref(['0']);
  const deptNameIptRef = ref();
  const treeRef = ref('deptTree');
  const treeData = computed(() => {
    return [
      {
        name: userStore.companyName,
        _id: '0',
        id: '0',
        children: deptList.value,
      },
    ];
  });
  const selectTreeNode = computed(() => {
    if (selectedKeys.value.length) {
      const selectNodes = (treeRef.value as any)?.getSelectedNodes();
      return selectNodes && selectNodes[0];
    }
    return null;
  });
  const selectMemberType = ref<memberType>('all');
  const selectMemberBlock = computed<string[]>({
    get() {
      return [selectMemberType.value];
    },
    set(val: any) {
      selectMemberType.value = val;
    },
  });
  function changeMemberType(type: memberType) {
    selectMemberType.value = type;
    selectedKeys.value = [];
  }
  function handlerAction(key: string) {
    switch (key) {
      case 'add_child':
        Modal.open({
          width: '440px',
          alignCenter: false,
          titleAlign: 'start',
          top: 'calc(40vh - 100px)',
          mask: true,
          title: '添加子部门',
          content() {
            return h(Input, {
              'ref': deptNameIptRef,
              'placeholder': '请输入部门名称',
              'modelValue': itemDeptName.value,
              'onUpdate:modelValue': (e: string) => {
                itemDeptName.value = e;
              },
            });
          },
          onOpen() {
            console.log(deptNameIptRef.value);
            deptNameIptRef.value?.focus();
          },
          async onOk() {
            const [itemDept] = selectedKeys.value;
            await createDept({
              deptName: itemDeptName.value,
              parentDeptId: itemDept || '0',
            });
            const treeList = await getAllDeptTree();
            deptList.value = treeList;
          },
        });
        break;

      default:
        break;
    }
  }
  function handleSelect() {
    //
  }

  function addMember() {
    //
    visible.value = true;
  }
  function handleAddMemberOk() {
    //
    createMember({
      ...currentMember.value,
    }).then(() => {
      debugger;
    });
  }
  function handleCancel() {
    //
  }
  watchEffect(() => {
    const [deptId = 0] = selectedKeys.value;
    getMemberByPage({
      deptId,
    }).then((res) => {
      memberList.value = res.data;
    });
  });
  onBeforeMount(async () => {
    const data = await getAllDeptTree();
    deptList.value = data;
  });
</script>

<style lang="less">
  .department-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .department__body {
    display: flex;
    flex: 1;
    align-items: center;
    width: 100%;
    // max-width: 1580px;
    margin: 0 auto;
    padding: 20px;
    background: var(--color-neutral-2);
  }

  .department-wrap {
    display: flex;
    flex: 1;
    width: 100%;
    min-width: 1278px;
    max-width: 1580px;
    max-height: 715px;
    background-color: var(--color-bg-1);
    border: 1px solid var(--color-neutral-2);
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 5%);

    .left-menu {
      width: 250px;
      height: 100%;
      background-color: #fff; // var(--color-neutral-1);
      border-right: 1px solid var(--color-neutral-2);

      .arco-tree-node-switcher-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 32px;
      }
    }

    .right-content {
      flex: 1;
      // background-color: skyblue;
    }

    .right-content__btn-group {
      display: flex;
      align-items: center;
      padding: 12px 20px;
    }

    .right-content__table {
      padding: 0 20px;
    }

    .right-content__action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 0 20px;
      border-bottom: 1px solid var(--color-neutral-3);

      .arco-btn {
        padding: 0 6px;
      }
    }

    .dropdown-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      color: #3370ff;
      font-size: 14px;
    }
  }

  .member-from__modal {
    .member-from__modal-content {
      min-height: 352px;
    }

    .arco-modal-header {
      border-bottom: 1px solid var(--color-neutral-3);
    }

    .arco-modal-body {
      padding-top: 20px;
    }

    .arco-tabs-nav-tab {
      justify-content: center;
    }
  }
</style>
