import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss']
})
export class UserBadgeComponent implements OnInit {

  @Input()
  category: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getColorByCategory(): string {
    let color;
    switch (this.category) {
      case 'Marketing':
        color = 'lightcoral';
        break
      case 'Technique':
        color = 'lightskyblue'
        break
      case 'Client':
        color = 'lightgreen'
        break
      default:
        color = ''
    }
    return color;
  }

}
