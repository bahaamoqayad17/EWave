import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/CategorySlice";
import Autocomplete from "@mui/material/Autocomplete";

import {
  addRecommendation,
  updateRecommendation,
} from "@/store/RecommendationSlice";

const style = {
  marginBottom: "20px",
};

const status = [
  {
    label: "Pending",
    value: 0,
  },
  {
    label: "Active",
    value: 1,
  },
  {
    label: "Expired",
    value: 2,
  },
];

const trade_result = [
  {
    label: "Waiting",
    value: 0,
  },
  {
    label: "Break even",
    value: 1,
  },
  {
    label: "Target 1",
    value: 2,
  },
  {
    label: "Target 2",
    value: 3,
  },
  {
    label: "Stop loss",
    value: 4,
  },
];

const trade_style = [
  {
    label: "Swing Trade",
    value: 0,
  },
  {
    label: "Interday",
    value: 1,
  },
];

const paid = [
  {
    label: "Free",
    value: 0,
  },
  {
    label: "Paid",
    value: 1,
  },
];

const action = [
  {
    label: "Buy",
    value: "Buy",
  },
  {
    label: "Sell",
    value: "Sell",
  },
];

const EditRecommendation = (props) => {
  const [item, setItem] = useState(props.item);
  const [image, setImage] = useState(item?.image);
  const dispatch = useDispatch();
  const { categories } = useSelector(({ categories }) => categories);

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

    for (const key in item) {
      formData.append(key, item[key]);
    }

    if (item._id) {
      formData.append("_id", item._id);
      dispatch(updateRecommendation({ item: formData, id: item._id }));
    } else {
      dispatch(addRecommendation({ formData, is_paid: item?.is_paid }));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <>
      <h1 style={style}>Recommendation</h1>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={item?.name}
          onChange={handleChange}
          style={style}
          sx={{ width: "30%" }}
        />

        <TextField
          label="Rist Per Trade"
          variant="outlined"
          name="risk_per_trade"
          type="number"
          value={item?.risk_per_trade}
          onChange={handleChange}
          style={style}
          sx={{ width: "20%" }}
        />

        <Autocomplete
          id="tags-outlined"
          sx={style}
          options={status}
          getOptionLabel={(option) => option?.label}
          onChange={(e, val) => setItem({ ...item, status: val?.value })}
          filterSelectedOptions
          defaultValue={item?._id ? status[item?.status].label : null}
          renderInput={(params) => <TextField {...params} label="Status" />}
          style={{ width: "20%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Autocomplete
          id="tags-outlined"
          sx={style}
          options={trade_style}
          getOptionLabel={(option) => option?.label}
          onChange={(e, val) => setItem({ ...item, trade_style: val.value })}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Trade Style" />
          )}
          style={{ width: "25%" }}
        />

        <TextField
          label="First Target Price"
          variant="outlined"
          name="first_target_price"
          type="number"
          fullWidth
          value={item?.first_target_price}
          onChange={handleChange}
          style={style}
          sx={{ width: "25%" }}
        />

        <TextField
          label="Second Target Price"
          variant="outlined"
          name="second_target_price"
          fullWidth
          type="number"
          value={item?.second_target_price}
          onChange={handleChange}
          style={style}
          sx={{ width: "25%" }}
        />

        <TextField
          label="Stop Loss"
          variant="outlined"
          name="stop_loss"
          fullWidth
          type="number"
          value={item?.stop_loss}
          onChange={handleChange}
          style={style}
          sx={{ width: "20%" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Autocomplete
          id="tags-outlined"
          sx={style}
          options={trade_result}
          getOptionLabel={(option) => option?.label}
          onChange={(e, val) => setItem({ ...item, trade_result: val?.value })}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Trade Result" />
          )}
          style={{ width: "24%" }}
        />

        <Autocomplete
          id="tags-outlined"
          sx={style}
          options={categories}
          getOptionLabel={(option) => option?.name}
          onChange={(e, val) => setItem({ ...item, category: val?._id })}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Markets" />}
          style={{ width: "24%" }}
        />

        <Autocomplete
          id="tags-outlined"
          sx={style}
          options={action}
          getOptionLabel={(option) => option?.label}
          onChange={(e, val) => setItem({ ...item, action: val?.value })}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Action" />}
          style={{ width: "24%" }}
        />

        <Autocomplete
          id="tags-outlined"
          sx={style}
          options={paid}
          getOptionLabel={(option) => option?.label}
          onChange={(e, val) => setItem({ ...item, is_paid: val?.value })}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Paid" />}
          style={{ width: "24%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextField
          label="Expire Time"
          variant="outlined"
          name="expire_time"
          value={item?.expire_time}
          onChange={handleChange}
          style={style}
          sx={{ width: "24%" }}
        />

        <TextField
          label="Win Rate"
          variant="outlined"
          name="win_rate"
          fullWidth
          type="number"
          value={item?.win_rate}
          onChange={handleChange}
          style={style}
          sx={{ width: "24%" }}
        />

        <TextField
          label="Open Price"
          variant="outlined"
          name="open_price"
          fullWidth
          type="number"
          value={item?.open_price}
          onChange={handleChange}
          style={style}
          sx={{ width: "24%" }}
        />
      </Box>

      <Box display={"flex"}>
        <Box>
          <p>Last Update</p>
          <input
            type="date"
            name="last_update"
            onChange={handleChange}
            value={item?.last_update}
            style={{ padding: "15px", marginBottom: "20px" }}
          />
        </Box>
        &nbsp;&nbsp;
        <Box>
          <p>Opening Time</p>
          <input
            type="date"
            name="opening_time"
            onChange={handleChange}
            value={item?.opening_time}
            style={{ padding: "15px", marginBottom: "20px" }}
          />
        </Box>
      </Box>

      <TextField
        label="Comment"
        variant="outlined"
        name="comment"
        fullWidth
        multiline
        rows={5}
        value={item?.comment}
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

export default EditRecommendation;
