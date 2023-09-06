import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVideo, updateVideo } from "@/store/VideoSlice";

const style = {
  marginBottom: "20px",
};

const EditVideo = (props) => {
  const [item, setItem] = useState(props.item);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (item._id) {
      dispatch(updateVideo(item));
    } else {
      dispatch(addVideo(item));
    }
  };
  return (
    <>
      <h1 style={style}>Video</h1>
      <TextField
        label="Title"
        variant="outlined"
        name="title"
        fullWidth
        value={item?.title}
        onChange={handleChange}
        style={style}
      />

      <TextField
        label="Link"
        variant="outlined"
        name="url"
        fullWidth
        value={item?.url}
        onChange={handleChange}
        style={style}
      />

      <TextField
        label="Description"
        variant="outlined"
        name="description"
        fullWidth
        multiline
        rows={5}
        value={item?.description}
        onChange={handleChange}
        style={style}
      />

      <FormControl variant="outlined" fullWidth style={style}>
        <InputLabel htmlFor="outlined-age-native-simple">
          Free Or Paid
        </InputLabel>
        <Select
          native
          name="status"
          value={item?.status}
          onChange={handleChange}
        >
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </>
  );
};

export default EditVideo;
