import {ParamsPropParse} from "../../com-tools/types/ByURL"



/**
 * ByURLSearchParams 此类的功能与 URLSearchParams 一样，封装此类的目的是为在不支持 URLSearchParams 的环境中替代 URLSearchParams
 * 注意：此类的包含 URLSearchParams 的所有接口，所以在不支持 URLSearchParams 的环境中，此类可完全替代 URLSearchParams 类；
 */

export class ByURLSearchParams {

    queryPrefix:boolean;  //在获取查询字符串时，是否要带前缀 ?
    paramsPropReplacer?:ParamsPropParse;
  
    constructor(initSearch?:string,paramsPropReplacer?:ParamsPropParse);

    

    /**
     * 原始输入的 search
     */
    initSearch?:string;















    params:any;


    search:string;




  toString(queryPrefix?:boolean,paramsPropReplacer?:ParamsPropParse):string;


  append(name: string, value: string): void;

  delete(name: string): void;

  entries(): IterableIterator<[string, string]>;

  forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;


  get(name: string): string | null;

  getAll(name: string): string[];

  has(name: string): boolean;

  keys(): IterableIterator<string>;

  set(name: string, value: string): void;

  sort(): void;


  values(): IterableIterator<string>;

  
  }
  
  