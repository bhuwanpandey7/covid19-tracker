import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-covidsummary',
  templateUrl: './covidsummary.component.html',
  styleUrls: ['./covidsummary.component.scss']
})
export class CovidsummaryComponent implements OnInit {

  constructor() { }

  @Input() summary: any;

  ngOnInit(): void {
  }

}
