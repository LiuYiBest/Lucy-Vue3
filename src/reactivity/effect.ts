class ReactiveEffect{
    private _fn:any;
    constructor(fn){
        this._fn = fn;
    }
    run(){
        activeEffect = this;  //获取当前的实例对象
        this._fn();
    }
}

const targeMap = new Map();
export function track(target,key){
        // targe -> key -> vdp
        let depsMap =  targeMap.get(target);
        // 没有就初始化
        if(!depsMap){
            depsMap = new Map()
            targeMap.set(target,depsMap);
        }

        let dep = depsMap.get(key);
        if(!dep) {
            dep = new Set();
            depsMap.set(key,dep);
        }
        dep.add(activeEffect)
}

export function trigger(target,key){
    let depsMap = targeMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep) {
        effect.run();
    }
}

let activeEffect;
export function effect(fn){
    // fn
    const _effect = new ReactiveEffect(fn);
    _effect.run()
}