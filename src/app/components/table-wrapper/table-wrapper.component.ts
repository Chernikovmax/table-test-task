import { Component, Input, OnInit, Output } from '@angular/core';
import { Post, Comment, PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent implements OnInit {
  @Input() search: string;
  posts: Post[] = [];
  comments: Comment[] = [];
  sortedHeader = '';
  isIncrease = false;
  isCommentsFetching = false;

  isModalVisible = false;
  currentPost: Post | null = null;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  closeModal = (): void => {
    this.isModalVisible = false;
    this.currentPost = null;
    this.comments = null;
  }

  fetchPosts(): void {
    this.postService.fetchPosts().subscribe(returnedPosts => {
      this.posts = returnedPosts;
    });
  }
  fetchComments(id: number): void {
    this.isCommentsFetching = true;
    this.isModalVisible = true;
    this.postService.fetchComments(id).subscribe(respComments => {
      this.comments = respComments;
      this.isCommentsFetching = false;
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
    this.fetchComments(id);
  }
}
