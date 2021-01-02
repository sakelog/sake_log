declare type cfImg = 
[
  {
    file: {
      url: string,
    }
    fluid: any;
  }
] 

declare namespace pagination {
  declare type props = {
    numPages: number
    currentPage: number
    pathBase: string
  }
}
declare namespace PostList {
  declare type props = {
    pageContext: {
      limit: number;
      skip: number;
      numPages: number;
      currentPage: number;
    }
    data: {
      posts: {
        nodes: [
          {
            slug: string;
            title: string;
            date: string;
            update: string;
            description: string;
            category: {
              slug: string;
              name: string;
            }
            tags: [
              {
                slug: string;
                name: string;
              }
            ]
          }
        ]
      }
    }
  }

  declare type func = (props:props) => JSX.Element
}

declare namespace Post {
  declare type props = {
    pageContext: {
      slug:string;
      post: {
        slug: string;
        title: string;
      }
      previous: prevPost
      next: nextPost
    }
    data: {
      post: {
        title: string;
        category: {
          name: string;
          slug: string;
        }
        tags: [
          {
            name: string;
            slug: string;
          }
        ]
        body: {
          childMarkdownRemark: {
            html: string;
            tableOfContents: any;
          }
        }
      }
    }
  }

  declare type prevPost = {
    slug: string;
    title: string;
  }
  declare type nextPost = {
    slug: string;
    title: string;
  }

  declare type func = (props:props) => JSX.Element
}

declare namespace Category {
  declare type props = {
    pageContext: {
      limit: number;
      skip: number;
      numPages: number;
      currentPage: number;
      slug: string;
      pathBase: string;
      type: string;
    }
    data: {
      category: {
        slug: string;
        name: string;
      }
      tags: {
        slug: string;
        name: string;
      }
      catPosts: {
        totalCount: number;
        nodes: [
          {
            slug:string;
            title: string;
            description: string;
            date: string;
            update: sting;
            tags: [
              {
                name: string;
                slug: string;
              }
            ]
          }
        ]
      }
      tagsPosts: {
        totalCount: number;
        nodes: [
          {
            slug:string;
            title: string;
            description: string;
            date: string;
            update: sting;
            category: {
              name: string;
              slug: string;
            }
          }
        ]
      }
    }
  }

  declare type func = (props:props) => JSX.Element;
}

declare namespace Page {
  declare type props = {
    pageContext : {
      slug: string;
      page: {
        slug: string;
        title: string;
      }
    }
    data : {
      page: {
        title
        date
        update
        description
        body : {
          childMarkdownRemark :{
            html: string;
          }
        }
      }
    }
  }

  declare type func = (props:props) => JSX.Element
}

declare namespace MyLib {
  declare namespace remarkImage {
    declare type props = {
      src: string;
      alt: string;
      title: string;
      style: any;
      className: string;
    }
  }
}