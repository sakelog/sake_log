/*==========================================================
参考：https://github.com/Takumon/react-markdown-sync-toc
============================================================*/
import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';

import remark from 'remark';
import visit from 'unist-util-visit';
import mdastToString from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';
const githubSlugger = new GithubSlugger();

import TOC from '../components/postParts/TOC';

const OFFSET_ACTIVE_IMTE = 160;

const RenderTOC: React.FC<{ markdown: string }> = (props) => {
  const [activeItemIds, setActiveItemIds] = useState<render.toc.activeItemIds>(
    []
  );
  const [
    itemTopOffsets,
    setItemTopOffsets,
  ] = useState<render.toc.itemTopOffsets>([]);

  const toc = _getToc(props.markdown);

  useEffect(() => {
    calculateItemTopOffsets();
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  });

  const calculateItemTopOffsets = () => {
    setItemTopOffsets(_getElementTopOffsetsById(toc));
  };

  const throttledHandleScroll = throttle(() => handleScroll(), 100);
  const handleScroll = () => {
    const item = itemTopOffsets.find((current, i) => {
      const next = itemTopOffsets[i + 1];

      return next
        ? window.scrollY + OFFSET_ACTIVE_IMTE >= current.offsetTop &&
            window.scrollY + OFFSET_ACTIVE_IMTE < next.offsetTop
        : window.scrollY + OFFSET_ACTIVE_IMTE >= current.offsetTop;
    });
    const nowActiveItemIds = item ? [item.id] : [];

    setActiveItemIds(nowActiveItemIds);
  };

  return <TOC activeItemIds={activeItemIds} toc={toc} {...props} />;
};
export default RenderTOC;

// マークダウン文字列から目次情報を抽出する
const _getToc: render.toc.getToc = (rawMarkdownBody) => {
  githubSlugger.reset();

  const result = [];
  const ast = remark().parse(rawMarkdownBody);
  visit(ast, 'heading', (child) => {
    const value = child.children[0].value;
    const id = githubSlugger.slug(value || mdastToString(child));
    const depth = child.depth;
    result.push({
      value,
      id,
      depth,
    });
  });

  return result;
};
const _getElementTopOffsetsById: render.toc.getElementTopOffsetsById = (
  ids
) => {
  return ids
    .map(({ id }) => {
      const element = document.getElementById(id);
      return element
        ? {
            id,
            offsetTop: element.offsetTop,
          }
        : null;
    })
    .filter((item) => item);
};