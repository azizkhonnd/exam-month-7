import { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { FaPauseCircle } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useMusic } from "../../context/MusicContext";
import { useDispatch, useSelector } from "react-redux";
import { likeSong, unlikeSong } from "../../redux/slices/SlicesSpotifyApp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SingleSong.scss";

const getNewToken = async () => {
  try {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Token fetch error: ${response.status}`);
    }

    const data = await response.json();
    const newToken = `${data.token_type} ${data.access_token}`;
    localStorage.setItem("access_token", newToken);
    return newToken;
  } catch (error) {
    console.error("Failed to get new token:", error);
    return null;
  }
};

const AlbumPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrackImage, setCurrentTrackImage] = useState(null);
  const {
    playPause,
    setCurrentTrack,
    setIsPlaying,
    audioRef,
    isPlaying,
    currentTrack,
  } = useMusic();

  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.likedSongs.likedSongs || []);

  const isLiked = (track) => Array.isArray(likedSongs) && likedSongs.some((likedTrack) => likedTrack.id === track.id);

  const handleLikeDislike = (track) => {
    if (isLiked(track)) {
      dispatch(unlikeSong(track));
      toast.info("Song removed from liked songs");
    } else {
      dispatch(likeSong(track));
      toast.success("Song added to liked songs");
    }
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        let token = localStorage.getItem("access_token");

        if (!token || token.includes("Invalid access token")) {
          token = await getNewToken();
          if (!token) {
            throw new Error("Failed to get a valid access token.");
          }
        }

        const fetchAlbumData = async (token) => {
          const response = await fetch(
            `https://api.spotify.com/v1/playlists/${id}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
              token = await getNewToken();
              if (!token) {
                throw new Error("Failed to get a valid access token.");
              }
              localStorage.setItem("access_token", token);
              const retryResponse = await fetch(
                `https://api.spotify.com/v1/playlists/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (!retryResponse.ok) {
                throw new Error(
                  `HTTP error! status: ${retryResponse.status}, message: ${errorData.error.message}`
                );
              }

              return retryResponse.json();
            } else {
              throw new Error(
                `HTTP error! status: ${response.status}, message: ${errorData.error.message}`
              );
            }
          }

          return response.json();
        };

        const data = await fetchAlbumData(token);
        setAlbum(data);
        // Show only the first 39 tracks
        setTracks(data.tracks.items.slice(0, 39));
      } catch (err) {
        console.error("Failed to fetch album:", err);
      }
    };

    fetchAlbum();
  }, [id]);

  useEffect(() => {
    const audioElement = audioRef?.current;
    if (audioElement) {
      audioElement.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [audioRef, setIsPlaying]);

  const handlePlayPause = (trackUrl, trackImage) => {
    if (trackUrl) {
      setCurrentTrack(trackUrl);
      setCurrentTrackImage(trackImage);
      playPause(trackUrl);
    }
  };

  return (
    <div id="bg__color-single">
      <div className="album__items">
        {album ? (
          <>
            <img src={album.images[0].url} alt={album.name} />
            <div>
              <p className="public-playlist">PUBLIC PLAYLIST</p>
              <h1 className="albumTitle">{album.name}</h1>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="album-container">
        {album ? (
          <div>
            <table className="album-tracks">
              <thead>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>TITLE</th>
                  <th>ARTIST</th>
                  <th></th>
                  <th>
                    <div className="time__svg">
                      <BiTime size={25} />
                    </div>
                  </th>
                  <th className="td__child-last" style={{ textAlign: 'end' }}><span className="td__child-last">Premium</span></th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track, index) => {
                  const isPremium = !track.track.preview_url;
                  const trackUrl = isPremium ? null : track.track.preview_url;

                  return (
                    <tr
                      key={track.track.id}
                      onClick={() => {
                        if (!isPremium) {
                          handlePlayPause(trackUrl, track.track.album.images[0]?.url);
                        }
                      }}
                      className={
                        isPlaying && trackUrl === currentTrack
                          ? "active-track"
                          : ""
                      }
                    >
                      <td style={{ width: "30px" }}>
                        {isPremium ? (
                          <div className="play-button-disabled">
                            <BsFillPlayCircleFill size={45} />
                          </div>
                        ) : isPlaying && trackUrl === currentTrack ? (
                          <FaPauseCircle size={45} />
                        ) : (
                          <BsFillPlayCircleFill size={45} />
                        )}
                      </td>

                      <td>{index + 1}</td>
                      <td>{track.track.name}</td>
                      <td>
                        {track.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeDislike(track.track);
                          }}
                          className={`like-btn ${isLiked(track.track) ? 'liked' : ''}`}
                        >
                          {isLiked(track.track) ? (
                            <AiFillHeart size={24} />
                          ) : (
                            <AiOutlineHeart size={24} />
                          )}
                        </button>
                      </td>
                      <td>
                        {Math.floor(track.track.duration_ms / 60000)}:
                        {(
                          "0" +
                          Math.floor((track.track.duration_ms % 60000) / 1000)
                        ).slice(-2)}
                      </td>
                      {isPremium && (
                        <td className="premium-message "><span className="td__child-last">This is a premium track for premium users</span></td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {currentTrackImage && (
              <div className="current-track-image">
                <img src={currentTrackImage} alt="Current Track" />
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AlbumPage;
