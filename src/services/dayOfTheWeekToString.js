const dayOfTheWeekToString = (dayNumber) => {
  switch (dayNumber) {
    case 1:
      return "LUN";
    case 2:
      return "MAR";
    case 3:
      return "MIE";
    case 4:
      return "JUE";
    case 5:
      return "VIE";
    case 6:
      return "SAB";
    case 7:
      return "DOM";
    default:
      return ""
  }
};

export default dayOfTheWeekToString;
