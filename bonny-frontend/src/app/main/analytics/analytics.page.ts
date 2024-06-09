import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stats } from 'src/app/model/Stats';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit {

  version: string = ""

  constructor(private http: HttpClient) { 
    this.version = environment.version
  }

  stats: Stats

  ngOnInit() {
    this.getStats()
  }

  getStats(event?: any) {
    this.http.get<Stats>(`${environment.backendUrl}/stats`).subscribe((stats: Stats) => {
      this.stats = stats
      if(event) event.target.complete()
    })
  }

}
