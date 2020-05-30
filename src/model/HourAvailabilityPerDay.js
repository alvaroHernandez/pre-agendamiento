export default class HourAvailabilityPerDay {
  constructor(
    hour,
    mondayIsAvailable,
    tuesdayIsAvailable,
    wednesdayIsAvailable,
    thursdayIsAvailable,
    fridayIsAvailable,
  ) {
    this.hour = hour;
    this.mondayIsAvailable = mondayIsAvailable;
    this.tuesdayIsAvailable = tuesdayIsAvailable;
    this.wednesdayIsAvailable = wednesdayIsAvailable;
    this.thursdayIsAvailable = thursdayIsAvailable;
    this.fridayIsAvailable = fridayIsAvailable;
  }
}
