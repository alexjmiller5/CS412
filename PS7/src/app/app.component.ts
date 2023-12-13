import { Component } from '@angular/core';
import { QueryWrapperComponent } from './query-wrapper/query-wrapper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [QueryWrapperComponent],
})
export class AppComponent {
  // You can add properties or methods here as needed for your app logic
  title = 'PS7';

  constructor() {
    // Any initialization code can go here
  }

  // Additional methods or lifecycle hooks (like ngOnInit, etc.) can be added here
}
