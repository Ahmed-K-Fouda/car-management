import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar } from "../store/carSlice";
import { toast } from "react-hot-toast";

export const useCarList = () => {
  const cars = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCars, setSelectedCars] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    dispatch(deleteCar(selectedCars));
    toast.success("The car(s) deleted successfully!");
    setSelectedCars([]);
    setIsOpen(false);
  }, [dispatch, selectedCars]);

  // to prevent re-render every time sorting the array
  const sortedCars = useMemo(() => {
    if (sortBy === "name") {
      return [...cars].sort((a, b) => a.model.localeCompare(b.model));
    } else if (sortBy === "date") {
      return [...cars].sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "price") {
      return [...cars].sort((a, b) => a.price - b.price);
    }
    return cars;
  }, [cars, sortBy]);

  return {
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
  };
};
