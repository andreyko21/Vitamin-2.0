import { Header } from "./modules/Header";
import { Profile } from './modules/Profile';

class PageProfilePayment{
    constructor(){
        this.header = new Header();
        this.profile = new Profile();
    }
}

new PageProfilePayment();