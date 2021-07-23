import { useEffect, useState } from 'react';
import AnimeCovers from './AnimeCovers';
import axios from 'axios'
import './App.css';


function App () {

  const [anime, setAnime] = useState([]);

  useEffect(() => {
    axios({
      url: `https://api.jikan.moe/v3/top/anime`,
      method: "GET",
      dataResponse: "json",
      // params: {
      //   key: apiKey,
      //   format: "json",
      //   imgonly: true,
      // },
    }).then((response) => {
      console.log(response.data.top);;
      setAnime(response.data.top);
    });
  // Add an empty array here to prevent the callback function from running every time our component re-renders!
  }, []);

  return (
    <div className="App">
      <h1>Anime Watchlist</h1>
      <main>

      {anime.map((anime) => {
        return (
          <AnimeCovers
            key={anime.mal_id}
            alt={anime.title}
            title={anime.title}
            imagePath={anime.image_url}
            rank={anime.rank}
          />
          );
      })}
      </main>
    </div>
  );
}

export default App;
