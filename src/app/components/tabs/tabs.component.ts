import { Component } from '@angular/core';
import { IconsModule } from '../icons/icons.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IconsModule, RouterModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {}
