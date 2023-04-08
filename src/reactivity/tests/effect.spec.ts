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
})