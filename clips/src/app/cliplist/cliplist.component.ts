import { Component, OnDestroy , OnInit, Input } from '@angular/core';
import { ClipService } from '../services/clip.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-cliplist',
  templateUrl: './cliplist.component.html',
  styleUrls: ['./cliplist.component.css'],
  providers: [DatePipe]
})
export class CliplistComponent implements OnInit, OnDestroy {

  @Input() scrollable = true
constructor(
  public clipService : ClipService
    )
  {
    this.clipService.getClips()
  }
  ngOnInit(): void {
    if(this.scrollable){
    window.addEventListener('scroll', this.handlescroll)
  }
  }
  ngOnDestroy(): void {
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handlescroll)
    }
    this.clipService.pageClips = []
  }
  handlescroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window
    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight
    if (bottomOfWindow) {
     this.clipService.getClips()
    }
  }

}
