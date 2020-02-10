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

  strSort(key) {
    return (a, b) => (a[key] > b[key] ? 1 : -1);
  }
  numSort(key) {
    return (a, b) => a - b;
  }

  sortTable(title: string): void {
    const handleSort = (key: string, sortMethod): void => {
      if (this.sortedHeader === key) {
        this.posts.reverse();
        this.isIncrease = !this.isIncrease;
        return;
      }
      this.sortedHeader = key;
      this.isIncrease = true;
      this.posts.sort(sortMethod(key));
      return;
    };

    switch (title) {
      case 'email':
        handleSort('email', this.strSort);
        break;
      case 'name':
        handleSort('name', this.strSort);
        break;
      case 'body':
        handleSort('body', this.strSort);
        break;
      case 'postId':
        handleSort('postId', this.numSort);
        break;
      default:
        return;
    }
  }
}
