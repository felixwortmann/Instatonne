import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-subscription-bottom-sheet',
  templateUrl: './subscription-bottom-sheet.component.html',
  styleUrls: ['./subscription-bottom-sheet.component.scss']
})
export class SubscriptionBottomSheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<SubscriptionBottomSheetComponent, boolean>) { }

  ngOnInit() {

  }

  unfollow() {
    this.bottomSheetRef.dismiss(true);
  }

  abort() {
    this.bottomSheetRef.dismiss(false);
  }
}
