import {getTypeOf,getTypeStringOf} from "./oriTools"


/**
 * 判断目标是否是对象类型
 * @param target : any   目标对象
 *
 * 仅通过 target instanceof Object 判断是不行的，因为 对于 Object.create(null) 创建的对象 通过 ` Object.create(null) instanceof Object ` 来判断 返回的是 false
 * 即：通过 Object.create(null) 创建的对象是不被 instanceof  认为是继续于 Object 的
 *
 * typeof null 也返回 "object"
 */
export function isObject(target:any):boolean {
    // return target instanceof Object || typeof target === "object"
    var tarType = typeof target;
    return  target && (tarType === "object" || tarType === "function");
}








/**
 * 获取 inst 的类型
 * @param inst : any
 * @returns Type    inst 的类型
 *
 *
 *
 * 注意：
 * 本方法返回的结果如下：
 * undefined ：undefined
 * null ： null
 * 其它任何类型的实例  : 返回该实例的构造函数  或 包装对象的构造函数
 *
 */
type TypeOfReturnType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
type StrictType = Exclude<TypeOfReturnType, "undefined" | "object" | "function"> | undefined | null | Function ;

export function getStrictTypeOf(inst:any):StrictType  {
    if (inst == null || isObject(inst)){
        return getTypeOf(inst);
    }
    return (typeof inst) as StrictType;
}




/**
 * 获取 inst 的类型字符串
 * @param inst : any
 * @returns string    inst 的类型字符串
 *
 *
 *
 * 注意：
 * 本方法返回的结果如下：
 * undefined ："undefined"
 * null ： "null"
 * 其它任何类型的实例  : 返回该实例的构造函数  或 包装对象的构造函数 的函数名字
 *
 */
export function getStrictTypeStringOf(inst:any):string {
    var typeStr = typeof inst;
    if (typeStr === "object"){
        return getTypeStringOf(inst);
    }
    return typeStr;
}
