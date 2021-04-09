import React from 'react';
import './nav.css';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';




function Nav() {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  
  return( 
  <nav id="nav">
            <Link className="nav_link" to="/Home">Home</Link>
            <Link className="nav_link" to="/About">About</Link>

             <div className="nav_link">
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              Promo
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>Simplon Cloud Aulnay</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Nantes IA1</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Bordeaux IA1</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Cloud Aulnay</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Nantes IA1</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Bordeaux IA1</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Cloud Aulnay</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Nantes IA1</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Bordeaux IA1</MenuItem>
                      <MenuItem onClick={handleClose}>Simplon Bordeaux IA1</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
             </nav>
           );
         
}


export default Nav;