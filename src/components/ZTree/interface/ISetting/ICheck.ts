export type ICheckType = 'p' | 's' | 'ps' | '';
export interface ICheckTypes {
    Y: ICheckType;
    N: ICheckType;
}
export interface ICheck {
    autoCheckTrigger?: boolean;
    chkboxType?: ICheckTypes;
    chkStyle?: 'checkbox' | 'radio';
    enable?: boolean;
    nocheckInherit?: boolean;
    chkDisabledInherit?: boolean;
    radioType?: 'level' | 'all';
}
