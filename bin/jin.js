#!/usr/bin/env node

import Alphabet from "alphabetjs";
import { Command } from "commander";
import chalk from "chalk";
import { readFile } from "fs/promises";

const program = new Command();
const json = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url))
);

const title = Alphabet("Jin", "stereo");

program.addHelpText("beforeAll", chalk.greenBright(title));

program
  .usage("[options]/[command] 项目名")
  .description("vue3项目脚手架")
  .version(json.version)
  .command("create", "创建项目")
  .parse(process.argv);
