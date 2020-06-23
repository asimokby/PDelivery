import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    // style={{ display: "flex", justifyContent: "center" }}
    display: "flex",
    // marginTop: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 400,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [category, setcategory] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setcategory(event.target.value);
    props.Cat(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div style={{ margin: 0, marginBottom: 15 }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Category of Item
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Electronic"}>Electronic</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Accessories"}>Accessories</MenuItem>
          <MenuItem value={"Cameras"}>Cameras</MenuItem>
          <MenuItem value={"Weapons"}>Weapons</MenuItem>
          <MenuItem value={"Kitchen Stuff"}>Kitchen Stuff</MenuItem>
          <MenuItem value={"Stationary"}>Stationary</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
