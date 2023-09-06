import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory, updateCategory } from "@/store/CategorySlice";

const style = {
  marginBottom: "20px",
};

const EditCategory = (props) => {
  const [item, setItem] = useState(props.item);
  const [image, setImage] = useState(item?.image);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setItem({ ...item, image: file });
      setImage(URL.createObjectURL(file));
    } else {
      setItem({ ...item, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", item?.image);
    formData.append("name", item?.name);
    if (item._id) {
      formData.append("_id", item._id);
      dispatch(updateCategory({ item: formData, id: item._id }));
    } else {
      dispatch(addCategory(formData));
    }
  };
  return (
    <>
      <h1 style={style}>Market</h1>

      <TextField
        label="Name"
        variant="outlined"
        name="name"
        fullWidth
        value={item?.name}
        onChange={handleChange}
        style={style}
      />

      <Box sx={style}>
        <input type="file" name="image" onChange={handleChange} />
        <br />
        {image && (
          <img
            src={image}
            alt="Selected Image"
            style={{ width: "100px", height: "auto" }}
          />
        )}
      </Box>

      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </>
  );
};

export default EditCategory;
