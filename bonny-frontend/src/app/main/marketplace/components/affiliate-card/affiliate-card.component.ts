import { Component, Input, OnInit } from '@angular/core';
import { Affiliate } from 'src/app/model/Affiliate';

@Component({
  selector: 'app-affiliate-card',
  templateUrl: './affiliate-card.component.html',
  styleUrls: ['./affiliate-card.component.scss'],
})
export class AffiliateCardComponent  implements OnInit {

  //@ts-ignore
  @Input("affiliate") affiliate: Affiliate

  constructor() { }

  ngOnInit() {}

}
