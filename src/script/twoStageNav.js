export default class TwoStageNav {
    constructor(){
        this.menuli = document.querySelectorAll('.j-category .j-item li');
        this.cartlist = document.querySelector('.j-category .carlist');
        this.items = document.querySelectorAll('.carlist .item');
        this.init();
    }
    init(){
        for(let i = 0; i < this.menuli.length; i++){
            this.menuli[i].index = i;
            this.menuli[i].suo = this;
            this.menuli[i].addEventListener('mouseover',this.menuliHandler);
            this.menuli[i].addEventListener('mouseout',this.menuliHandler);
        }
        // this.cartlist.addEventListener('mouseover',(e)=> this.cartlistHandler(e));
        // this.cartlist.addEventListener('mouseout',(e)=> this.cartlistHandler(e));
        
    }
    menuliHandler(e){
        let _this = this.suo;
        if(e.type === 'mouseover'){
            _this.cartlist.style.display = 'block';
            _this.items[this.index].style.display = 'block'
            _this.cartlist.addEventListener('mouseover',()=>{
                for(var i = 0; i < _this.items.length; i++){
                    _this.items[i].style.display = 'none';
                }
                _this.items[this.index].style.display = 'block';
                _this.cartlist.style.display = 'block';
            });
            _this.cartlist.addEventListener('mouseout',()=>{
                _this.items[this.index].style.display = 'none';
                _this.cartlist.style.display = 'none';
            });
        }else if(e.type === 'mouseout'){
            _this.cartlist.style.display = 'none';
            _this.items[this.index].style.display = 'none'
        }    
    }
    /* cartlistHandler(e){
        if(e.type === 'mouseover'){
            this.items[0].style.display = 'block';
            this.cartlist.style.display = 'block';
        }else if(e.type === 'mouseout'){
            this.items[0].style.display = 'none';
            this.cartlist.style.display = 'none';
        }    
    } */
}