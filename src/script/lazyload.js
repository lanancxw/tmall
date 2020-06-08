export default class LazyLoad{
    constructor(imgs){
        this.imgs = imgs;
        this.lazyLoad(this.imgs);       
    }
    getTop(e) {
        var T = e.offsetTop;
        while(e = e.offsetParent) {
            T += e.offsetTop;
        }
        return T;
    }

    lazyLoad(imgs) {
        var H = document.documentElement.clientHeight;//获取可视区域高度
        var S = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < imgs.length; i++) {
            if (H + S > this.getTop(imgs[i])) {
                imgs[i].src = imgs[i].getAttribute('data-src');
            }
        }
        this.init(imgs);
    }
    init(imgs){
       window.onload = window.onscroll = ()=> { //onscroll()在滚动条滚动的时候触发
            this.lazyLoad(imgs);
        } 
    }
    
    
}
