import { IZTreeNode } from '../IZTreeNode';

export interface ICallback {
    beforeAsync?: any;
    beforeCheck?: any;
    beforeClick?: any;
    beforeCollapse?: any;
    beforeDblClick?: any;
    beforeDrag?: any;
    beforeDragOpen?: any;
    beforeDrop?: any;
    beforeEditName?: any;
    beforeExpand?: any;
    beforeMouseDown?: any;
    beforeMouseUp?: any;
    beforeRemove?: any;
    beforeRename?: any;
    beforeRightClick?: any;
    onAsyncError?: any;
    onAsyncSuccess?: any;
    onCheck?: (event?: any, treeId?: string, treeNode?: IZTreeNode) => void;
    onClick?: (event?: any, treeId?: string, treeNode?: IZTreeNode, clickFlag?: number) => void;
    onCollapse?: (event?: any, treeId?: string, treeNode?: IZTreeNode) => void;
    onDblClick?: any;
    onDrag?: any;
    onDragMove?: any;
    onDrop?: any;
    onExpand?: (event?: any, treeId?: string, treeNode?: IZTreeNode) => void;
    onMouseDown?: any;
    onMouseUp?: any;
    onNodeCreated?: any;
    onRemove?: any;
    onRename?: any;
    onRightClick?: any;
}
