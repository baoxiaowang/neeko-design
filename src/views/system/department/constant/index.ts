export interface BtnAction {
  key: string;
  title: string;
  status?: 'danger';
}

// eslint-disable-next-line no-shadow
export enum tabTypeEnum {
  dept = 'dept',
  role = 'role',
  member = 'member',
}

export const actionMap: Record<tabTypeEnum, BtnAction[]> = {
  [tabTypeEnum.dept]: [
    {
      key: 'rename',
      title: '修改名称',
    },
    {
      key: 'set_manager',
      title: '设置主管',
    },
    {
      key: 'set_parent_dept',
      title: '设置上级部门',
    },
    {
      key: 'add_child',
      title: '添加子部门',
    },
    {
      key: 'delete_dept',
      title: '删除',
      status: 'danger',
    },
  ],
  [tabTypeEnum.role]: [],
  [tabTypeEnum.member]: [],
};

export const originTab = [
  // {
  //   key: tabTypeEnum.member,
  //   title: '成员',
  // },
  {
    key: tabTypeEnum.dept,
    title: '部门',
  },
  {
    key: tabTypeEnum.role,
    title: '角色',
  },
];

export const memberColumn = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];
