import { Component } from '@angular/core';
import { FeedService } from '../feed.service';

declare const Microgear;

const APPID = '';
const KEY = ''
const SECRET = '';
const ALIAS = 'ionic-gear';
const FEED_APIKEY = '';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  microgear = null;
  rain = 0;
  pir = 0;
  feed = null;

  constructor(private feedService: FeedService) {
    this.microgear = new Microgear.create({
      key: KEY,
      secret: SECRET,
      alias: ALIAS
    });
    this.microgear.on('message', this.handleMessage);
    this.microgear.on('connected', () => { console.log('connected') });
    this.microgear.on('closed', () => { console.log('closed') });
    this.microgear.on('warning', () => { console.log('warning') })
    this.microgear.on('error', (err) => { console.log('error', err) })
    this.microgear.on('present', () => { console.log('present') })
    this.microgear.on('absent', () => { console.log('absent') })
    this.microgear.connect(APPID);

    setInterval(() => {
      this.getFeed();
    }, 15000)
  }

  handleClick() {
    const { rain, pir } = this;
    this.microgear.writeFeed('IonicFeedTK', { rain, pir }, FEED_APIKEY);
    console.log('sent message', {rain, pir});
  }

  handleMessage(topic, message) {
    console.log('incoming : ' + topic + ' : ' + message);
  }

  getFeed() {
    this.feedService.getFeed().subscribe((data) => {
      this.feed = data;
    })
  }

}