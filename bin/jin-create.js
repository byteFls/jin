#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import download from "../modules/download.js";
import generator from "../modules/generator.js";
import logSymbols from "log-symbols";
import ora from "ora";
import prompt from "../modules/prompt.js";

const program = new Command();

// 解析参数
program.parse(process.argv);
let projectName = program.args[0];

(async function () {
  let loadingSpinner = ora("初始化模板");
  try {
    // 收集数据
    console.log(logSymbols.info, chalk.cyan("初始化信息：\n"));
    const projectInfo = await prompt(projectName);
    // 下载模板
    loadingSpinner.start();
    const projectPath = `${process.cwd()}/${projectName}`;
    // 下载开始
    console.log("下载中...");
    await download(projectPath, projectInfo.branch, projectInfo.isAdmin);
    loadingSpinner.stop();

    // 生成文件
    loadingSpinner = ora("生成项目");
    loadingSpinner.start();
    await generator(projectInfo, projectPath, projectPath);
    loadingSpinner.stop();
    console.log(logSymbols.success, chalk.green("搞定🚀🚀🚀"));
  } catch (error) {
    console.log(logSymbols.error, chalk.red("error:" + error));
  } finally {
    loadingSpinner.stop();
  }
})();
