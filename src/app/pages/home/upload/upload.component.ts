import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../../services/posts.services';
import { postInterface } from '../../../interface/post.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IconsModule } from '../../../components/icons/icons.module';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, IconsModule],
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  private postService = inject(PostService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  readonly loading: WritableSignal<boolean> = signal(false);
  imageSrc: string = '';
  comment = new FormControl('');
  image = new FormControl('');
  imageFile: any = '';

  readImageUrl(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imageFile = file;
      this.imageSrc = URL.createObjectURL(file);
    }
  }

  handleSubmit() {
    this.loading.set(true);
    const formData = new FormData();
    const comment = this.comment.value || '';
    formData.append('file', this.imageFile);
    formData.append('comment', comment);

    this.postService.handleAddPost(formData).subscribe({
      next: (data: postInterface) => {
        this.loading.set(false);
        this.router.navigate(['/home']);
        this.comment.reset();
        this.image.reset();
        this.imageSrc = '';
        this.imageFile = '';
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        if (error.status === 500) {
          this.toastr.error('Ocurrio un error', 'Error');
        } else if (error.status === 401) {
          this.toastr.error('Inicie Sesión', 'Error');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Ocurrio un error', 'Error');
        }
      },
    });
  }
}
