import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import Suspense from '../utils/index';
import Layout from '../components/layout/Layout';
import NotFound from './not-found/notfound';

const Home = lazy(() => import('./home/Home'));
const UserMixes = lazy(() => import('./user-mixes-page/MixesPage'));
const LikeSongs = lazy(() => import('./liked-songs/likedSongs'));
const Library = lazy(() => import('./library/UserLibrary'));
const CreatePlaylist = lazy(() => import('./create-playlist/CreatePlaylist'));
const AlbumPage = lazy(() => import('./single-song/SingleSong'));

const RouteController = () => {
    return useRoutes([
        {
            path: '/',
            element: (
                <Suspense>
                    <Layout>
                        <Home />
                    </Layout>
                </Suspense>
            ),
            children: [
                {
                    path: 'liked-songs',
                    element: (
                        <Suspense>
                            <LikeSongs />
                        </Suspense>
                    ),
                },
                {
                    path: 'user-mixes',
                    element: (
                        <Suspense>
                            <UserMixes />
                        </Suspense>
                    ),
                },
                {
                    path: 'create-playlist',
                    element: (
                        <Suspense>
                            <CreatePlaylist />
                        </Suspense>
                    ),
                },
                {
                    path: 'library',
                    element: (
                        <Suspense>
                            <Library />
                        </Suspense>
                    ),
                },
                {
                    path: 'playlists/:id',
                    element: (
                        <Suspense>
                            <AlbumPage />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: '*',
            element: (
                <Suspense>
                    <NotFound />
                </Suspense>
            ),
        },
    ]);
};

export default RouteController;
