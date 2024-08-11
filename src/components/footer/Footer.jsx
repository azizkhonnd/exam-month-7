// /* eslint-disable react/prop-types */
import { FaPauseCircle } from "react-icons/fa";
import { BsFillPlayCircleFill, BsShuffle } from "react-icons/bs";
import "./Footer.scss";

import { FiRepeat } from "react-icons/fi";
import { useMusic } from "../../context/MusicContext";

const Footer = () => {
  const { isPlaying, playPause, audioRef, currentTrack } = useMusic();

  const handlePlayPause = () => {
    if (audioRef.current.src) {
      playPause(audioRef.current.src);
    }
  };

  return (
    <div className="footer__section-container">
      <div className="container footer__container-item">
        <div className="play__items">
          <div>
            <button className="prevBtn">
              <span role="img" aria-label="Repeat">
                <FiRepeat size={24} />
              </span>
            </button>
          </div>
          <div>
            <button
              className="playBtn"
              onClick={handlePlayPause}
              disabled={currentTrack === null}
            >
              {isPlaying ? (
                <FaPauseCircle size={45} />
              ) : (
                <BsFillPlayCircleFill size={45} />
              )}
            </button>
          </div>
          <div>
            <button className="prevBtn">
              <BsShuffle size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
