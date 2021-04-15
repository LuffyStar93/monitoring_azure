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
            <Link className="nav_link" to="/Home">Accueil</Link>
            <Link className="nav_link" to="/TotalCost">Coût Total</Link>

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
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonCloudAulnay", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/aulnay", nom:"Simplon IDF Aulnay Cloud1"} }}> Simplon IDF Aulnay Cloud1 </Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonNantesIA1", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/nantes", nom:"Simplon Nantes IA1"} }}> Simplon Nantes IA1</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonGDORennesIA1", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/rennes", nom:"Simplon GDO Rennes IA1"} }}> Simplon GDO Rennes IA1</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonMarseille", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/marseille", nom:"Simplon PACA Marseille IA1"} }}> Simplon PACA Marseille IA1</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonCastelnau", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/castelnau", nom:"Simplon OCC Castelnau Cloud1"} }}> Simplon OCC Castelnau Cloud1</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonNouvelle-AquitaineIA-1", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/nouvelle-aquitaine", nom:"Simplon Nouvelle-Aquitaine IA-1"} }}> Simplon Nouvelle-Aquitaine IA-1</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonNAQBordeauxIA1", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/bordeaux", nom:"Simplon NAQ Bordeaux IA1"} }}> Simplon NAQ Bordeaux IA1</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonGDEStrasbourgIA1", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/strasbourg", nom:"Simplon GDE Strasbourg IA1"} }}> Simplon GDE Strasbourg IA1</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/SimplonGDENancyIA1", state: {url:"https://monitoresimploncost.azurewebsites.net/api/promo/nancy", nom:"Simplon GDE Nancy IA1"} }}> Simplon GDE Nancy IA1</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link className="link_menu" to={{ pathname: "/All", state: {url:"https://monitoresimploncost.azurewebsites.net/api/all", nom:"Toutes les promos"} }}> Toutes les promos</Link></MenuItem>
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