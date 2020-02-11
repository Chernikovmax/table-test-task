import { Component, OnInit } from '@angular/core';
import { Post, PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent implements OnInit {
  posts: Post[] = [];
  sortedHeader = '';
  isIncrease = false;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.fetchPosts().subscribe(returnedPosts => {
      this.posts = returnedPosts;
    });
  }

  sortTable(title: string): void {
    if (this.sortedHeader === title) {
      this.posts.reverse();
      this.isIncrease = !this.isIncrease;
      return;
    }
    this.sortedHeader = title;
    this.isIncrease = true;
    this.posts.sort((a, b) => (a[title] > b[title] ? 1 : -1));
    return;
  }
}

