export const formatTime = arrivalTime => {
  let minutes =
    arrivalTime.minutes !== null
      ? arrivalTime.minutes.toString().padStart(2, "0")
      : "00";

  let hours = ``;
  if (arrivalTime.hours < 13) {
    hours = arrivalTime.hours;
  } else if (arrivalTime.hours < 25) {
    hours = arrivalTime.hours - 12;
  } else if (arrivalTime.hours > 24) {
    hours = arrivalTime.hours - 24;
  }

  return `${hours}:${minutes}`;
};

export default formatTime;
