import { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getAllPosts } from '@lib/contentful/exportContent/postList';
import CreatePostListProps from '@lib/createProps/createPostListProps';
import { setSiteMap } from '@lib/setSitemap';

const Loading = (
  <div>
    Loading...
    <CircularProgress />
  </div>
);
const Layout = dynamic(() => import('@layout/layout'), {
  loading: () => Loading,
});
// Template
const Temp_PostList = dynamic(() => import('@template/temp_postList'), {
  loading: () => Loading,
});
//import Layout from '@layout/layout';

const POST_PER_LISTPAGE = 6;

const TopPage: NextPage<{ posts: Template.postList.props }> = (props) => {
  {
    /*  const dispatch = useDispatch();
  useEffect(() => {
    PageInit(dispatch);
  }, []);*/
  }
  const TemplateTag = (
    <Temp_PostList
      posts={props.posts.posts}
      currentPage={props.posts.currentPage}
      lastPage={props.posts.lastPage}
      pathBase={props.posts.pathBase}
    />
  );
  return <Layout>{TemplateTag}</Layout>;
};

export default TopPage;

export const getStaticProps: GetStaticProps = async () => {
  const allpost = await getAllPosts();
  // postList
  const postListProps = allpost
    ? await CreatePostListProps({
        allpost,
        per_page: POST_PER_LISTPAGE,
        slug: '/',
      })
    : null;

  // sitemap
  if (process.env.NODE_ENV === 'production') {
    await setSiteMap();
  }

  return {
    props: {
      posts: postListProps,
    },
  };
};
