import { useEffect, useState } from 'react';
import AnimeCovers from './AnimeCovers';
import Seperator from './Seperator';
import axios from 'axios'
// import firebase from './firebase';
import './App.css';



function App () {

  const [anime, setAnime] = useState([]);
  const [watchlistInput, setWatchlistInput] = useState([]);
  const [topAnimeList, setTopAnimeList] = useState([]);
  const topFive = 5;
  const [lowerBound, setLowerBound] = useState(0);

  const exportAnime = (animeObject) => {


    let existsInArray = false;

    for (let itemInWatchlistInput of watchlistInput) {
      if (animeObject.mal_id === itemInWatchlistInput.mal_id) {
        existsInArray = true;
        break;
      }
    }
    if (!existsInArray) {

      setWatchlistInput([...watchlistInput, animeObject])
    }


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

      let topItems = [...response.data.top];

      topItems = topItems.slice(0, topFive)

      setTopAnimeList(topItems)
    });
  
  }, []);


// Buttons to move array to next 5 in the line

  const previousPage = (e) => {
    console.log("parentComponent");   
    
    const updatedArray = getNewArray(false, true, topFive);
    setTopAnimeList(updatedArray)
  }

  const nextPage = (e) => {
    console.log("parentComponent");
    const updatedArray = getNewArray(true, false, topFive);
    setTopAnimeList(updatedArray)
  }

  const getNewArray = (isNext, isPrevious, count) => {
    console.log(isNext);
    console.log(isPrevious);
    console.log(count);

    let newLowerBound = 0;

    if (isNext) {
      console.log("isNext");
      newLowerBound = lowerBound + count;
      setLowerBound(newLowerBound);
    } 

    if (isPrevious) {
      console.log("isPrevious");
      newLowerBound = lowerBound - count;
      setLowerBound(newLowerBound);
    } 
    
    let upperBound = newLowerBound + count;

    console.log(newLowerBound);
    const newArray = [...anime]
    const returnArray = newArray.slice(newLowerBound, upperBound)
    console.log(returnArray);
    return returnArray;
  }




  return (
    <div className="App">
      <nav>
        <div className="menuContainer">
          <div className="logo">
            <h2>Anime<span>Cache</span></h2>
          </div>
          {/* <div className="menu">
            <ul>
              <li>
                <a href="header">Home</a>
              </li>
              <li>
                <a href="watchlist">About</a>
              </li>
              <li>
                <a href="watchlist">Contact Us</a>
              </li>
            </ul>
          </div> */}
        </div>
        {/* <div className="searchBar">
          <input className="searchBarInput" type="text" placeholder="Search for Animes... JUST FOR SHOW DOESNT WORK" />
          <span className="searchBarIcon"><i className="fas fa-search"></i></span>
        </div> */}
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
                          <i className="fas fa-trash-alt"></i>
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
          <h2>Top {topFive + lowerBound} Anime</h2>
          <Seperator 
            onNextPage={nextPage}
            onPreviousPage={previousPage}
          />          
        </div>
        <div className="top50">
          {topAnimeList.map((anime) => {
            return (
              <div className="slider" key={anime.mal_id}>
                <AnimeCovers
                  // key={anime.mal_id}
                  alt={anime.title}
                  title={anime.title}
                  imagePath={anime.image_url}
                  rank={anime.rank}
                  url={anime.url}
                  // anime={anime}
                />
                <button className="addToWatchlist" onClick={() => {exportAnime(anime)}}>Add to Watchlist</button>
              </div>
              
            );
          })}
        </div>
        
      </main>
      <footer>
        <p>Created by Austin Ivey @ <span>Juno College</span></p>
      </footer>
    </div>
  );
}

export default App;
