import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../services/posts.service';

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent {
  @Input() post: Post | null;
  @Input() closeFunc: () => void;

  constructor() { }

}
