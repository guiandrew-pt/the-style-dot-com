import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as StoreLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    // console.log(currentUser);

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <StoreLogo className="logo" />
            </Link>
            
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    Shop
                </Link>
                {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                    )
                }
                <CartIcon />
            </div>
            {isCartOpen && <CardDropdown />}
        </div>
        <Outlet/>
      </Fragment>
    );
  };
  
  export default Navigation;