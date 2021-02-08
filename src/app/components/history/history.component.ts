import {Component, OnInit} from '@angular/core';
import {HistoryService} from '../../services/history.service';
import {TrackedTimeModel} from '../../models/TrackedTimeModel';
import {HistoryModel} from '../../models/HistoryModel';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: HistoryModel;

  constructor(private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.getToday();
  }

  private getToday(): void {
    this.historyService.today().subscribe(r => this.history = r);
  }

  private getWeek(): void {
    this.historyService.week().subscribe(r => this.history = r);
  }

  private getMonth(): void {
    this.historyService.month().subscribe(r => this.history = r);
  }

  calcHours(t: TrackedTimeModel): number | string {
    if (!t.endTime) {
      return 'N/A';
    }
    const time = Math.abs(t.startTime - t.endTime);
    return this.msToTime(time);
  }

  msToTime(duration): string {
    const milliseconds = parseInt(String((duration % 1000) / 100), 10);
    let seconds: string | number = Math.floor((duration / 1000) % 60);
    let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
    let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return hours + ':' + minutes + ':' + seconds;
  }

  show(value: 'today' | 'week' | 'month'): void {
    if (value === 'today') {
      this.getToday();
    } else if (value === 'week') {
      this.getWeek();
    } else {
      this.getMonth();
    }
  }
}
