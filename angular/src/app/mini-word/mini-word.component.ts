import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ArticleService} from "../services/article.service";

@Component({
  selector: 'app-mini-word',
  templateUrl: './mini-word.component.html',
  styleUrls: ['./mini-word.component.css'],
})
export class MiniWordComponent {
  textColor: string = '';
  fontSize: number = 16;
  fontFamily: string = 'Arial';

  editableText = '';

  constructor(private router: Router, private toastr: ToastrService , private articleservice : ArticleService) {
  }

  articleTitle: string = '';
  lastKnownRange: Range | null = null;
  textStyle: any = {};
  readonly staticImages: string[] = [
    './../../assets/images/bg1.jpg',
    './../../assets/images/bg3.jpg',
    './../../assets/images/bg4.jpg',
    './../../assets/images/header.jpg',
    './../../assets/images/bg2.jpg',
  ];

  applyStyle(): void {
    this.textStyle = {
      'color': this.textColor,
      'font-size': `${this.fontSize}px`,
      'font-family': this.fontFamily,
    };
  }

  toggleStyle(style: string): void {
    document.execCommand(style, false);
  }

  updateText(event: Event): void {
    const element = event.target as HTMLElement;
    this.editableText = element.innerText;
  }

  publishArticle(): void {
    const articleContent = this.editableText;
    // Basic Validation ll mini word
    if (!this.articleTitle.trim()) {
      this.toastr.error('Please enter a title for the article.');
      return;
    }
    if (!this.editableText || !this.editableText.trim()) {
      this.toastr.error('Please enter content for the article.');
      return;
    }
    this.articleservice.postArticle(this.articleTitle,articleContent).subscribe(
      (response) =>{
        this.toastr.success('Article successfully added');
        // redirect to the articles page
        this.router.navigate(['/articles']);
      },
    (error) =>{
      this.toastr.error('Error adding article ');
    }
    )
  }
  updateEditableText(): void {
    const contentDiv = document.querySelector('.editable-text') as HTMLElement;
    if (contentDiv) {
      this.editableText = contentDiv.innerText;
    }
  }
  onContentChange(event: Event): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.lastKnownRange = selection.getRangeAt(0);
    }
    this.updateEditableText();
  }

}
