import ajax from "./ajax.js";
import Cookie from "./cookie.js";
export default class Car{
    constructor(){
        this.tr = document.querySelector('.content .con-title1'); 
        this.tbody = document.querySelector('tbody');
        this.arrsid = [];
        this.arrnum = [];
        this.sid;
        this.num;
        this.trClone;
        this.init();
    }
    init(){
        if(new Cookie().get('cookiesid') && new Cookie().get('cookienum')){
            this.arrsid = new Cookie().get('cookiesid').split(',');//获取cookie,同时转换成数组
            this.arrnum = new Cookie().get('cookienum').split(',');//获取cookie,同时转换成数组
            for(let i = 0; i < this.arrsid.length; i++){
                this.ajax(this.arrsid[i],this.arrnum[i])
            }
            
        }
    }
    ajax(sid,num){
        console.log(sid,num);
        new ajax({
            url:'http://10.31.162.53//tmall/php/goods.php',
            success:(data)=>{
                let arrdata = JSON.parse(data);
                for (let value of arrdata) {
                    if(sid === value.goods_id){
                        this.trClone = this.tr.cloneNode(true);
                        
                        this.trClone.querySelector('.line2 .food').src = value.goods_smallpic;
                        this.trClone.querySelector('.line2 .info').innerHTML = value.goods_name;
                        this.trClone.querySelector('.line3 .del').innerHTML = value.goods_price;
                        this.trClone.querySelector('.line4 .num-box').value = num;
                        console.log(this.trClone)
                        /* 之前设置弹性盒要恢复 */
                        this.trClone.style.display = 'flex';
                    }
                }
                console.log(this.trClone);
                this.tbody.appendChild(this.trClone);
            }
        })
    }
}
new Car();