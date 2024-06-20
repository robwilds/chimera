import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
