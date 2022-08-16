import inquirer from "inquirer";
import os from "os";

export default function (projectName) {
  return inquirer.prompt([
    {
      name: "projectName",
      message: "请输入项目名",
      default: projectName,
    },
    {
      name: "version",
      message: "项目版本",
      default: "0.1.0",
    },
    {
      name: "projectDescription",
      message: "项目简介",
      default: "待续",
    },
    {
      name: "author",
      message: "作者",
      default: os.userInfo().username,
    },
    {
      name: "branch",
      message: "选择项目技术栈方向",
      type: "list",
      choices: ["vue3-ts", "vue3", "nuxt3-ts", "nuxt3", "react-ts", "react"],
      default: 0,
    },
  ]);
}
