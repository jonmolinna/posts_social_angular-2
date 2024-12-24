import { Component } from '@angular/core';
import { IconsModule } from '../icons/icons.module';

@Component({
  selector: 'app-search-suggestions',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './search-suggestions.component.html',
})
export class SearchSuggestionsComponent {}
