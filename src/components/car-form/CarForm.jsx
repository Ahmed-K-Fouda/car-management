import { Box, MenuItem, TextField } from "@mui/material";
import { useCarForm } from "../../hooks/useCarForm";
import { carColors } from "../../constants/colors/colors";
import CustomButton from "../ui/CustomButton";

function CarForm({ isSelected, setIsSelected }) {
  const { car, isLoading, handleChange, handleSubmit, checkValidity } =
    useCarForm(isSelected, setIsSelected);

  return (
    <Box sx={{ p: 3, boxShadow: 4, borderRadius: 3 }}>
      <TextField
        label="Car Model"
        name="model"
        fullWidth
        margin="normal"
        value={car.model}
        onChange={handleChange}
      />
      <TextField
        label="Car Price"
        name="price"
        fullWidth
        margin="normal"
        type="number"
        value={car.price}
        onChange={handleChange}
      />
      <TextField
        select
        label="Car Color"
        name="color"
        fullWidth
        margin="normal"
        value={car.color}
        onChange={handleChange}
      >
        {carColors.map((color) => (
          <MenuItem key={color} value={color}>
            {color}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Manufacture Date"
        type="date"
        margin="normal"
        name="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={car.date}
        onChange={handleChange}
      />
      <TextField
        label="Car Image URL"
        name="image"
        fullWidth
        margin="normal"
        value={car.image || ""}
        onChange={handleChange}
      />
      <CustomButton
        disabled={checkValidity}
        onClick={handleSubmit}
        variant="contained"
        fullWidth
        color="success"
        isLoading={isLoading}
      >
        {isSelected ? "Save Changes" : "Add New Car"}
      </CustomButton>
    </Box>
  );
}

export default CarForm;
