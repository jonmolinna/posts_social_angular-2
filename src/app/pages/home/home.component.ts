import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SearchSuggestionsComponent } from '../../components/search-suggestions/search-suggestions.component';
import { UserService } from '../../services/users.services';
import { PostService } from '../../services/posts.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterModule, SearchSuggestionsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private userService = inject(UserService);
  private postService = inject(PostService);

  ngOnInit(): void {
    this.userService.getProfile();
    this.postService.getAllPosts();
    this.userService.getAllUsers();
  }
}
