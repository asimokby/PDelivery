import React from "react";
import SearchBox from "./SearchBox";
class Search extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <SearchBox session={this.props.session}/>

      </div>
    );
  }
}

export default Search;
