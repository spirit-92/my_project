import { Pipe, PipeTransform } from '@angular/core';
import {Track} from "ngx-audio-player";

@Pipe({
  name: 'searchMusic'
})
export class SearchMusicPipe implements PipeTransform {

  transform(playlist: Track[], search:string): Track[] {
    if (!search.trim()){
        return playlist
    }
    return playlist.filter(music =>{
      return music.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })

  }

}
