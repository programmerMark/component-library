import React, { useMemo, useRef } from "react";
import { ZTree, IZTreeRef } from "@/components/ZTree";
import "./Tree.css";
import { ITreeNode } from "./interface";
import { ISetting } from "@/components/ZTree/interface";

export interface ITreeProps {
  /**
   * 是否多选，true: 多选，false：单选
   */
  multipleChoice?: boolean;
  /**
   * 树型节点数据
   */
  nodes: ITreeNode[];
  /**
   * 更新节点数据
   */
  updateNodes: (id: string[], checked: boolean) => void;
  /**
   * 更新节点的展开状态
   */
  updateExpandNode: (id: string, open: boolean) => void;
}

export const ZTreeConfigs: ISetting = {
  check: {
    enable: true,
    chkStyle: "checkbox", // "checkbox" | "radio"
    chkboxType: { Y: "", N: "" },
  },
  view: {
    dblClickExpand: false,
    showIcon: false,
    showLine: false,
    showTitle: false,
    nameIsHTML: true,
  },
  data: {
    simpleData: {
      enable: true,
    },
  },
};

export const Tree: React.FC<ITreeProps> = (props) => {
  const {
    multipleChoice = true,
    nodes = [],
    updateNodes,
    updateExpandNode,
  } = props;
  const treeRef = useRef<IZTreeRef>(null);

  const treeNodes = useMemo(() => {
    return nodes.map((node) => {
      if (node.clickSelf === undefined) {
        return {
          ...node,
          clickSelf: false,
        };
      } else {
        return {
          ...node,
          clickSelf: true,
        };
      }
    });
  }, [nodes]);

  /**
   * 存储选中后的子级id
   */
  let childrenKey: string[] = [];

  /**
   * 递归数组，并将数组元素指定的属性存入数组childrenKey
   * @param children 数组
   * @param key 被设置的键名
   */
  function recursiveDataByKey(children: ITreeNode[], key: string) {
    children.forEach((item) => {
      childrenKey.push(item[key] as never);
      if (item.children && item.children.length > 0) {
        recursiveDataByKey(item.children, key);
      }
    });
  }

  /**
   * 处理节点数组，将节点数组的checked都设置为传入的值
   * @param node 节点数组
   * @param checked 是否选中，true: 选中，false：不选中
   */
  function handleTreeNode(node: ITreeNode) {
    const { children } = node;
    let childIds: string[] = [];
    if (children && children.length > 0) {
      // 子级全部选中
      childrenKey = [];
      recursiveDataByKey(children, "id");
      childIds = childrenKey;
    }
    return childIds;
  }

  const dataSetting = ZTreeConfigs.data;
  const checkSetting = useMemo(() => {
    const setting = ZTreeConfigs.check;
    if (setting) {
      setting.enable = multipleChoice;
    }
    return setting;
  }, [multipleChoice]);

  const viewSetting = ZTreeConfigs.view;

  const zTreeOnCheck = (
    _event?: any,
    _treeId?: string,
    treeNode?: ITreeNode
  ) => {
    if (multipleChoice && treeNode && treeNode.checked !== undefined) {
      const childIds = handleTreeNode(treeNode);
      const selectedIds = [treeNode.id, ...childIds];
      const nodeList = selectedIds.map((id) => {
        return { id };
      });
      treeRef?.current?.updateNode(nodeList, treeNode.checked);
      updateNodes(selectedIds, treeNode.checked);
    }
  };

  const zTreeOnClick = (
    _event?: any,
    _treeId?: string,
    treeNode?: ITreeNode,
    _clickFlag?: number
  ) => {
    if (treeNode && treeNode.checked !== undefined) {
      let selectedIds = [];
      if (multipleChoice) {
        if (!treeNode.clickSelf) {
          const childIds = handleTreeNode(treeNode);
          selectedIds = [treeNode.id, ...childIds];
        } else {
          selectedIds = [treeNode.id];
        }
        const nodeList = selectedIds.map((id) => {
          return { id };
        });
        treeRef?.current?.updateNode(nodeList, !treeNode.checked);
        updateNodes(selectedIds, treeNode.checked);
      } else {
        selectedIds = [treeNode.id];
        updateNodes(selectedIds, true);
      }
    }
  };
  const zTreeOnExpand = (
    _event?: any,
    _treeId?: string,
    treeNode?: ITreeNode
  ) => {
    if (treeNode && treeNode.open !== undefined) {
      updateExpandNode(treeNode.id, treeNode.open);
    }
  };
  const zTreeOnCollapse = (
    _event?: any,
    _treeId?: string,
    treeNode?: ITreeNode
  ) => {
    if (treeNode && treeNode.open !== undefined) {
      updateExpandNode(treeNode.id, treeNode.open);
    }
  };

  return (
    <div className="tree-wrap">
      {treeNodes && treeNodes.length > 0 && (
        <ZTree
          ref={treeRef}
          settingData={dataSetting}
          settingCheck={checkSetting}
          settingView={viewSetting}
          treeNode={treeNodes}
          onClick={zTreeOnClick}
          onCheck={zTreeOnCheck}
          onExpand={zTreeOnExpand}
          onCollapse={zTreeOnCollapse}
        />
      )}
    </div>
  );
};
