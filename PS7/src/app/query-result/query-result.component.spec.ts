import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html'
})
export class QueryResultComponent {
  @Input() data: any;
}