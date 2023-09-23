import { Month } from "@prisma/client";

export function getDateFromISOString(time?: string) {
  const timeString = time ? new Date(time) : new Date();

  const day = timeString.getDate();
  const month = timeString.getMonth() + 1;

  function year() {
    const _y = timeString.getFullYear().toString();
    let y = "";
    for (let i: number = _y.length - 1; i > 0; i--) {
      if (i > (_y.length - 1) / 2) {
        y = _y[i] + y;
      }
    }
    return y;
  }
  const date = `${day < 9 ? `0${day}` : day}/${
    month < 9 ? `0${month}` : month
  }/${year()}`;

  function formatTime() {
    let h = timeString.getHours();
    let m = timeString.getMinutes();
    let suffix = "AM";
    if (h > 11) {
      suffix = "PM";
    }
    h = h == 0 ? 12 : h;
    h = h > 13 ? h - 12 : h;
    return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`} ${suffix}`;
  }

  return { date, time: formatTime() };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedFunc = (...args: Parameters<T>): void => {
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFunc.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunc as T & { cancel: () => void };
}

export function getFullMonthFromMonthCode(month: Month) {
  let fullMonth = "";
  switch (month) {
    case "APR":
      fullMonth = "April";
      break;
    case "AUG":
      fullMonth = "August";
      break;
    case "DEC":
      fullMonth = "December";
      break;
    case "FEB":
      fullMonth = "February";
      break;
    case "JAN":
      fullMonth = "January";
      break;
    case "JUL":
      fullMonth = "July";
      break;
    case "JUN":
      fullMonth = "June";
      break;
    case "MAR":
      fullMonth = "March";
      break;
    case "MAY":
      fullMonth = "May";
      break;
    case "NOV":
      fullMonth = "November";
      break;
    case "OCT":
      fullMonth = "October";
      break;
    case "SEP":
      fullMonth = "September";
      break;
    default:
      fullMonth = month;
      break;
  }
  return fullMonth;
}
