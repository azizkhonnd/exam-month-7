/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { MdOutlineDownloadForOffline } from 'react-icons/md';
import { unlikeSong } from '../../redux/slices/SlicesSpotifyApp';
import LikedImg from './img/liked-main-img.png';
import UserLogo from './img/liked-user-playlist.svg';
import './LikedSongs.scss';

const LikedSongs = ({ audioRef, setCurrentTrack, setIsPlaying }) => {
    const dispatch = useDispatch();
    const likedSongs = useSelector((state) => state.likedSongs);

    const [currentTrack, setCurrentTrackState] = useState(null);
    const [isPlaying, setIsPlayingState] = useState(false);

    const handlePlayPause = (track) => {
        if (currentTrack === track) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlayingState(false);
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlayingState(true);
                setIsPlaying(true);
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setCurrentTrack(track);
            setCurrentTrackState(track);
            setIsPlayingState(true);
            setIsPlaying(true);
            audioRef.current.src = track.preview_url;
            audioRef.current.play();
        }
    };

    const handleUnlike = (song) => {
        dispatch(unlikeSong(song));
    };

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
                                <p className='music__item'>davedirect3 • <span className='liked__song-user-music'>{likedSongs.length} songs</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="liked__section-btns-section">
                </section>
            </div>
            <div className="playlist__container">
                <div className="container__bg">
                    <table className='playlist__table'>
                        <thead>
                            <tr className='playlist__table-tr'>
                                <th className='playlist__table-header'></th>
                                <th className='playlist__table-header'>#</th>
                                <th className='playlist__table-header'>TITLE</th>
                                <th className='playlist__table-header'>ALBUM</th>
                                <th className='playlist__table-header'>DATE ADDED</th> {/* Header for the date added column */}
                                <th className='playlist__table-header'>
                                    <div className='playlist__table-icon'>
                                        <MdOutlineDownloadForOffline size={26} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {likedSongs.map((track, index) => (
                                <tr
                                    key={track.id}
                                    className={`playlist__table-row ${currentTrack === track ? 'active' : ''}`}
                                    onClick={() => handlePlayPause(track)}
                                >
                                    <td className="playlist__table-row-item play-pause">
                                        {isPlaying && currentTrack === track ? (
                                            <BsFillPauseFill size={24} />
                                        ) : (
                                            <BsFillPlayFill size={24} />
                                        )}
                                    </td>
                                    <td className="playlist__table-row-item">{index + 1}</td>
                                    <td className="playlist__table-row-item">{track.name}</td>
                                    <td className="playlist__table-row-item">{track.album.name}</td>
                                    <td className="playlist__table-row-item">
                                        {/* Displaying the date added for each track */}
                                        {new Date(track.added_at).toLocaleDateString()}
                                    </td>
                                    <td className="playlist__table-row-item">
                                        <AiFillHeart
                                            size={24}
                                            onClick={() => handleUnlike(track)}
                                            style={{ cursor: 'pointer', backgroundColor: ' #65D36E' }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <audio ref={audioRef} />
        </div>
    );
};

export default LikedSongs;
