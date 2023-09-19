import { Header } from './modules/Header';
import { Profile } from './modules/Profile';

class PageProfileOverview {
  constructor() {
    this.header = new Header();
    this.profile = new Profile();
  }
}

new PageProfileOverview();
