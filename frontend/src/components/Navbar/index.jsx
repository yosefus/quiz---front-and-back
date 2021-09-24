import { useState, useEffect, useContext } from 'react';
import { Nav, NavLink, Bars, NavMenu, LogOut, Container } from './NavbarElements';
import { UserContext } from '../Login';

function Navbar() {
  const [ToggleNav, setToggleNav] = useState(false);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  const loginState = useContext(UserContext);
  let [user, setUser] = loginState;

  useEffect(() => {
    const changeWidth = () => {
      setwindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', changeWidth);
  }, []);

  function logoutFn() {
    localStorage.removeItem('token');
    setUser('guest');
  }

  const closeNav = () => setToggleNav(false);

  return (
    <>
      <Nav>
        <Container>
          <Bars onClick={() => setToggleNav(!ToggleNav)} />
          {(ToggleNav || windowWidth > 768) && (
            <NavMenu>
              <LogOut onClick={logoutFn}>
                Log Out <i className="fas fa-sign-out-alt"></i>
              </LogOut>
              <NavLink onClick={closeNav} to="/created-test">
                המבחנים שיצרתי
              </NavLink>
              <NavLink onClick={closeNav} to="/assigned-tests">
                המבחנים שלי
              </NavLink>
              <NavLink onClick={closeNav} to="/" exact>
                דף הבית
              </NavLink>
            </NavMenu>
          )}
        </Container>
      </Nav>
    </>
  );
}

export default Navbar;
