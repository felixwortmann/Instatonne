import { Component } from '@angular/core';
import { PostsService } from '../../generated/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  url: string | ArrayBuffer = '';
  caption: string;
  file: File;
  encodedImg: string;

  constructor(private postsService: PostsService, private router: Router) {
  }

  onSelectFile(event) {
    if (event.target.files as File && event.target.files[0] as File) {
      const reader = new FileReader();
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = (img) => {
        this.url = img.target.result;
      };
      document.getElementsByClassName('hidden')[0].classList.remove('hidden');
    }
  }

  onFileChanged(event) {
    this.encodedImg = event[0].base64.split(',')[1];
  }

  upload() {
    const body = { image: this.encodedImg, text: this.caption };
    this.postsService.createPost({ body }).subscribe();
    this.router.navigate(['/']);
  }

  save(value) {
    this.caption = value;
  }
}
