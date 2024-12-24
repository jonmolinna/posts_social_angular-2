import { Component } from '@angular/core';
import { IconsModule } from '../icons/icons.module';

@Component({
  selector: 'app-card-skeleton',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './card-skeleton.component.html',
})
export class CardSkeletonComponent {}
