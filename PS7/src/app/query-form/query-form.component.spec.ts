import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html'
})
export class QueryFormComponent {
  @Output() query = new EventEmitter<string>();

  form = new FormGroup({
    searchTerm: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  onSubmit() {
    if (this.form.valid) {
      // Use the nullish coalescing operator to ensure a string is emitted
      const searchTerm: string | undefined = this.form.value.searchTerm ?? undefined;
      this.query.emit(searchTerm);
    }
  }
}