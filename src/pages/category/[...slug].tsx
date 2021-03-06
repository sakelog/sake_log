import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import loadable from '@loadable/component';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  getAllCategory,
  getPostByCategory,
} from '@lib/contentful/exportContent/category';
import { getPostListNumPages, getPostListSlugs } from '@lib/getSlugs';
import { toKebabCase } from '@lib/toKebabCase';

import CreateCategoryProps from '@lib/createProps/createCategoryProps';

const Layout = loadable(() => import('@layout/layout'), {
  fallback: <CircularProgress color="secondary" />,
});
const Temp_CatTag = loadable(() => import('@template/temp_catTag'), {
  fallback: <CircularProgress color="secondary" />,
});

const POST_PER_LISTPAGE = 10;

const CategoryDirectory: NextPage<Template.catTagList.props> = (props) => {
  return (
    <Layout>
      <Temp_CatTag
        name={props.name}
        posts={props.posts}
        type={props.type}
        totalCount={props.totalCount}
        currentPage={props.currentPage}
        lastPage={props.lastPage}
        pathBase={props.pathBase}
      />
    </Layout>
  );
};

export default CategoryDirectory;

export const getStaticProps: GetStaticProps = async (context) => {
  const allcategory = await getAllCategory();
  const slug = context.params ? context.params.slug : '';

  const categoryProps =
    allcategory && (typeof slug === 'string' || Array.isArray(slug))
      ? await CreateCategoryProps({
          allcategory,
          slug,
          per_page: POST_PER_LISTPAGE,
        })
      : {
          name: '',
          posts: null,
          type: 'category',
          totalCount: 0,
          currentPage: 0,
          lastPage: 0,
          pathBase: '',
        };

  return {
    props: categoryProps,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategory = await getAllCategory();

  const allSlugs = [];

  if (allCategory) {
    for (let index = 0; index < allCategory.length; index++) {
      const targetPost = await getPostByCategory({
        id: allCategory[index].sys.id,
      });
      targetPost &&
        targetPost.length > 0 &&
        allSlugs.push([toKebabCase(allCategory[index].fields.slug)]);
      const ListNum = getPostListNumPages({
        posts: targetPost,
        per_page: POST_PER_LISTPAGE,
      });
      const ListSlugs = getPostListSlugs(ListNum);
      ListSlugs &&
        ListSlugs.map((slug) => {
          allSlugs.push([toKebabCase(allCategory[index].fields.slug), slug]);
        });
    }
  }

  const paths = allSlugs.map((slug) => {
    return { params: { slug: slug } };
  });

  return { paths, fallback: false };
};
