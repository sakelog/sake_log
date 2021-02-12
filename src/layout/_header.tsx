import Link from 'next/link';
import loadable from '@loadable/component';
import {
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Hidden,
} from '@material-ui/core';
import { MdMenu } from 'react-icons/md';

import Search from '@layout/headerNav/search/search';
const DrawerList = loadable(() => import('./headerNav/drawer'));

import styles from '@styles/project/_p-header.module.scss';
import { useDispatch } from 'react-redux';
import state from '@state/ducks/index';
import config from '@component/config';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const drawerState = state.drawerState;
  const handleOpen = () => dispatch(drawerState.drawerOperations.open());
  const handleClose = () => dispatch(drawerState.drawerOperations.close());

  const SiteTitle = (
    <Link href="/">
      <span className={styles.title}>{config.title}</span>
    </Link>
  );
  return (
    <>
      <AppBar position="sticky" className={styles.root}>
        <Toolbar>
          {SiteTitle}
          <Search />
          <Hidden smUp>
            <IconButton color="inherit" onClick={handleOpen}>
              <MdMenu />
            </IconButton>
          </Hidden>
          <Hidden xsDown>
            <DrawerList />
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <SwipeableDrawer
          open={drawerState.drawerSelectors.drawerSelector()}
          onClose={handleClose}
          onOpen={handleOpen}
          anchor={'right'}
        >
          <DrawerList />
        </SwipeableDrawer>
      </Hidden>
    </>
  );
};

export default Header;
