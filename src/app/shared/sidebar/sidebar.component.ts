import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { Gif } from '../../gifs/interface/gifs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

  get record() {
    return this.gifsService.record;
  }

  constructor(private gifsService: GifsService) { }

  search( query: string){
    this.gifsService.searchGifs(query);
  }
}
