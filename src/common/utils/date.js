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

export const formatDate = (date) => {
  const dateObj = new Date(date);
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const formatedDate =
    dateObj.getDate() + "/" + month + "/" + dateObj.getFullYear();
  return formatedDate;
};

export const formatDateTime = (dateTime) => {
  const dateObj = new Date(dateTime);
  let month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let hour = dateObj.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }

  let minute = dateObj.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  const formatedDateTime =
    dateObj.getDate() +
    "/" +
    month +
    "/" +
    dateObj.getFullYear() +
    " " +
    hour +
    ":" +
    minute;
  return formatedDateTime;
};
