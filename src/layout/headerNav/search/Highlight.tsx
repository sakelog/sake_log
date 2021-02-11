import React from 'react';
import { HighlightProps } from 'react-instantsearch-core';
import { connectHighlight } from 'react-instantsearch-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Message } from './types';
import config from '@component/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    span: {
      color: '#333333',
    },
    mark: {
      background: config.themeColor,
      color: '#ffffff',
      padding: theme.spacing(0, 1),
      margin: theme.spacing(1),
    },
  })
);

const HighlightHit: React.FC<HighlightProps<Message>> = ({
  hit,
  highlight,
  attribute,
}) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });
  const styles = useStyles();
  return (
    <>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <mark key={index} className={styles.mark}>
            {part.value}
          </mark>
        ) : (
          <span key={index} className={styles.span}>
            {part.value}
          </span>
        )
      )}
    </>
  );
};

export default connectHighlight(HighlightHit);