export const getCurrentDate = () => {
  const dateObj = new Date();
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const currentDate =
    dateObj.getDate() + "/" + month + "/" + dateObj.getFullYear();
  return currentDate;
};
