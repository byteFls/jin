import { SCAFFOlD_TEMPLATE_PREFIX } from "../config.js";
import download from "download-git-repo";

export default async function (projectPath, branch = "main", isAdmin = false) {
  /**
   * 根据项目类型，选择不同的模板(从不同的分支下载，默认分支为vue3-ts项目)
   */
  return new Promise((resolve, reject) => {
    download(
      SCAFFOlD_TEMPLATE_PREFIX + `#${branch}${isAdmin ? "-admin" : ""}`,
      projectPath,
      (err) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}
