import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  Post,
  Comment,
  PostsService,
  User,
  ExtendedPost
} from '../../services/posts.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent implements OnInit, OnDestroy {
  @Input() search: string;
  posts = [];
  filteredPosts: ExtendedPost[] = [];
  sortedHeader = '';
  isIncrease = false;
  isModalVisible = false;
  currentPost: ExtendedPost | null = null;
  subscriptions$ = [];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.subscriptions$.push(this.fetchData());
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  closeModal = (): void => {
    this.isModalVisible = false;
    this.currentPost = null;
  };

  fetchData(): Subscription {
    this.subscriptions$.push(this.postService.fetchUsers());
    this.subscriptions$.push(this.postService.fetchPosts());
    return forkJoin(this.subscriptions$).subscribe((val: [User[], Post[]]) => {
      const [users, posts] = val;
      posts.forEach((post, ind) => {
        const postOwner: User = users.find(
          userObj => userObj.id === post.userId
        );
        const result: {} = {
          userName: postOwner.name,
          userCity: postOwner.address.city,
          ...post
        };
        this.posts.push(result);
        this.subscriptions$.push(
          this.postService
            .fetchComments(post.id)
            .subscribe((response: Comment[]) => {
              const currentPost = this.posts[ind];
              currentPost.comments = response;
            })
        );
      });
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
    if (title === 'comments') {
      posts.sort((a, b) => (a[title].length > b[title].length ? 1 : -1));
    }
    posts.sort((a, b) => (a[title] > b[title] ? 1 : -1));
    return;
  }

  filter(): void {
    if (!this.search) {
      this.filteredPosts = [];
      return;
    }
    this.filteredPosts = this.posts.filter(post =>
      post.title.includes(this.search) || post.body.includes(this.search)
    );
  }

  openModal(id: number) {
    this.currentPost = this.posts.find(post => post.id === id);
    this.isModalVisible = true;
  }
}
