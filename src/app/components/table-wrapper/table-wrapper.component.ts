import { Component, Input, OnInit, Output } from '@angular/core';
import { Post, PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent implements OnInit {
  @Input() search: string;
  posts: Post[] = [];
  sortedHeader = '';
  isIncrease = false;

  isModalVisible = false;
  currentPost: Post | null = null;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  closeModal = (): void => {
    this.isModalVisible = false;
    this.currentPost = null;
  };

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

  openModal(id: number) {
    this.currentPost = this.posts.find(post => post.id === id);
    this.isModalVisible = true;
  }
}
