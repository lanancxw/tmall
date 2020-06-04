export default class carousel {
    constructor() {
        //获取元素
        this.banner = document.querySelector('.j-category .banner-con');
        this.picLi = document.querySelectorAll('.banner-con ul li'); //8张图
        this.btnLi = document.querySelectorAll('.banner-con ol li'); //8个按钮
        this.index = 0; //接受索引
        this.timer = null; //定时器的返回值
        this.init();
    }

    init() {
        //1.点击按钮(切换图片，设置选中的状态active)
        for (let i = 0; i < this.btnLi.length; i++) {
            this.btnLi[i].onclick = () => {
                //this
                //将当前的索引存储效率
                this.index = i;
                this.tabswitch();
            }
        }
        //3.自动轮播
        this.autoplay();

        //4.鼠标移入banner自动轮播停止，反之继续
        this.banner.onmouseover = () => {
            clearInterval(this.timer);
        }

        this.banner.onmouseout = () => {
            this.autoplay();
        }
    }

    tabswitch() { //核心：切换过程
        for (let j = 0; j < this.btnLi.length; j++) {
            //清空按钮上面的类名。
            this.btnLi[j].className = '';
            this.picLi[j].style.opacity = 0;
        }
        this.btnLi[this.index].className = 'active';
        this.picLi[this.index].style.opacity = 1;
    }

    autoplay() {
        this.timer = setInterval(() => {
            this.index++;
            if (this.index > this.btnLi.length - 1) {
                this.index = 0;
            }
            this.tabswitch();
        }, 5000);
    }
}
