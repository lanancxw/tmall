export default class Cookie{
    /* constructor(name,value,days){
        this.name = name;
        this.value = value;
        this.days = days;
    } */
    set(name,value,days) {
        let d = new Date();
        d.setDate(d.getDate() + days)
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${d};path=/`;
    }
    get(name) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i].split('=');
            if (name === newarr[0]) {
                return newarr[1];
            }
        }
    }
    unset(name) {
        this.set(name, '', -1)
    }
}