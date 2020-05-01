import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  search = '';

  constructor() { }

  ngOnInit(): void {
  }

  searchChange(next) {
    this.search = next;
  }

  clear() {
    console.log('cleat');
    this.search = '';
  }
}
