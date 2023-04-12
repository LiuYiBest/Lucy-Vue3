class ReactiveEffect{
    private _fn:any;
    constructor(fn,public scheduler?){
        this._fn = fn;
    }
    run(){
        activeEffect = this;  //获取当前的实例对象
        return this._fn();
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
        if(effect.scheduler){
            effect.scheduler()
        }else{
            effect.run();
        }
    }
}

let activeEffect;
export function effect(fn,options:any={}){
    // fn
    const scheduler = options.scheduler;
    const _effect = new ReactiveEffect(fn,scheduler);
    _effect.run()

    return _effect.run.bind(_effect)
}