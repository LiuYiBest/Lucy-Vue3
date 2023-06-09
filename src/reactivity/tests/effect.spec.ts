import { effect,stop } from "../effect";
import { reactive } from "../reactive";

describe("effect",()=>{
    it.skip('happy path',()=>{
        const user = reactive({
            age:10
        });
        let nextAge;
        effect(()=>{
            nextAge = user.age +1;
        });
        expect(nextAge).toBe(11);

        // 触发依赖
        user.age++;
        expect(nextAge).toBe(12);
    })

    it('should return runner when call effect',()=>{
        // effect(fn) -> function(runner)=>fn->return
        let foo = 10
        const runner = effect(()=>{
            foo++
        })
        expect(foo).toBe(11)
        const r = runner()
        expect(foo).toBe(12)
        expect(r).toBe("foo")
    })
})