import { Container, Typography } from "@mui/material";
import CarForm from "./components/car-form/CarForm";
import CarList from "./components/car-list/CarList";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [isSelected, setIsSelected] = useState(null);
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" textAlign="center">
        Car Management
      </Typography>
      <CarForm isSelected={isSelected} setIsSelected={setIsSelected} />
      <CarList setIsSelected={setIsSelected} />
      <Toaster position="top-center" />
    </Container>
  );
}

export default App;


/** notes
 * Material UI Theme Configuration
 * 
 * Customized theme for the project, including primary and secondary colors,
 * typography settings, and component styling.
 * 
 * Author: [Ahmed Khaled Fouda]
 */
