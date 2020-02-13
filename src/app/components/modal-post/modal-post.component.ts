import { Component, Input } from '@angular/core';
import { ExtendedPost } from '../../services/posts.service';

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss']
})
export class ModalPostComponent {
  @Input() post: ExtendedPost | null;
  @Input() closeFunc: () => void;

  constructor() {}
}
