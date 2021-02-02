import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiTag } from 'react-icons/fi';
import state from '@state/ducks/index';

import { getCategoryPath, getTagPath } from '@lib/getPath';
import RenderTOC from '@lib/renderTOC';

import CustomHead from '@component/customHead';

import ArticleBody from '@component/postParts/articleBody';
import Share from '@component/postParts/share';
import Bio from '@component/postParts/bio/bio';
import PostDate from '@component/postDate';

import config from '@component/config';

import PrevNext from '@component/pagination/prevNext';
import BackToTop from '@component/pagination/backToTop';

import styles from '@styles/component/_c-post.module.scss';
import categoryStyles from '@styles/component/_c-category.module.scss';
import tagStyles from '@styles/component/_c-tagList.module.scss';

const Temp_Post: React.FC<Template.post.props> = (props) => {
  const windowSizeState = state.windowSizeState;
  const body = props.currentPost.fields.body;
  const category = props.currentPost.fields.category;
  const MIN_WIDTH = config.mediaQuery.md;
  const postCategory = (
    <ul className={styles.categoryList}>
      <li key="category-title">カテゴリー：</li>
      <li key={category.fields.slug} className={categoryStyles.category}>
        <h5>
          <Link href={getCategoryPath(category.fields.slug)}>
            {category.fields.name}
          </Link>
        </h5>
      </li>
    </ul>
  );
  const tagsList = props.currentPost.fields.tags.map((tag) => {
    return (
      <li key={tag.fields.slug}>
        <h6>
          <Link href={getTagPath(tag.fields.slug)}>
            <span className={tagStyles.tagListItem}>
              <span className={tagStyles.tagIcon}>
                <FiTag />
              </span>
              {tag.fields.name}
            </span>
          </Link>
        </h6>
      </li>
    );
  });
  const currentURL = config.url.slice(0, -1) + useRouter().asPath;
  const pageTitle = props.currentPost.fields.title;
  const postTag = tagsList && (
    <ul className={tagStyles.tagList}>
      <li key="tags-title">タグ:</li>
      {tagsList}
    </ul>
  );
  return (
    <>
      <article className={styles.root}>
        <CustomHead
          pageTitle={pageTitle}
          description={props.currentPost.fields.description}
          imgFLG={true}
        />
        <div className={styles.articleWrapper}>
          <section className={styles.main}>
            <h1>{props.currentPost.fields.title}</h1>
            <ArticleBody body={body} />
          </section>
          {windowSizeState.windowSizeSelectors.widthSelector() >= MIN_WIDTH && (
            <aside className={styles.side}>
              <RenderTOC markdown={body} />
            </aside>
          )}
        </div>
        <aside className={styles.postInfo}>
          <div className={styles.inner}>
            <PostDate
              postdate={props.currentPost.fields.date}
              update={props.currentPost.fields.update}
            />
            {postCategory}
            {postTag}
          </div>
        </aside>
        <Share url={currentURL} title={pageTitle} />
        <Bio />
        <PrevNext prevPost={props.prevPost} nextPost={props.nextPost} />
        <BackToTop />
      </article>
    </>
  );
};

export default Temp_Post;
