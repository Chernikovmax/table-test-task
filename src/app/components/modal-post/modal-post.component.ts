import {Component, Input, OnInit} from '@angular/core';
import {Post, Comment} from '../../services/posts.service';

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent {
  @Input() post: Post | null;
  @Input() comments: Comment[] | null;
  @Input() isCommentsFetching: boolean;
  @Input() closeFunc: () => void;

  constructor() { }

}
