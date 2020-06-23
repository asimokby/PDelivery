import React from "react";
import MaterialTable from "material-table";
const lookup = {
  0: "Electronic",
  1: "Food",
  2: "Accessories",
  3: "Cameras",
  4: "Weapons",
  5: "Kitchen",
  6: "Stationary",
  7: "Other",
};
class ItemTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      columns: [
        { title: "Item Name", field: "ItemTitle" },
        { title: "Item Link", field: "ItemLink" },
        { title: "Item Weight(KG)", field: "ItemWeight", type: "numeric" },
        { title: "Quantity(Piece)", field: "ItemQuantity", type: "numeric" },
        {
          title: "Category",
          field: "ItemCategory",
          lookup: lookup,
        },
      ],
      data: [],
      lookupTable: {
        0: "Electronic",
        1: "Food",
        2: "Accessories",
        3: "Cameras",
        4: "Weapons",
        5: "Kitchen",
        6: "Stationary",
        7: "Other",
      },
    };
    // props.Items(this.state.data);

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.props.Items(this.state.data);
  }
  render() {
    // this.props.Items(this.state.data);
    return (
      <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: "#3ac569",
            color: "#FFF",
          },
        }}
        title="Items"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  this.props.Items(data);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    this.props.Items(data);

                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                this.setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  this.props.Items(data);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    );
  }
}
export default ItemTable;
