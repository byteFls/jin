import { SCAFFOlD_TEMPLATE_PREFIX } from "../config.js";
import download from "download-git-repo";

export default async function (projectPath, branch = "main") {
  /**
   * 根据项目类型，选择不同的模板(从不同的分支下载，默认分支为vue3-ts项目)
   */
  return new Promise((resolve, reject) => {
    download(
      SCAFFOlD_TEMPLATE_PREFIX + `#${branch === "vue3-ts" ? "main" : branch}`,
      projectPath,
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}
