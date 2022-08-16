import handlebars from "handlebars";
import metalsmith from "metalsmith";

/**
 * 描述
 * @date 2022-08-16
 * @param {any} metadata 元数据，替换的核心
 * @param {string} src 源地址
 * @param {string} dest 目标地址
 * @returns {any}
 */
export default async function (metadata, src, dest) {
  if (!src) {
    return Promise.reject(new Error("无效的源地址：" + src));
  }
  // 忽略的文件
  const ignoreFileExtensions = ["*.vue", "*.png", "**/*.ico", "*.svg"];
  return new Promise((resolve, reject) => {
    metalsmith(process.cwd())
      .ignore(ignoreFileExtensions)
      .metadata(metadata) // 初始化元数据
      .clean(false) // 不清空目标
      .source(src)
      .destination(dest)
      // 自定义插件是一个函数，收个参数是匹配的文件列表、实例本身、用于异步返回的 done 回调函数
      .use((files, metalsmith, done) => {
        // 再次读取元数据
        const meta = metalsmith.metadata();
        Object.keys(files).forEach((fileName) => {
          // 读取每一个文件名和内容、扩展名等等
          console.log("\n", fileName, "\n");
          const contentString = files[fileName].contents.toString();
          // 将每一个文件中的模板变量替换成meta数据
          files[fileName].contents = Buffer.from(
            handlebars.compile(contentString)(meta)
          );
        });
        done();
      })
      .build((err) => (err ? reject(err) : resolve()));
  });
}
