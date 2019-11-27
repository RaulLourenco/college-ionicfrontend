import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.page.html',
  styleUrls: ['./presence.page.scss'],
})
export class PresencePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  customPopoverOptions: any = {
    header: 'Data',
    subHeader: 'Selecione a data desejada',
    message: 'Selecione uma das datas abaixo.'
  };

}
