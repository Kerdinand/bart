import NavbarProfile from "./NavbarProfile";
import NavbarSettings from "./NavbarSettings";
import NavbarFavorites from "./NavbarFavorites";
import NavbarNextDep from "./NavbarNextDep";
import "./navbar.style.css"



const Navbar = () => {
    return ( 
        <div>
            <nav>
                <div className="profile"><NavbarProfile></NavbarProfile></div>
                <div className="settings"><NavbarSettings></NavbarSettings></div>
                <div className="favorites"><NavbarFavorites></NavbarFavorites></div>
                <div className="next-dep"><NavbarNextDep></NavbarNextDep></div>
            </nav>
        </div>
     );
}
 
export default Navbar;
