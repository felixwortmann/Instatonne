import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from 'src/app/generated/models';
import { UsersService } from 'src/app/generated/services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  search = '';

  searchResults$ = new Subject<User[]>();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  searchChange(next) {
    this.search = next;
  }

  clear() {
    this.search = '';
  }

  trigger() {
    this.usersService.searchUsers({ searchTerm: '' }).subscribe(this.searchResults$);
    console.log('trigger');
  }
}
