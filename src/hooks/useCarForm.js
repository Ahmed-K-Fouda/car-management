import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addNewCar, updateCar } from "../store/carSlice";
import toast from "react-hot-toast";

export const useCarForm = (isSelected, setIsSelected) => {
  const dispatch = useDispatch();
  const [car, setCar] = useState({
    model: "",
    price: "",
    color: "",
    date: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSelected) setCar(isSelected);
  }, [isSelected]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  }, []);

  //   help with gpt for use - useCallBack
  const handleSubmit = useCallback(() => {
    // check if all inputs has value to add
    if (!car.model || !car.price || !car.color || !car.date || !car.image) {
      toast.error("Please fill all fields!", {
        iconTheme: {
          primary: "#383333",
          secondary: "#fff",
        },
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // check if the user select car to update it
      if (isSelected) {
        dispatch(updateCar({ index: isSelected.index, updateCar: car }));
        toast.success("Car updated successfully!");
        setIsSelected(null);
      } else {
        dispatch(addNewCar(car));
        toast.success("Car added successfully!");
      }
      //   clear all inputs after add or update
      setCar({ model: "", price: "", color: "", date: "", image: "" });
      setIsLoading(false);
    }, 1000);
  }, [car, dispatch, isSelected, setIsSelected]);

  return { car, isLoading, handleChange, handleSubmit };
};
