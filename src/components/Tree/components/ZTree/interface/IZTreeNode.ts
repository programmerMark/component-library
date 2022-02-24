/**
 * treeNode 节点数据详解
 */
export interface IZTreeNode {
    checked?: boolean;
    children?: IZTreeNode[];
    chkDisabled?: string;
    click?: string;
    getCheckStatus?: () => {};
    getIndex?: () => {};
    getNextNode?: () => {};
    getParentNode?: () => {};
    getPath?: () => {};
    getPreNode?: () => {};
    halfCheck?: string;
    icon?: string;
    iconClose?: string;
    iconOpen?: string;
    iconSkin?: string;
    isHidden?: string;
    isParent?: string;
    name?: string;
    nocheck?: boolean;
    open?: boolean;
    target?: string;
    url?: string;
    DIY?: string;
    check_Child_State?: string;
    check_Focus?: string;
    checkedOld?: string;
    editNameFlag?: string;
    isAjaxing?: string;
    isFirstNode?: string;
    isHover?: string;
    isLastNode?: string;
    level?: string;
    parentTId?: string;
    tId?: string;
    zAsync?: string;
    [key: string]: any;
}
