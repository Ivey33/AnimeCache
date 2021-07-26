import { useEffect, useState } from 'react';
import AnimeCovers from './AnimeCovers';
import Seperator from './Seperator';
import axios from 'axios'
// import firebase from './firebase';
import './App.css';



function App () {

  const [anime, setAnime] = useState([]);
  const [watchlistInput, setWatchlistInput] = useState([]);

  

  const exportAnime = (animeObject) => {
    // const newWatchlistInput = [...watchlistInput];
    // newWatchlistInput.push(animeTitle);
    setWatchlistInput([...watchlistInput, animeObject])
    // console.log(newWatchlistInput);
  }

  const handleDelete = (animeRemove) => {
    const oldArray = [...watchlistInput];
    const filteredArray = oldArray.filter(animeItem => animeItem.mal_id !== animeRemove.mal_id);
    setWatchlistInput(filteredArray);
    
  }


  useEffect(() => {
    axios({
      url: `https://api.jikan.moe/v3/top/anime`,
      method: "GET",
      dataResponse: "json",

    }).then((response) => {
      console.log(response.data.top);
      setAnime(response.data.top);
    });
  // Add an empty array here to prevent the callback function from running every time our component re-renders!
  }, []);

  // Event listener for buttons
  // const handleChange = (animeId) => {
  //   console.log(animeId);
  // }

  return (
    <div className="App">
      <nav>
        <div className="menuContainer">
          <div className="logo">
            <h2>Anime<span>Cache</span></h2>
          </div>
          <div className="menu">
            <ul>
              <li>
                <a href="header">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="searchBar">
          <input className="searchBarInput" type="text" placeholder="Search for Animes..." />
          <span className="searchBarIcon"><i class="fas fa-search"></i></span>
        </div>
      </nav>
      <header>
        <section className="watchlist">
          <div className="wrapper">
            <div className="watchlistContainer">
              <ul>
                {
                  watchlistInput.map( (anime) => {
                    return (
                      <li key={anime.mal_id}>
                        
                        <img src={anime.image_url} alt={anime.title} />
                        <h2>{anime.title}</h2>
                        {<button 
                          onClick={ () => {handleDelete(anime) } }
                        >
                          Watched 
                        </button>}
                        {<button
                          onClick={ () => {handleDelete(anime) } }
                        >
                          X
                        </button>}
                      </li>
                    )
                  })
                }
              </ul>                  
            </div>
          </div>
        </section>
      </header>
      <main>
        <div className="divider">
          <h2>Top 50 Anime</h2>
          <Seperator />          
        </div>
        <div className="top50">
          {anime.map((anime) => {
            return (
              <div className="slider" key={anime.mal_id}>
                <AnimeCovers
                  // key={anime.mal_id}
                  alt={anime.title}
                  title={anime.title}
                  imagePath={anime.image_url}
                  rank={anime.rank}
                />
                <button className="addToWatchlist" onClick={() => {exportAnime(anime)}}>Add to Watchlist</button>
              </div>
              
            );
          })}
        </div>
        <div className="divider">
          <h2>Ongoing Anime</h2>
          <Seperator />          
        </div>
        <div className="divider">
          <h2>Top Manga</h2>
          <Seperator />          
        </div>
      </main>
    </div>
  );
}

export default App;
