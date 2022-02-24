import { IZTreeNode } from "../../ZTree";

export interface ITreeNode extends IZTreeNode {
  clickSelf?: boolean /** 默认false, true: 点击元素时只会取消或者勾选自身，false: 点击元素时会取消勾选自身以及子级 */;
}
