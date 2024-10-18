import { IEventAttendanceDetails } from "./types";

interface AttendanceInfo {
  seatsLeft: number;
  percentageFilled: number;
}

export const calculateSeatsInfo = (attendanceEvent: IEventAttendanceDetails): AttendanceInfo => {
  const { number_of_seats_taken = 0, max_capacity = 0 } = attendanceEvent || {};
  const seatsLeft = max_capacity - number_of_seats_taken;
  const percentageFilled = (number_of_seats_taken / max_capacity) * 100;
  return { seatsLeft, percentageFilled };
};

export const selectIndicatorColor = (percentageFilled: number): string => {
  if (percentageFilled >= 90) return 'bg-red-500';
  if (percentageFilled >= 75) return 'bg-orange-400';
  return 'bg-green-500';
};

export const determineTimeBeforeRegistrationOpens = (registrationStart: Date) => {
  const timeDiff = registrationStart.getTime() - new Date().getTime();

  return {
    daysDiff: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hoursDiff: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutesDiff: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
  };
};

export const determineStatusText = (
  isRegistrationEnded: boolean,
  { daysDiff, hoursDiff, minutesDiff }: { daysDiff: number; hoursDiff: number; minutesDiff: number },
  seatsLeft: number,
  numberOnWaitlist: number
): string => {
  if (daysDiff > 0) {
    return `Påmelding åpner om ${daysDiff} ${daysDiff === 1 ? 'dag' : 'dager'}`;
  } else if (hoursDiff > 0) {
    return `Påmelding åpner om ${hoursDiff} ${hoursDiff === 1 ? 'time' : 'timer'}`;
  } else if (minutesDiff > 0) {
    return `Påmelding åpner om ${minutesDiff} ${minutesDiff === 1 ? 'minutt' : 'minutter'}`;
  } else if (isRegistrationEnded) {
    return 'Påmeldingsfrist utløpt';
  } else if (seatsLeft === 0 && numberOnWaitlist === 0) {
    return 'Ingen plasser igjen';
  } else if (numberOnWaitlist > 0) {
    return `${numberOnWaitlist} på venteliste`;
  }
  return `${seatsLeft} ${seatsLeft === 1 ? 'plass' : 'plasser'} igjen`;
};