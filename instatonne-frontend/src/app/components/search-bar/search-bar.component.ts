import { Component, OnInit } from '@angular/core';
import { Subject, Observable, EMPTY, of, combineLatest, merge } from 'rxjs';
import { User } from 'src/app/generated/models';
import { UsersService } from 'src/app/generated/services';
import { throttleTime, switchMap, debounceTime, shareReplay, take, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  search = '';
  focus?: number = null;

  searchTerm$ = new Subject<string>();
  searchResults$: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const merged = merge(
      this.searchTerm$.pipe(debounceTime(300)),
      this.searchTerm$.pipe(filter(term => term === ''))
    );
    this.searchResults$ = merged.pipe(
      // debounceTime(100),
      switchMap(searchTerm => {
        if (searchTerm.length === 0) {
          return of(null);
        }
        return this.usersService.searchUsers({ searchTerm });
      }),
      switchMap(users => {
        if (users && users.length > 0) {
          return of(users);
        } else {
          return of(null);
        }
      }),
      shareReplay(1)
    );
  }

  searchChange(next) {
    this.search = next;
    this.searchTerm$.next(next);
  }

  clear() {
    this.searchChange('');
    this.focus = null;
  }

  trigger() {
    this.searchResults$.pipe(
      take(1),
      filter(x => !!x),
      filter(users => users.length > 0)
    ).subscribe(users => {
      this.router.navigate(['/u/' + users[this.focus ?? 0].username]);
      this.clear();
    });
  }

  moveFocus(direction: number) {
    this.searchResults$.pipe(
      take(1),
      map(results => results.length)
    ).subscribe(resultLength => {
      if (this.focus === null) {
        if (direction === 1) {
          this.focus = 0;
        } else {
          this.focus = resultLength - 1;
        }
      } else if (direction === 1 && this.focus < resultLength - 1) {
        this.focus++;
      } else if (direction === -1 && this.focus > 0) {
        this.focus--;
      }
    });
  }
}
