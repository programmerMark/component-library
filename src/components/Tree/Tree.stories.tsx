import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tree } from "./Tree";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "component-library/Tree",
  component: Tree,
} as ComponentMeta<typeof Tree>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tree> = (args) => <Tree {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  nodes: [
    {
      id: "10000",
      pId: undefined,
      name: "湖北省",
      checked: true,
      open: false,
    },
    {
      id: "10001",
      pId: "10000",
      name: "武汉市",
      checked: true,
      open: true,
      clickSelf: true /** 为true时，点击事件只会选中自身 */,
    },
    {
      id: "10010",
      pId: "10001",
      name: "汉口",
      checked: true,
      open: true,
    },
    {
      id: "10011",
      pId: "10001",
      name: "武昌",
      checked: true,
      open: true,
    },
    {
      id: "10012",
      pId: "10001",
      name: "汉阳",
      checked: true,
      open: true,
    },
    {
      id: "10002",
      pId: "10000",
      name: "孝感市",
      checked: true,
      open: true,
    },
    {
      id: "10020",
      pId: "10002",
      name: "云梦",
      checked: true,
      open: true,
    },
    {
      id: "10021",
      pId: "10002",
      name: "大悟",
      checked: true,
      open: true,
    },
    {
      id: "10022",
      pId: "10002",
      name: "应城",
      checked: true,
      open: true,
    },
  ],
  updateNodes: (ids: string[], checked: boolean) => {
    console.log(ids, checked);
  },
  updateExpandNode: (id: string, open: boolean) => {
    console.log(id, open);
  },
};
