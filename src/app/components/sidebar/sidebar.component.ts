import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { AuthService } from '../../services/auth.services';
import { UserService } from '../../services/users.services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, IconsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  readonly auth = this.userService.profile.asReadonly();

  logout(): void {
    this.authService.logout();
  }
}
