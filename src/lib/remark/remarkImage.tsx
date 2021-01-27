import Image from 'next/image';
import { useEffect, useState } from 'react';

import { getWindowSize } from '../getWindowSize';

import styles from '../../styles/Object/Component/_c-article__Image.module.scss';

const RemarkImage = (props: JSX.IntrinsicElements['img']) => {
  const isContentfulImg = props.src.startsWith('//images.ctfassets.net');
  const alt = props.alt ? props.alt : null;
  const [state, setState] = useState<string>('');
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const handleShow = () => {
    setState('show');
  };
  const handleHide = () => {
    setState('hide');
  };
  const handleChangeWindowSize = () => {
    setWindowSize(getWindowSize());
  };
  useEffect(() => {
    handleChangeWindowSize();
    window.addEventListener('resize', () => {
      handleChangeWindowSize();
    });
    window.addEventListener('orientationchange', () => {
      handleChangeWindowSize();
    });
  }, []);
  const customImgTag = isContentfulImg ? (
    <>
      <div
        className={styles.modal + ' ' + styles[state]}
        onClick={handleHide}
        style={{ width: windowSize.width, height: windowSize.height }}
      >
        <Image
          src={'https:' + props.src}
          layout="fill"
          objectFit="scale-down"
          alt={alt}
        />
      </div>
      <div className={styles.articleImage}>
        <Image
          src={'https:' + props.src}
          layout="fill"
          objectFit="scale-down"
          alt={alt}
          onClick={handleShow}
        />
      </div>
    </>
  ) : (
    <img {...props} />
  );
  return <>{customImgTag}</>;
};

export default RemarkImage;
