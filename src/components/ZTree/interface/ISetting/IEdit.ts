interface IDrag {
    autoExpandTrigger?: boolean;
    isCopy?: boolean;
    isMove?: boolean;
    prev?: boolean;
    next?: boolean;
    inner?: boolean;
    borderMax?: number;
    borderMin?: number;
    minMoveSize?: number;
    maxShowNodeNum?: number;
    autoOpenTime?: number;
}
export interface IEdit {
    drag: IDrag;
    editNameSelectAll?: boolean;
    enable?: boolean;
    removeTitle?: string;
    renameTitle?: string;
    showRemoveBtn?: boolean;
    showRenameBtn?: boolean;
}
