/**
 * This component was developed using Material UI with assistance from GPT.
 * i'm not used Material UI a lot but i learning it and i will improve myself to be better
 * Developed by: [Ahmed Khaled Fouda]
 */

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useCarList } from "../../hooks/useCarList";
import CustomButton from "../ui/CustomButton";
import Spinner from "../ui/Spinner";
import { formatPrice } from "../../utils/formatPrice";

function CarList({ setIsSelected }) {
  const {
    cars,
    loading,
    selectedCars,
    setSelectedCars,
    isOpen,
    setIsOpen,
    sortBy,
    setSortBy,
    handleDeleteConfirm,
    sortedCars,
  } = useCarList();

  //  to check if the screen become small to make scroll
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return loading ? (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Spinner />
      <Typography>LOADING...</Typography>
    </Box>
  ) : sortedCars.length ? (
    <Box sx={{ mt: 3, p: 3, boxShadow: 4, borderRadius: 3 }}>
      <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
        Car List
      </Typography>

      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Sort By</MenuItem>
        <MenuItem value="name">Sort By Name</MenuItem>
        <MenuItem value="date">Sort By Date</MenuItem>
        <MenuItem value="date">Sort By Price</MenuItem>
      </Select>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Car Color</TableCell>
              <TableCell>Car Model</TableCell>
              <TableCell>Car Price</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCars.map((car, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={selectedCars.includes(index)}
                    onChange={(e) =>
                      setSelectedCars(
                        e.target.checked
                          ? [...selectedCars, index]
                          : selectedCars.filter((i) => i !== index)
                      )
                    }
                  />
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: car.color,
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      display: "inline-block",
                    }}
                  ></Box>
                </TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{formatPrice(car.price, "USD", "en-US")}</TableCell>
                <TableCell>
                  <CustomButton
                    onClick={() => setIsSelected({ ...car, index })}
                    variant="contained"
                    color="warning"
                    sx={{
                      fontSize: isSmallScreen ? "12px" : "16px",
                      padding: isSmallScreen ? "4px 8px" : "6px 16px",
                    }}
                  >
                    Edit
                  </CustomButton>
                </TableCell>
                <TableCell>
                  <img
                    src={car.image}
                    alt={car.model}
                    style={{
                      width: isSmallScreen ? "40px" : "50px",
                      height: isSmallScreen ? "40px" : "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography textAlign="center" sx={{ mt: 2 }}>
        The Total Cars Added{" "}
        <span style={{ color: "green" }}>({cars.length})</span>
      </Typography>

      {selectedCars.length > 0 && (
        <CustomButton
          onClick={() => setIsOpen(true)}
          variant="contained"
          color="error"
          fullWidth
          sx={{
            mt: 2,
            fontSize: isSmallScreen ? "12px" : "16px",
            padding: isSmallScreen ? "6px" : "10px",
          }}
        >
          Delete Selected Cars
        </CustomButton>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected cars?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </CustomButton>
          <CustomButton onClick={handleDeleteConfirm} color="error">
            Delete
          </CustomButton>
        </DialogActions>
      </Dialog>
    </Box>
  ) : (
    <Typography sx={{ textAlign: "center", marginTop: "2rem" }}>
      No Car Added Yet! Feel Free To Add Your Car 😃
    </Typography>
  );
}

export default CarList;
