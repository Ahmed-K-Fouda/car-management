import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({ isLoading, children, ...props }) => (
  <Button
    {...props}
    sx={{ borderRadius: 8, textTransform: "none", fontWeight: 600 }}
  >
    {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
  </Button>
);

export default CustomButton;
