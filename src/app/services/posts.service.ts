import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// I made wrong structure, because there's no mocks in jsonplaceholder that will satisfy requirements in test task
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts?_limit=25'
    );
  }
  fetchComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
  }
}
