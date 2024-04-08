import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';

@Component({
  selector: 'news-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule
  ],
  providers:[
    NewsletterService
  ],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss'
})
export class NewsFormComponent {

  newLetterForm!: FormGroup;
  loading =  signal(false);

  constructor(private newsletterService: NewsletterService) {
    this.newLetterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    this.loading.set(true);
    if(this,this.newLetterForm.valid) {
      this.newsletterService.sendData(this.newLetterForm.value.name, this.newLetterForm.value.email).subscribe({
        complete: () => {
          this.newLetterForm.reset();
          this.loading.set(false);
        }
      })
    }

  }

}
