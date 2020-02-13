import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  userId: number;
  title: string;
  body: string;
  id: number;
}

export interface ExtendedPost {
  userId: number;
  title: string;
  body: string;
  id: number;
  userName: number;
  userCity: number;
  comments?: Comment[];
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
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

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
