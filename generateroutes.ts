interface PostFile {
  name: string;
  metadata: any;
}

interface PostRoute {
  elements: (PostRoute | PostFile)[]
}

const file: string = "https://raw.githubusercontent.com/lucasjdepaola/mdx-posts/main/routedata.json"
// https://raw.githubusercontent.com/lucasjdepaola/mdx-posts/main/obs.vimrc
