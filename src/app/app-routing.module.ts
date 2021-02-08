import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {TrackingComponent} from './components/tracking/tracking.component';
import {HistoryComponent} from './components/history/history.component';

const routes = [
  {path: '', component: MainComponent},
  {path: 'tracking', component: TrackingComponent},
  {path: 'history', component: HistoryComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
