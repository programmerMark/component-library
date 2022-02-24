import React, { memo, useEffect, useMemo, useRef, useState, useImperativeHandle } from 'react';
import $ from 'jquery';
import classNames from 'classnames';

import { IAsync, ICallback, ICheck, IData, IEdit, ISetting, IView } from './interface/ISetting';
import { IZTreeNode } from './interface/IZTreeNode';
import { ITreeObj } from './interface/ITreeObj';
import Id from './Id';
import './styles/metroStyle.css';
import './styles/tree.css';

declare global {
    interface Window {
        jQuery: typeof $;
    }
}

if (!window.jQuery) {
    window.jQuery = $;
}

require('@ztree/ztree_v3/js/jquery.ztree.all');

export interface ITreeProps {
    /** 自定义类名 */
    className?: string;
    /** 树数据 */
    treeNode: IZTreeNode | IZTreeNode[];
    /** 要更新的新的节点数据 */
    newNode?: IZTreeNode;
    /** setting中的async对象 */
    settingAsync?: IAsync;
    /** setting中的Callback对象 */
    settingCallback?: ICallback;
    /** setting中的Check对象 */
    settingCheck?: ICheck;
    /** setting中的Data对象 */
    settingData?: IData;
    /** setting中的Edit对象 */
    settingEdit?: IEdit;
    /** setting中的View对象 */
    settingView?: IView;
    /** treeNode被点中前触发 */
    beforeClick?: (treeId?: string, treeNode?: IZTreeNode, clickFlag?: number) => boolean;
    /** treeNode被选中前触发 */
    beforeCheck?: (treeId?: string, treeNode?: IZTreeNode) => boolean;
    /** treeNode被点中 */
    onClick?: (event?: any, treeId?: string, treeNode?: IZTreeNode, clickFlag?: number) => void;
    /** treeNode的checkbox被选中 */
    onCheck?: (event?: any, treeId?: string, treeNode?: IZTreeNode) => void;
    /** 用于捕获节点被展开的事件回调函数 */
    onExpand?: (event?: any, treeId?: string, treeNode?: IZTreeNode) => void;
    /** 用于捕获节点被折叠的事件回调函数 */
    onCollapse?: (event?: any, treeId?: string, treeNode?: IZTreeNode) => void;
    /** 初始化树 */
    onInit?: (obj: ITreeObj) => void;
    zTreeRef?: any;
}

export interface IZTreeRef {
    updateNode: (nodes: any[], checked: boolean) => void;
}

const Tree: React.FunctionComponent<ITreeProps> = ({
    className,
    treeNode,
    newNode,
    settingAsync,
    settingCallback,
    settingCheck,
    settingData,
    settingEdit,
    settingView,
    zTreeRef,
    onInit,
    beforeClick,
    beforeCheck,
    onClick,
    onCheck,
    onExpand,
    onCollapse
}) => {
    const treeRef = useRef<HTMLDivElement>(null);
    const [zTreeId] = useState(Id.increase());
    const [zTreeObj, setZTreeObj] = useState<ITreeObj>({});

    const newSettingCallback: ICallback = useMemo(() => {
        return {
            ...settingCallback,
            beforeClick,
            onClick,
            onCheck,
            onExpand,
            onCollapse,
            beforeCheck
        };
    }, [settingCallback, onClick, onCheck]);

    const setting: ISetting = useMemo(() => {
        return {
            async: settingAsync,
            callback: newSettingCallback,
            check: settingCheck,
            data: settingData,
            edit: settingEdit,
            view: settingView
        };
    }, [settingAsync, newSettingCallback, settingCheck, settingData, settingEdit, settingView]);

    const initTree = () => {
        let mTreeObj: any;
        if (treeRef && treeRef.current && setting && treeNode) {
            // console.log('tree init');
            mTreeObj = ($.fn as any).zTree?.init($(treeRef.current), setting, treeNode);
            setZTreeObj(mTreeObj);
            if (onInit) {
                onInit(mTreeObj);
            }
        }
    };

    /**
     * nodes: 节点数据，节点对象必须包含id字段
     * checked: 是否选中节点
     */
    const updateNode = (nodes: any[], checked: boolean) => {
        if (zTreeObj.transformToArray && zTreeObj.getNodes) {
            const allNodes = zTreeObj.transformToArray(zTreeObj.getNodes());
            /** 将外部传入的数据转换为内部完整节点 */
            const innerNodes = nodes.map((node) => allNodes.find((innerNode) => innerNode.id === node.id));
            if (nodes && nodes.length > 0 && (checked === true || checked === false)) {
                innerNodes.forEach((node) => {
                    if ((checked === true || checked === false) && zTreeObj.checkNode) {
                        zTreeObj.checkNode(node, checked, false, false);
                    }
                });
            }
        }
    };

    useImperativeHandle(zTreeRef, () => ({
        /** 暴露给外部的方法 */
        updateNode
    }));

    useEffect(() => {
        initTree();
    }, [treeRef, treeNode, settingAsync, settingCheck, settingData, settingEdit, settingView]);

    useEffect(() => {
        console.log(zTreeObj);
        if (newNode && zTreeObj && zTreeObj.updateNode) {
            zTreeObj.updateNode(newNode, true);
        }
    }, [newNode]);

    useEffect(() => {
        return () => {
            if (zTreeObj && zTreeObj.destroy) {
                zTreeObj.destroy(zTreeId);
            }
        };
    }, []);
    return <div className={classNames('ztree', className)} ref={treeRef} id={zTreeId} />;
};

const ZTree = memo(React.forwardRef((props: ITreeProps, ref) => <Tree {...props} zTreeRef={ref} />));

export { ZTree };
