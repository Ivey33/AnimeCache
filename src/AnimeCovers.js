function AnimeCovers(props) {


  
  return (
    <div className="covers">
      <a href={props.url} target="_blank" rel="noreferrer">
        <img className="coverImage" src={props.imagePath} alt={props.alt} />
        <div className="coverContent">
          <h2>{props.title}</h2>
          <button>Details</button>
          <p>Rank {props.rank}</p>
        </div>      
      </a>
    </div>
  )
}

export default AnimeCovers;