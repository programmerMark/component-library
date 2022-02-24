import { ISetting } from "../ZTree/interface";

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
