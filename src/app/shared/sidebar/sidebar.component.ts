import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  get searchHistory() {
    return this.gifsService.searchHistory;
  }

  // Inject
  constructor(private gifsService: GifsService) {}

  search(value: string) {
    console.log(value);

    this.gifsService.searchGifs(value);
  }
}
