import { Link, useLocation } from 'react-router-dom';
import { BiLibrary } from 'react-icons/bi';
import { BsSearch, BsPlusSquareFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import likeSongs from './img/like-songs.svg';
import './LeftSidebar.scss';

const LeftSidebar = () => {
    const location = useLocation();

    return (
        <div className='left__side__container'>
            <div className='left__side__items'>
                <div className="left__side__content">
                    <div className='left__side__item'>
                        <Link
                            className={`left__side__item_row ${location.pathname === '/' ? 'active' : ''}`}
                            to='/'
                        >
                            <AiFillHome size={32} style={{ backgroundColor: "transparent", color: 'white' }} />
                            Home
                        </Link>
                    </div>
                    <div className='left__side__item'>
                        <Link
                            className={`left__side__item_row ${location.pathname === '#' ? 'active' : ''}`}
                            to='#'
                        >
                            <BsSearch size={32} style={{ backgroundColor: "transparent", color: 'white' }} />
                            Search
                        </Link>
                    </div>
                    <div className='left__side__item'>
                        <Link
                            className={`left__side__item_row ${location.pathname === '/library' ? 'active' : ''}`}
                            to='/library'
                        >
                            <BiLibrary size={32} style={{ backgroundColor: "transparent", color: 'white' }} />
                            Your Library
                        </Link>
                    </div>
                </div>
                <div className="playlist__items">
                    <div className='left__side__item'>
                        <Link
                            className={`left__side__item_row ${location.pathname === '/create-playlist' ? 'active' : ''}`}
                            to='/create-playlist'
                        >
                            <BsPlusSquareFill size={32} style={{ backgroundColor: "transparent", color: 'white' }} />
                            Chill Mix
                        </Link>
                    </div>
                    <div className='left__side__item'>
                        <Link
                            className={`left__side__item_row ${location.pathname === '/liked-songs' ? 'active' : ''}`}
                            to='/liked-songs'
                        >
                            <img src={likeSongs} width={32} height={32} alt='like songs' />
                            Insta Hits
                        </Link>
                    </div>
                </div>
                <div className="line"></div>
                <ul className='left__nav-item'>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/your-playlists' ? 'active' : ''}`}
                            to='/your-playlists'
                        >
                            Your Top Songs 2021
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/featured-playlists' ? 'active' : ''}`}
                            to='/featured-playlists'
                        >
                            Mellow Songs
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            Anime Lofi & Chillhop Music
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            BG Afro “Select” Vibes
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            Afro “Select” Vibes
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            Happy Hits!
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            Deep Focus
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            Instrumental Study
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            OST Compilations
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            Nostalgia for old souled mill...
                        </Link>
                    </li>
                    <li className='left__side__item'>
                        <Link
                            className={`left__side__item_row-item ${location.pathname === '/trending-playlists' ? 'active' : ''}`}
                            to='/trending-playlists'
                        >
                            Mixed Feelings
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LeftSidebar;
