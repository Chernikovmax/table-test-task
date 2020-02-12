import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post, Comment, PostsService } from '../../services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent implements OnInit, OnDestroy {
  @Input() search: string;
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  comments: Comment[] = [];
  sortedHeader = '';
  isIncrease = false;
  isCommentsFetching = false;
  isModalVisible = false;
  currentPost: Post | null = null;
  subscriptions$: Subscription[] = [];
  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.subscriptions$.push(this.fetchPosts());
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  closeModal = (): void => {
    this.isModalVisible = false;
    this.currentPost = null;
    this.comments = null;
  };

  fetchPosts(): Subscription {
    return this.postService.fetchPosts().subscribe(returnedPosts => {
      this.posts = returnedPosts;
    });
  }
  fetchComments(id: number): Subscription {
    this.isCommentsFetching = true;
    this.isModalVisible = true;
    return this.postService.fetchComments(id).subscribe(respComments => {
      this.comments = respComments;
      this.isCommentsFetching = false;
    });
  }

  sortTable(title: string): void {
    const posts = this.search ? this.filteredPosts : this.posts;
    if (this.sortedHeader === title) {
      posts.reverse();
      this.isIncrease = !this.isIncrease;
      return;
    }
    this.sortedHeader = title;
    this.isIncrease = true;
    posts.sort((a, b) => (a[title] > b[title] ? 1 : -1));
    return;
  }

  filter(): void {
    if (!this.search) {
      this.filteredPosts = [];
      return;
    }
    this.filteredPosts = this.posts.filter(post =>
      post.body.includes(this.search)
    );
  }

  openModal(id: number) {
    this.currentPost = this.posts.find(post => post.id === id);
    this.subscriptions$.push(this.fetchComments(id));
  }
}
