import { Injectable } from '@angular/core';

declare var $ :any; // declare Jquery

@Injectable()
export class ScrollTop {
    /*
        Function scrollTopFom(): scroll top when have validate
        @author: Lam
    */
    scrollTopFom(){
        $('html,body').animate({ scrollTop: $('.content-wrapper').offset().top }, 'slow');
    }
}