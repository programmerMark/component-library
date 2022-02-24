interface IKeep {
    leaf?: string;
    parent?: string;
}
interface IKey {
    checked?: string;
    children?: string;
    isParent?: string;
    isHidden?: string;
    name?: string;
    title?: string;
    url?: string;
}
interface ISimpleData {
    enable?: boolean;
    idKey?: string;
    pIdKey?: string;
    rootPId?: string;
}
interface IRender {
    name?: string;
    title?: string;
}

export interface IData {
    keep?: IKeep;
    key?: IKey;
    simpleData?: ISimpleData;
    render?: IRender;
}
