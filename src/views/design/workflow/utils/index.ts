import { uuidFn } from '@/widgets/utils';
import { FlowNode, FlowNodeType } from '../constant';

function createFlowUid(type: FlowNodeType): string {
  return `${type}_${uuidFn(4)}`;
}

export function getNodeIndex(list: FlowNode[], current: FlowNode) {
  let currentIndex: number | undefined;
  let nextNodeIndex: number | undefined;
  // 找到当前节点索引和 子节点的索引
  list.some((item, index) => {
    if (item.uid === current.uid) {
      currentIndex = index;
    }
    if (item.preUid === current.uid) {
      nextNodeIndex = index;
    }
    if (currentIndex !== undefined && nextNodeIndex !== undefined) {
      return true;
    }
    return false;
  });
  return [currentIndex, nextNodeIndex];
}
export function createFlowNode(
  type: FlowNodeType,
  option: Pick<FlowNode, 'preUid' | 'conditionId'>
): FlowNode {
  let defaultOption: Partial<FlowNode> = {};
  const uid = createFlowUid(type);
  if (type === 'condition') {
    defaultOption = {
      branchList: [
        {
          type: 'branch',
          uid: createFlowUid('branch'),
          data: {},
          preUid: uid,
          conditionId: uid,
        },
        {
          type: 'branch',
          uid: createFlowUid('branch'),
          data: {},
          preUid: uid,
          conditionId: uid,
        },
      ],
    };
  }
  return {
    data: {},
    uid,
    ...option,
    ...defaultOption,
    type,
  };
}

export function flowNodeAdd(
  nodeList: FlowNode[],
  current: FlowNode,
  type: FlowNodeType
) {
  const [_, nextNodeIndex] = getNodeIndex(nodeList, current);
  const newFlowNode = createFlowNode(type, {
    preUid: current.uid,
    conditionId: current.conditionId,
  });
  const newList = [...nodeList];
  if (nextNodeIndex !== undefined && nextNodeIndex > -1) {
    newList.splice(nextNodeIndex, 1, {
      ...nodeList[nextNodeIndex],
      preUid: newFlowNode.uid,
    });
  }
  newList.push(newFlowNode);
  return newList;
}

export function flowNodeDel(nodeList: FlowNode[], current: FlowNode) {
  const [currentIndex, nextIndex] = getNodeIndex(nodeList, current);
  const newList = [...nodeList];
  if (Number(currentIndex) > -1) {
    if (Number(nextIndex) > -1) {
      const next = nodeList[nextIndex!];
      newList.splice(nextIndex!, 1, {
        ...next,
        preUid: current.preUid,
      });
    }
    newList.splice(currentIndex!, 1);
  }
  return newList;
}

export function flowNodeAction(
  action: 'add' | 'del',
  nodeList: FlowNode[],
  current: FlowNode,
  type?: FlowNodeType
): FlowNode[] {
  switch (action) {
    case 'add':
      return flowNodeAdd(nodeList, current, type!);
    default:
      return nodeList;
  }
}
