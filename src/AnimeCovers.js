function AnimeCovers(props) {
  return (
    <div className="covers">
      <h2>{props.title}</h2>
      <img src={props.imagePath} alt={props.alt} />
      <p>{props.rank}</p>
      <button>Add to Watchlist</button>
    </div>
  )
}

export default AnimeCovers;