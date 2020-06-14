import ajax from "./ajax.js";
import Cookie from "./cookie.js";
export default class Login{
    constructor(){
        this.header = document.querySelector('#login .header');
        this.footer = document.querySelector('#login .tmall-copyright');

        this.username = document.querySelector('.input-user input');
        this.password = document.querySelector('.input-pwd input');
        this.tip = document.querySelector('.fm-hint');
        this.tipspan = document.querySelector('.fm-hint span');
        this.submit = document.querySelector('.submit');
        this.form = document.querySelector('.form');
        
        this.flag = false;
        this.init();
    }
    init(){
        this.submit.onclick = ()=>{
            console.log(this.username.value,this.password.value);
            if(this.username.value === '' || this.password.value === ''){
                this.tip.style.display = 'block';
                this.tipspan.innerHTML = '登录名或登录密码不能为空';
            }else{
                new ajax({
                    type: 'post',
                    url: 'http://10.31.162.53/tmall/php/login.php',
                    data: {
                        username: this.username.value,
                        password: this.password.value
                    },
                    success:(data)=>{
                        if(data){ //成功
                            data = JSON.parse(data)
                            let usersid = data.sid;
                            console.log(data)
                            let cookie = new Cookie();
                            cookie.set('sid',usersid,7);
                            window.location.href = "http://10.31.162.53/tmall/src/index.html";
                        }else{
                            this.tipspan.innerHTML = '登录名或登录密码不正确';
                        }
                        //     console.log(data);
                        //     this.flag = true;                      
                        //    
                        //     // let name = document.querySelector('#mallPage .site-nav .login-info .sn-login');
                        //     // name.innerHTML = '欢迎'+ data;
                        //     // this.tip.style.display = 'none';
                        //     this.username.value = '';
                        //     this.password.value = '';
                        // }else{
                        //     this.tipspan.innerHTML = '登录名或登录密码不正确';
                        // }
                    }
                })                
            }
            if(this.flag !== true){
                return false
            }
            
        }
        this.include()
    }
    include(){
        new ajax({
            url: 'include/footer.html',
            success:(data) => {
                this.footer.innerHTML = data
            }
        })
    }
}
new Login();