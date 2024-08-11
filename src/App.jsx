import { MusicProvider } from "./context/MusicContext";
import RouteController from "./routes";

function App() {
  return (
    <>
      <MusicProvider>
        <RouteController />
      </MusicProvider>
    </>
  );
}

export default App;
