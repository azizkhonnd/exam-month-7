import { BiTime } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SingleSong.scss";
import { FaPauseCircle } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useMusic } from "../../context/MusicContext";

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
  const {
    playPause,
    setCurrentTrack,
    setIsPlaying,
    audioRef,
    isPlaying,
    currentTrack,
  } = useMusic();

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

  const handlePlayPause = (trackUrl) => {
    setCurrentTrack(trackUrl);
    playPause(trackUrl);
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
                  <th>TITLE</th>
                  <th>ARTIST</th>
                  <th>
                    <div className="time__svg">
                      <BiTime size={25} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track, index) => (
                  <tr
                    key={track.track.id}
                    onClick={() => handlePlayPause(track.track.preview_url)}
                    className={
                      isPlaying && track.track.preview_url === currentTrack
                        ? "active-track"
                        : ""
                    }
                  >
                    <td style={{ width: "30px", cursor: "pointer" }}>
                      {isPlaying && track.track.preview_url === currentTrack ? (
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
                      {Math.floor(track.track.duration_ms / 60000)}:
                      {(
                        "0" +
                        Math.floor((track.track.duration_ms % 60000) / 1000)
                      ).slice(-2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
