import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IconsModule } from '../icons/icons.module';
import { UserService } from '../../services/users.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userInterface } from '../../interface/user.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-suggestions',
  standalone: true,
  imports: [IconsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './search-suggestions.component.html',
})
export class SearchSuggestionsComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  hidden: WritableSignal<boolean> = signal(true);
  users: WritableSignal<userInterface[]> = signal([]);
  input: string = '';

  onInputChange() {
    const result = this.userService
      .users()
      .filter(
        (user) =>
          user.name.toLowerCase().includes(this.input.toLowerCase().trim()) ||
          user.username.toLowerCase().includes(this.input.toLowerCase().trim())
      )
      .slice(0, 4);

    if (this.input.trim().length < 1) {
      this.users.set([]);
      return;
    }

    this.users.set(result);
  }

  handleRedirect(username: string) {
    this.router.navigate([`/profile/${username}`]);
    this.input = '';
    this.users.set([]);
  }
}
