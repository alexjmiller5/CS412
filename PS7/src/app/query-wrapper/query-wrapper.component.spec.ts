import { Component } from '@angular/core';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-query-wrapper',
  templateUrl: './query-wrapper.component.html'
})
export class QueryWrapperComponent {
  data: any;

  constructor(private queryService: QueryService) {}

  onQuery(searchTerm: string) {
    this.queryService.fetchData(searchTerm).subscribe(
      response => {
        this.data = response;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}