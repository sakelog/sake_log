import { getAllPosts } from './postList';
import { getAllPages } from './page';
import { getAllCategory, getPostByCategory } from './category';
import { getAllTags, getPostByTag } from './tag';

import {
  getConcatPath,
  getRootPath,
  getCategoryPath,
  getTagPath,
} from '@lib/getPath';

import config from '@component/config';

// Path取得
export const getURLSet = async (): Promise<sitemap.urlset> => {
  const allPosts = await getAllPosts();
  const allPages = await getAllPages();
  const allCategory = await getAllCategory();
  const allTags = await getAllTags();

  const postURLSet: sitemap.urlset = allPosts
    ? allPosts.map((post) => {
        const url = getConcatPath(config.url, getRootPath(post.fields.slug));
        const fetchDate = post.fields.update
          ? post.fields.update
          : post.fields.date;
        const priority = '1.0';
        return { url, fetchDate, priority };
      })
    : [];
  const pageURLSet: sitemap.urlset = allPages
    ? allPages.map((page) => {
        const url = getConcatPath(config.url, getRootPath(page.fields.slug));
        const fetchDate = page.fields.update
          ? page.fields.update
          : page.fields.date;
        const priority = '0.6';
        return { url, fetchDate, priority };
      })
    : [];
  const categoryURLSet: sitemap.urlset = [];
  if (allCategory) {
    for (let index = 0; index < allCategory.length; index++) {
      const url = getConcatPath(
        config.url,
        getCategoryPath(allCategory[index].fields.slug)
      );
      const posts = await getPostByCategory({ id: allCategory[index].sys.id });
      if (posts && posts.length === 0) {
        continue;
      }
      const fetchDate = posts ? posts[0].fields.date : '0000-00-00';
      const priority = '0.8';
      categoryURLSet.push({ url, fetchDate, priority });
    }
  }
  const tagsURLSet: sitemap.urlset = [];
  if (allTags) {
    for (let index = 0; index < allTags.length; index++) {
      const url = getConcatPath(
        config.url,
        getTagPath(allTags[index].fields.slug)
      );
      const posts = await getPostByTag({ id: allTags[index].sys.id });
      if (posts && posts.length === 0) {
        continue;
      }
      const fetchDate = posts ? posts[0].fields.date : '0000-00-00';
      const priority = '0.8';
      categoryURLSet.push({ url, fetchDate, priority });
    }
  }
  const allTagsURLSet: sitemap.urlset = [
    {
      url: getConcatPath(config.url, getRootPath('tags')),
      fetchDate: allTags ? allTags[0].sys.createdAt : '0000-00-00',
      priority: '0.4',
    },
  ];
  return postURLSet
    .concat(pageURLSet)
    .concat(categoryURLSet)
    .concat(tagsURLSet)
    .concat(allTagsURLSet);
};
