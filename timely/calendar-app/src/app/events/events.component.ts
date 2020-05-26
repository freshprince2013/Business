import { Component, OnInit } from '@angular/core';
import {EventsService} from './events.service';
import {SettingsService} from '../settings/settings.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CalendarModel} from '../model/calendar.model';
import {EventModel} from '../model/event.model';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-listings',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit {
  isLinear = true;
  totalDaysInFocusMonth = 0;
  monthInFocus = 0;
  yearInFocus = 0;
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isPrevMonthDisabled = false;
  isPrevYearDisabled = false;
  isNextMonthDisabled = false;
  isNextYearDisabled = false;
  calendars: CalendarModel[] = [];
  events: EventModel[] = [];
  selectedEvent: EventModel = null;

  constructor(private _formBuilder: FormBuilder,
              private _settingsService: SettingsService,
              private _eventsService: EventsService) { }

  ngOnInit(): void {
    this.getEventsPerCalendar();
    this.firstFormGroup = this._formBuilder.group({
      calendarNameCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.monthInFocus = this.getCurrentMonth();
    this.yearInFocus = this.getCurrentYear();

    this.totalDaysInFocusMonth = this.getTotalDaysInMonth(this.monthInFocus, this.yearInFocus);
    console.log(this.totalDaysInFocusMonth);
  }

  getEventsPerCalendar() {
    this._settingsService.postCalendarSettings().subscribe( (settings: any) => {
      console.log(settings);

      let calendar: CalendarModel = {
        id: settings.data.id,
        title: settings.data.title,
        product: settings.data.product
      };

      this.calendars.push(calendar);

      console.log(this.calendars);

      this._eventsService.getEventList(settings.data.id).subscribe((events: any) => {
        events.data.items.forEach((item) => {
          let event: EventModel = {
            id: item.id,
            calendarId: item.calendar_id,
            author: item.user,
            title: item.title,
            description: item.description_short,
            startTime: item.start_datetime,
            endTime: item.end_datetime,
            timeZone: item.timezone,
            status: item.event_status
          };

          this.events.push(event);
        });

        console.log(this.events);
      });
    });
  }

  getTotalDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getCurrentDay() {
    return new Date().getDate();
  }

  getCurrentMonth() {
    return new Date().getMonth() + 1;
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

  getMonthName(month) {
    return this.monthNames[month - 1];
  }

  counter(days) {
    return new Array(days);
  }

  isCurrentDate(day) {
    return (this.yearInFocus === this.getCurrentYear()) ? ( (this.monthInFocus === this.getCurrentMonth()) ? ( (day === this.getCurrentDay()) ) : false ) : false;
  }

  prevYear() {
    if (this.yearInFocus <= 1980) {
      this.isPrevYearDisabled = true;
    } else {
      this.yearInFocus--;
    }

    this.totalDaysInFocusMonth = this.getTotalDaysInMonth(this.monthInFocus, this.yearInFocus);
  }

  prevMonth() {
    if (this.yearInFocus <= 1980 && this.monthInFocus === 1) {
      this.isPrevMonthDisabled = true;
    } else {
      if (this.monthInFocus > 1) {
        this.monthInFocus--;
      } else {
        this.monthInFocus = 12 + this.monthInFocus - 1;
        this.yearInFocus--;
      }
    }

    this.totalDaysInFocusMonth = this.getTotalDaysInMonth(this.monthInFocus, this.yearInFocus);
  }

  nextMonth() {
    if (this.yearInFocus >= 2025 && this.monthInFocus === 12) {
      this.isNextMonthDisabled = true;
    } else {
      if (this.monthInFocus < 12) {
        this.monthInFocus++;
      } else {
        this.monthInFocus = 12 - this.monthInFocus + 1;
        this.yearInFocus++;
      }
    }

    this.totalDaysInFocusMonth = this.getTotalDaysInMonth(this.monthInFocus, this.yearInFocus);
  }

  nextYear() {
    if (this.yearInFocus >= 2025) {
      this.isNextYearDisabled = true;
    } else {
      this.yearInFocus++;
    }

    this.totalDaysInFocusMonth = this.getTotalDaysInMonth(this.monthInFocus, this.yearInFocus);
  }

  focusCurrentDate() {
    this.monthInFocus = this.getCurrentMonth();
    this.yearInFocus = this.getCurrentYear();
    this.totalDaysInFocusMonth = this.getTotalDaysInMonth(this.monthInFocus, this.yearInFocus);
  }

  pad(n: number) {
    return (n < 10) ? ('0' + n) : n;
  }

  getInFocusTimeStamp(day: number) {
    let date = this.yearInFocus + '-' + this.pad(this.monthInFocus) + '-' + this.pad(day);
    return new Date(date).getTime();
  }

  getTimeStamp(date: string) {
    return new Date(date).getTime();
  }

  getDateTimeParams(type: string, date: string) {
    let dateTimeArr = date.split(' ');
    let result = '';

    switch (type) {
      case "date"   : result = dateTimeArr[0].trim();
                     break;
      case "time"   : result = dateTimeArr[1].trim();
                     break;
    }

    return result;
  }

  setEventAndMoveStepper(stepper: MatStepper, event: EventModel) {
    this.selectedEvent = event;
    console.log(this.selectedEvent);
    stepper.next();
  }

  reset(stepper: MatStepper) {
    stepper.reset();
    this.selectedEvent = null;
    this.firstFormGroup.reset();
  }
}
