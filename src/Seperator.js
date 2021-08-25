function Seperator(props) {

  const previousPage = (e) => {
    console.log("previous");
    props.onPreviousPage();
  }

  const nextPage = (e) => {
    console.log("next");
    
  }


  return (
        <div className="seperator">
          <div className="flexedLine"></div>
          <div className="seperatorActions">
            <button className="leftButton" onClick={ previousPage }><i className="far fa-arrow-alt-circle-left"></i></button>
            <button className="rightButton" onClick={ props.onNextPage }><i className="far fa-arrow-alt-circle-right"></i></button>       
          </div>
        </div>
  )
}

export default Seperator