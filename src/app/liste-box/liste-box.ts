import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../data';

@Component({
  selector: 'app-liste-box',
  imports: [CommonModule],
  templateUrl: './liste-box.html',
  styleUrl: './liste-box.css',
})
export class ListeBox implements OnInit {
boxes: any;

  constructor(private data: Data) {
    this.data = data;
   }

  ngOnInit(): void {
    this.getBoxes();
  }

  getBoxes() {
    this.data.getBoxesAPI().subscribe((res: any) => {
      this.boxes = res;
    });
  }
}
