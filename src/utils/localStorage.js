// get data from localstorage if exist
export const getDataFromLocalStorage = function () {
  const data = localStorage.getItem("cars");
  return data ? JSON.parse(data) : [];
};

// save data to local storage
export const saveDataToLocalStorage = function (cars) {
  localStorage.setItem("cars", JSON.stringify(cars));
};
