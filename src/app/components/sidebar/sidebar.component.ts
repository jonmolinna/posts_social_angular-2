import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';
import { AuthService } from '../../services/auth.services';
import { UserService } from '../../services/users.services';
import { userInterface } from '../../interface/user.interface';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, IconsModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  profile: WritableSignal<userInterface | null> = signal(null);

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.profile.set(this.userService.profile());
  }
}
