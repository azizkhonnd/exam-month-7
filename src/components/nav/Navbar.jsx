import { useLocation } from 'react-router-dom';
import "./Navbar.scss";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Navbar = () => {
    const location = useLocation();

    const isLikedSongsPage = location.pathname === '/liked-songs';
    const isAlbumPage = location.pathname.startsWith('/playlists');

    return (
        <section
            className={`navbar__container ${isLikedSongsPage ? 'liked-songs-navbar' : ''}`}
            style={{
                backgroundColor: isLikedSongsPage ? '#604EC1' : isAlbumPage ? '#DDF628' : '#3333A3',
            }}
        >
            <div className="container">
                <div className="nav__btns">
                    <button className="nav__btn"><MdOutlineArrowBackIos size={25} /></button>
                    <button className="nav__btn"><MdOutlineArrowForwardIos size={25} /></button>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
