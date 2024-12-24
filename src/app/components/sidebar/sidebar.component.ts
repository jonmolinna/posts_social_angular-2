import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, IconsModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
