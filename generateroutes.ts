import {promisify} from "util"
import {resolve} from "path"
import fs from "fs"
import afs from "node:fs/promises"
import {default as matter} from "gray-matter"
import { groupBy } from "./ts/utils/oneoffs"
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

interface PostFile {
  name: string;
  route: string;
  metadata: any;
}

interface PostRoute {
  elements: (PostRoute | PostFile)[]
}

const IGNORE: string[] = ["node_modules", ".git", ".obsidian"];
const extension = /mdx?$/;

async function getFiles(dir: string) {
  if(IGNORE.some((e) => dir.endsWith(e))) return null;
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : extension.test(res) ? res : null;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

const getFilteredFiles = async(): Promise<any[]> => {
  return [...await getFiles(".")].filter(e => e !== null);
}

const readFile = async(name: string): Promise<string> => {
  return  await afs.readFile(name, {encoding: "utf-8"});
}


const main = async() => {
  const f: string[] = await getFilteredFiles(); // get the mdx files
  console.log(await readFile(f[0]));
  const allFiles = await Promise.all(f.map(async(e) => ({
    route: e,
    fileContent: await readFile(e)
  })));
  const frontMatter: PostFile[] = allFiles.map(e => {
    const m = matter(e.fileContent)
    return {
      name: e.route.replace("/Users/lucasdepaola/posts", ""), // use relative
      route: e.route.replace("/Users/lucasdepaola/posts", "").split("/").slice(0, -1).join(""),
      metadata: m.data
    }
  });
  const groupedByRoute = frontMatter.reduce((prev, cv) => { // TODO move to utils
    // const current = {[cv.route]: cv};
    prev[cv.route] = prev[cv.route] || [];
    prev[cv.route].push(cv);
    return prev;
  }, {});
  console.log(groupedByRoute);

  const jsGroupBy = groupBy(frontMatter, "route");
  fs.writeFile("./routedata.json", JSON.stringify(jsGroupBy, null, 2), () => {});
}
main()

const file: string = "https://raw.githubusercontent.com/lucasjdepaola/mdx-posts/main/routedata.json"
// https://raw.githubusercontent.com/lucasjdepaola/mdx-posts/main/obs.vimrc

