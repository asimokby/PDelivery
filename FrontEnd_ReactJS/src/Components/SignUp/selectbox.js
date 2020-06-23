import React from "react";
class SelectBox extends React.Component {
  render() {
    return (
      <div className="selectdiv">
        <label>
          <select>
            <option selected> Select Box </option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Last long option</option>
          </select>
        </label>
      </div>
    );
  }
}
export default SelectBox;
