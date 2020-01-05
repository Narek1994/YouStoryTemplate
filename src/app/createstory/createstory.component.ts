import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthCookie } from '../AuthCookie/AuthCookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createstory',
  templateUrl: './createstory.component.html',
  styleUrls: ['./createstory.component.css']
})

@Injectable()
export class CreatestoryComponent implements OnInit {

  textTitle = '';
  text = '';
  title = 'angular-image-uploader';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  categories = [];
  selectedCategories = [];
  ages = [];
  selectedAge = { item_id: 0, item_text: '0+' };
  ageSettings = {};
  dropdownSettings = {};
  cookie = new AuthCookie();
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.categories = [
      { item_id: 1, item_text: 'Comedy' },
      { item_id: 2, item_text: 'Drama' },
      { item_id: 3, item_text: 'Horror' },
      { item_id: 4, item_text: 'Realism' },
      { item_id: 5, item_text: 'Romance' },
      { item_id: 6, item_text: 'Satire' },
      { item_id: 7, item_text: 'Tragedy' },
      { item_id: 8, item_text: 'Thriller' },
      { item_id: 9, item_text: 'Fantasy' },
      { item_id: 10, item_text: 'Mystery' },
      { item_id: 11, item_text: 'Detective' },
      { item_id: 12, item_text: 'Children' },
      { item_id: 13, item_text: 'Adult' }
    ];
    this.ages = [
      { item_id: 0, item_text: '0+' },
      { item_id: 13, item_text: '13+' },
      { item_id: 16, item_text: '16+' },
      { item_id: 18, item_text: '18+' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };
    this.ageSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    console.log(this.cookie.getAuth());
  }

  fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      const blob = this.converterDataURItoBlob(this.croppedImage);
      this.croppedBlob = blob;
      console.log(blob);
  }

  onSubmit() {
      const body = JSON.stringify({
        age: this.selectedAge.item_id,
        title: this.textTitle,
        text: this.text,
        categoryIds: this.selectedCategories.map(category => category.item_id)
      });
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Authorization', 'Bearer ' + this.cookie.getAuth());
      this.http.post<Story>('https://api.youstory.io/story_api/story', body, {headers})
      .subscribe(data => {
        if (this.croppedBlob != null) {
          let multipartHeaders = new HttpHeaders();
          multipartHeaders = multipartHeaders.set('Authorization', 'Bearer ' + this.cookie.getAuth());
          const formData = new FormData();
          formData.append('image', this.croppedBlob, 'file.jpeg');
          this.http.put(`https://api.youstory.io/story_api/story/${data.result.storyHeader.id}/image`,
                          formData,
                          {headers: multipartHeaders})
          .subscribe(res => {
            alert('Story successfully created');
            this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/create']);
            });
          });
        } else {
          alert('Story successfully created');
          this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/create']);
          });
        }
      });
  }

  onAgeSelect(item: {item_id: number, item_text: string}) {
    this.selectedAge = item;
    console.log(item.item_id);
  }

  converterDataURItoBlob(dataURI) {
    let byteString;
    let mimeString;
    let ia;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = encodeURI(dataURI.split(',')[1]);
    }
    // separate out the mime component
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }
}
