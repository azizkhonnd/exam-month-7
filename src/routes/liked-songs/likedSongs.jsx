import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
// import { AiOutlinePause } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineDownloadForOffline } from "react-icons/md";

import LikedImg from './img/liked-main-img.png'
import UserLogo from './img/liked-user-playlist.svg'
import './LikedSongs.scss'
const likedSongs = () => {
    return (
        <div className='liked__container-wrapper'>
            <div className="liked__container">
                <div className="liked__contain">
                    <div>
                        <img src={LikedImg} alt="liked songs" width={297} height={297} />
                    </div>
                    <div className='liked__item'>
                        <div>
                            <p className='playlist__main-subtitle'>
                                PUBLIC <br />
                                PLAYLIST
                            </p>
                            <h2 className='playlist__main-title'>Liked Songs</h2>
                        </div>
                        <div className="liked__songs">
                            <div className="liked__song-user">
                                <img src={UserLogo} alt="user logo" width={40} height={40} />
                                <p className='music__item'>davedirect3 • <span className='liked__song-user-music'>34 songs</span> </p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="liked__section-btns-section">

                    <div className='liked__section-btns'>
                        <div className="btn__items-like">
                            <div>
                                <button className='section__btn-play'>
                                    <BsFillPlayFill size={52} style={{ marginLeft: 6 }} />
                                    {/* <AiOutlinePause /> */}
                                </button>
                            </div>
                            <div>
                                <button className='section__btn-like'>
                                    <AiOutlineHeart size={45} />
                                </button>
                            </div>
                            <div>
                                <button className='section__btn-download'>
                                <MdOutlineDownloadForOffline size={45}/>
                                </button>
                            </div>
                            <div>
                                <button className='section__btn-items'>
                                    •••
                                </button>
                            </div>
                        </div>
                        <div className="right__like-elements">
                            <button className='section__btn-search'>
                                <AiOutlineSearch size={25} />
                            </button>
                            <button className='section__btn-select'>
                                Custom order
                                <IoMdArrowDropdown size={26}/>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default likedSongs
