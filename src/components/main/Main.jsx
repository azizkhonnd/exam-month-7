import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.scss';

const Main = () => {
    const navigate = useNavigate();

    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
    const [topMixes, setTopMixes] = useState([]);
    const [madeForYou, setMadeForYou] = useState([]);
    const [recentPlayed, setRecentPlayed] = useState([]);
    const [jumpBackIn, setJumpBackIn] = useState([]);
    const [uniquelyYours, setUniquelyYours] = useState([]);

    const getToken = useCallback(async () => {
        try {
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

            if (!clientId || !clientSecret) {
                throw new Error('Client ID or Client Secret is missing.');
            }

            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                },
                body: "grant_type=client_credentials"
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
            }

            const auth = await response.json();
            localStorage.setItem("access_token", `${auth.token_type} ${auth.access_token}`);

            const token = auth.access_token;
            fetchFeaturedPlaylists(token);
            fetchTopMixes(token);
            fetchMadeForYou(token);
            fetchRecentPlayed(token);
            fetchJumpBackIn(token);
            fetchUniquelyYours(token);
        } catch (err) {
            console.error('Failed to fetch token:', err);
        }
    }, []);

    const fetchFeaturedPlaylists = async (token) => {
        try {
            const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch featured playlists: ${errorText}`);
            }

            const data = await response.json();
            setFeaturedPlaylists(data.playlists ? data.playlists.items : []);
        } catch (err) {
            console.error('Failed to fetch featured playlists:', err);
        }
    };

    const fetchTopMixes = async (token) => {
        try {
            const response = await fetch("https://api.spotify.com/v1/browse/categories/toplists/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch top mixes: ${errorText}`);
            }

            const data = await response.json();
            setTopMixes(data.playlists ? data.playlists.items : []);
        } catch (err) {
            console.error('Failed to fetch top mixes:', err);
        }
    };

    const fetchMadeForYou = async (token) => {
        try {
            const response = await fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch Made for You playlists: ${errorText}`);
            }

            const data = await response.json();
            setMadeForYou(data.playlists ? data.playlists.items : []);
        } catch (err) {
            console.error('Failed to fetch Made for You playlists:', err);
        }
    };

    const fetchRecentPlayed = async (token) => {
        try {
            const response = await fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch Recently Played playlists: ${errorText}`);
            }

            const data = await response.json();
            setRecentPlayed(data.playlists ? data.playlists.items : []);
        } catch (err) {
            console.error('Failed to fetch Recently Played playlists:', err);
        }
    };

    const fetchJumpBackIn = async (token) => {
        try {
            const response = await fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch Jump Back In playlists: ${errorText}`);
            }

            const data = await response.json();
            setJumpBackIn(data.playlists ? data.playlists.items : []);
        } catch (err) {
            console.error('Failed to fetch Jump Back In playlists:', err);
        }
    };

    const fetchUniquelyYours = async (token) => {
        try {
            const response = await fetch("https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch Uniquely Yours playlists: ${errorText}`);
            }

            const data = await response.json();
            setUniquelyYours(data.playlists ? data.playlists.items : []);
        } catch (err) {
            console.error('Failed to fetch Uniquely Yours playlists:', err);
        }
    };

    useEffect(() => {
        getToken();
    }, [getToken]);

    return (
        <div className='main__container'>
            <div className='container main__content-item'>
                <h1 className='main__title'>Good afternoon</h1>

                <h2 className='main__subtitle'>Featured Playlists</h2>
                <div className='music-cards'>
                    {featuredPlaylists.length > 0 ? (
                        featuredPlaylists.slice(0, 6).map((playlist) => (
                            <div
                                style={{ cursor: 'pointer' }}
                                key={playlist.id}
                                className='music-card featured-card'
                                onClick={() => navigate(`/playlists/${playlist.id}`)}
                            >
                                <div className='featured-card__item'>
                                    <div>
                                        <img src={playlist.images[0].url} alt={playlist.name} className='music-card__image_feature' />
                                    </div>
                                    <div>
                                        <h2 className='music-card__title'>{playlist.name}</h2>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No featured playlists available</p>
                    )}
                </div>

                <h2 className='main__subtitle'>Your Top Mixes</h2>
                <div className='music-cards'>
                    {topMixes.length > 0 ? (
                        topMixes.slice(0, 4).map((playlist) => (
                            <div
                                style={{ cursor: 'pointer' }}
                                key={playlist.id}
                                className='music-card'
                                onClick={() => navigate(`/playlists/${playlist.id}`)}
                            >
                                <img src={playlist.images[0].url} alt={playlist.name} className='music-card__image' />
                                <h2 className='music-card__title'>{playlist.name}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No top mixes available</p>
                    )}
                </div>

                <h2 className='main__subtitle'>Made for You</h2>
                <div className='music-cards'>
                    {madeForYou.length > 0 ? (
                        madeForYou.slice(0, 4).map((playlist) => (
                            <div
                                style={{ cursor: 'pointer' }}
                                key={playlist.id}
                                className='music-card'
                                onClick={() => navigate(`/playlists/${playlist.id}`)}
                            >
                                <img src={playlist.images[0].url} alt={playlist.name} className='music-card__image' />
                                <h2 className='music-card__title'>{playlist.name}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No playlists available for you</p>
                    )}
                </div>

                <h2 className='main__subtitle'>Recently Played</h2>
                <div className='music-cards'>
                    {recentPlayed.length > 0 ? (
                        recentPlayed.slice(0, 4).map((playlist) => (
                            <div
                                style={{ cursor: 'pointer' }}
                                key={playlist.id}
                                className='music-card'
                                onClick={() => navigate(`/playlists/${playlist.id}`)}
                            >
                                <img src={playlist.images[0].url} alt={playlist.name} className='music-card__image' />
                                <h2 className='music-card__title'>{playlist.name}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No recently played playlists available</p>
                    )}
                </div>

                <h2 className='main__subtitle'>Jump Back In</h2>
                <div className='music-cards'>
                    {jumpBackIn.length > 0 ? (
                        jumpBackIn.slice(0, 4).map((playlist) => (
                            <div
                                style={{ cursor: 'pointer' }}
                                key={playlist.id}
                                className='music-card'
                                onClick={() => navigate(`/playlists/${playlist.id}`)}
                            >
                                <img src={playlist.images[0].url} alt={playlist.name} className='music-card__image' />
                                <h2 className='music-card__title'>{playlist.name}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No jump back in playlists available</p>
                    )}
                </div>

                <h2 className='main__subtitle'>Uniquely Yours</h2>
                <div className='music-cards'>
                    {uniquelyYours.length > 0 ? (
                        uniquelyYours.slice(0, 4).map((playlist) => (
                            <div
                                style={{ cursor: 'pointer' }}
                                key={playlist.id}
                                className='music-card'
                                onClick={() => navigate(`/playlists/${playlist.id}`)}
                            >
                                <img src={playlist.images[0].url} alt={playlist.name} className='music-card__image' />
                                <h2 className='music-card__title'>{playlist.name}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No uniquely yours playlists available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;