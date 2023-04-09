class ReactiveEffect{
    private _fn:any;
    constructor(fn){
        this._fn = fn;
    }
    run(){
        this._fn();
    }
}

const targeMap = new Map();
export function track(target,key){
        // targe -> key -> vdp
        let depsMap =  targeMap.get(target);
        if(!depsMap){
            depsMap = new Map()
            targeMap.set(target,depsMap);
        }

        const dep = depsMap.get(key);
}

export function effect(fn){
    // fn
    const _effect = new ReactiveEffect(fn);
    _effect.run()
    
}