import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-header-stats',
  templateUrl: './profile-header-stats.component.html',
  styleUrls: ['./profile-header-stats.component.scss']
})
export class ProfileHeaderStatsComponent implements OnInit {

  @Input() value: number;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
