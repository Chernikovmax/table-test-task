import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../services/posts.service';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(posts: Post[], search: string = ''): Post[] {
    if (!search.trim) {
      return posts;
    }
    return posts.filter(post =>
      post.body.toLowerCase().includes(search.toLowerCase())
    );
  }
}
