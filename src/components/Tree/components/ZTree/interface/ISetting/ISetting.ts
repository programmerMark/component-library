import { IAsync } from './IAsync';
import { ICallback } from './ICallback';
import { ICheck } from './ICheck';
import { IData } from './IData';
import { IEdit } from './IEdit';
import { IView } from './IView';

export interface ISetting {
    treeId?: string;
    treeObj?: any;
    async?: IAsync;
    callback?: ICallback;
    check?: ICheck;
    data?: IData;
    edit?: IEdit;
    view?: IView;
}
