import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.trim() === '') {
      return 'assets/profile.png'; 
    } else {
      return value;
    }
  }
}
