import { createContext, useContext, useState, useRef } from "react";
import PropTypes from "prop-types";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  const playPause = (trackUrl) => {
    if (audioRef.current.src !== trackUrl) {
      audioRef.current.src = trackUrl;
      audioRef.current
        .play()
        .catch((error) => console.error("Play error:", error));
      setIsPlaying(true);
    } else if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .catch((error) => console.error("Play error:", error));
      setIsPlaying(true);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        playPause,
        audioRef,
        setCurrentTrack,
        currentTrack,
        setIsPlaying,
      }}
    >
      <audio ref={audioRef} />
      {children}
    </MusicContext.Provider>
  );
};

MusicProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMusic = () => useContext(MusicContext);
