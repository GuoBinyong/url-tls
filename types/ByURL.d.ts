//ByURL：开始

/**
 * 该类是用于在不支持 URL 类型的环境下替代 URL 的；但该类的提供的功能和接口远丰富于 URL ，但并不完全包含于 URL ，所以，完全替换 URL
 */

export class ByURL implements UrlUtils {
    deleUrlUtilsMap:{[prop in keyof UrlUtils]:Array<keyof UrlUtils>};


  /**
   * paramsPropParse  : (value,key,queryString)=> value    可选；用于在解析 URL 时 url 的参数的值 进行转换；未指定该参数时,默认的逻辑是：如果属性值是 JSON 字符中串，则将其转为对象，否则，原样输出；
   */
  paramsPropParse?:ParamsPropParse;
  


  /**
   * paramsPropStringify : (value,key,params)=> string    可选；用于在序列化的对象参数时对参数的属性值 进行转换；未指定该参数时,默认的逻辑是：如果属性值是 对象类型，则将其转为JSON字符串，否则，正常序列化；
   */
  paramsPropStringify?:ParamsPropStringify;
  constructor(initUrl:UrlUtils | string,paramsPropParse?:ParamsPropParse,paramsPropStringify?:ParamsPropStringify);


  urlUtils:UrlUtils;

  initUrl:UrlUtils | string;
  href:string;
  readonly params?:object;







  /**
   * 清除与 util 相关的子 util
   * @param util : string
   */
  protected _deleUrlUtilsFor(util?:string):void;







  /**
   * 接口1:
   * addSearchParams(key,value)
   * 给查询参数添加新的成员，并返回添加后的查询参数对象
   * @param key : string   添加的key
   * @param value : any    添加的值
   * @returns addSearchParams : Object    返回添加后的查询参数对象
   */
  addSearchParams(key:string,value:any):object;


  /**
   *
   * 接口2:
   * 追加查询参数params，并返回追加后的查询参数对象
   * addSearchParams(params)
   * @param params : Object   添加的params对象
   * @returns addSearchParams : Object    返回添加后的查询参数对象
   */
  addSearchParams(params:object):object;

   /**
   *
   * 接口3:
   * addSearchParams()
   * 获取添加的查询参数
   * @returns addSearchParams : Object    返回添加后的查询参数对象
   */
  addSearchParams():object;










  /**
   * 接口1:
   * addHashParams(key,value)
   * 给hash查询参数添加新的成员，并返回添加后的hash查询参数对象
   * @param key : string   添加的key
   * @param value : any    添加的值
   * @returns addSearchParams : Object    返回添加后的查询参数对象
   */
  addHashParams(key:string,value:any):object;

  /**
   *
   * 接口2:
   * addHashParams(params)
   * 追加查询参数params，并返回追加后的查询参数对象
   * @param params : Object   添加的params对象
   * @returns addSearchParams : Object    返回添加后的查询参数对象
   */
  addHashParams(params:object):object;

   /**
   *
   * 接口3:
   * addHashParams()
   * 获取添加的hash查询参数
   * @returns addSearchParams : Object    返回添加后的hash查询参数对象
   */
  addHashParams():object;

}



//ByURL：结束











// 普通解析与字符串化：开始


//不依赖 URL 和 URLSearchParams 的解析：开始


/**
 *默认的 paramsPropParse ; 用JSON解析参数的属性
 */
declare function _paramsPropJSONParse(value:any):any;





/**
 *默认的 paramsPropStringify ；用JSON序列化参数的属性
 */
declare function _paramsPropJSONStringify(value:any,key:string|number,params:object):Exclude<any,object>;








/**
 * 对像属性名的类型
 */
type KeyType = string | number


export type ParamsPropParse = (valueStr:string,key:KeyType,queryString:string)=> any;


export type ParamsPropStringify = (value:any,key:KeyType,params:object)=> string;



/* 
返回的对象 UrlUtils 对象包含以下属性
*/

/**
 * 表示Url各种组成单元的接口
 */
interface UrlUtils {
    href?: string;    //包含完整 URL 的 DOMString。
    url?: string;   //不包含search和hase 的url
    origin?: string;  //返回一个包含协议名、域名和端口号的 DOMString。
    protocol?: string;  //包含 URL 协议名的 DOMString，末尾不带 ':'。
    host?: string;  //包含 URL 域名，':'，和端口号的 DOMString。
    hostname?: string;  //包含 URL 域名的 DOMString。
    port?: string;    //包含 URL 端口号的 DOMString。
    pathname?: string;  //URL 的路径的字符串。
    pathList?: string[];  //url的路径名列表
    absPath?: boolean; //pathname 是否是经对路径
    search?: string;    //以 '?' 起头紧跟着 URL 请求参数的 DOMString。
    searchParams?: object;  //查询参数search的对象形式
    hash?: string; //以 '#' 起头紧跟着 URL 锚点标记的 DOMString。
    hashSearch?: string; // 哈唏hash中的查询字符串
    hashParams?: object;   //哈唏hash中的参数
    hashUrlUtils?: UrlUtils;  //把哈唏字符串 hash 作为 url 解析成的 urlUtils
    params?: object;    //url中所有的参数，包括 searchParams 和 hashParams
}




/**
 * 把url字符串解析成 UrlUtils 对象； UrlUtils 对象是包含所有 url 组件的对象；
 * 注意：
 * - 本方法中没有依赖 URL 类型进行解析，使用是纯粹的字符中解析，所以可以在不支持 URL 类型的环境下使用，比如：小程序；
 * - 当 searchParams 和 hashParams 中的的属性值是 JSON 字符串时，会自动转对象
 *
 * @param urlStr : string   必选；url字符串，可以是无效的或者不完整的url字符串
 * @param paramsPropParse ? : (value,key,queryString)=> value    可选；用于在解析 URL 时 url 的参数的值 进行转换；未指定该参数时,默认的逻辑是：如果属性值是 JSON 字符中串，则将其转为对象，不则，原样输出；
 * @param paramsPropStringify ? : (value,key,params)=> string    可选；用于在序列化的对象参数时对参数的属性值 进行转换；未指定该参数时,默认的逻辑是：如果属性值是 对象类型，则将其转为JSON字符串，否则，正常序列化；
 * @returns urlUtils : UrlUtils
 *
 返回的对象 UrlUtils 对象包含以下属性
 href:string,    //包含完整 URL 的 DOMString。
 url:string,   //不包含search和hase 的url
 origin:string,  //返回一个包含协议名、域名和端口号的 DOMString。
 protocol:string,  //包含 URL 协议名的 DOMString，末尾不带 ':'。
 host:string,  //包含 URL 域名，':'，和端口号的 DOMString。
 hostname:string,  //包含 URL 域名的 DOMString。
 port:string,    //包含 URL 端口号的 DOMString。
 pathname:string,  //URL 的路径的字符串。
 pathList:Array,  //url的路径名列表
 absPath:boolean, //pathname 是否是经对路径
 search:string,    //以 '?' 起头紧跟着 URL 请求参数的 DOMString。
 searchParams:Object,  //查询参数search的对象形式
 hash:string, //以 '#' 起头紧跟着 URL 锚点标记的 DOMString。
 hashSearch:string, // 哈唏hash中的查询字符串
 hashParams:Object,   //哈唏hash中的参数
 hashUrlUtils:UrlUtils,  //把哈唏字符串 hash 作为 url 解析成的 urlUtils
 params:Object,    //url中所有的参数，包括 searchParams 和 hashParams
 *
 */
export function parseUrl(urlStr:string,paramsPropParse?:ParamsPropParse,paramsPropStringify?:ParamsPropStringify):UrlUtils;







interface UrlUtilsAdd extends UrlUtils {
    addSearch?: string;   //另外追加的 search 字符串，该属性优先级低于addSearchParams
    addSearchParams?: object;  // 另外追加的 search 对象，该属性优先级高于 addSearch
    addHashSearch?: string;   //另外追加的 hashSearch 字符串，该属性优先级低于 addHashParams
    addHashParams?: object;  // 另外追加的 hashSearch 对象，该属性优先级高于 addHashSearch
}



/**
 * 把  UrlUtils 对象序列化成 url 字符串； UrlUtils 对象是包含所有 url 组件的对象；
 *
 * @param urlUtils : UrlUtils   必选；url字符串，可以是无效的或者不完整的url字符串
 * @param paramsPropStringify ? : (value,key,params)=> string    可选；用于在序列化的对象参数时对参数的属性值 进行转换；未指定该参数时,默认的逻辑是：如果属性值是 对象类型，则将其转为JSON字符串，否则，正常序列化；
 * @param paramsPropParse ? : (value,key,queryString)=> value    可选；用于在解析 URL 时 url 的参数的值 进行转换；未指定该参数时,默认的逻辑是：如果属性值是 JSON 字符中串，则将其转为对象，不则，原样输出；
 * @returns urlStr : string
 *
 *
 * 注意：
 * - 本方法中没有依赖 URL 类型进行解析，使用是纯粹的字符中解析，所以可以在不支持 URL 类型的环境下使用，比如：小程序；
 * - 当 searchParams 和 hashParams 中的的属性值是 JSON 字符串时，会自动转对象
 * - 对于 urlUtils 中 顶层与 hash 相关的属性 比 urlUtils 属性 hashUrlUtils 中相应的属性优先级更高；
 * - 对于 urlUtils 中有冲突的url组件属性，则以组件粒度较细者优先；如：如果 urlUtils 中同时设置了 href 和 host 属性，则 host 属性值会取代 href 属性中的 host 部分；
 *
 *
 *
 *
 * urlUtils 对象可配置的属性包括 parseUrl 方法能解析出的所有属性，此还，还包括侯个新的属性：addSearch、addSearchParams、addHashSearch、addHashParams ；
 * urlUtils 中可配置的属性如下：
 addSearch: string   //另外追加的 search 字符串，该属性优先级低于addSearchParams
 addSearchParams: Object  // 另外追加的 search 对象，该属性优先级高于 addSearch
 addHashSearch: string   //另外追加的 hashSearch 字符串，该属性优先级低于 addHashParams
 addHashParams: Object  // 另外追加的 hashSearch 对象，该属性优先级高于 addHashSearch

 href:string,    //包含完整 URL 的 DOMString。
 url:string,   //不包含search和hase 的url
 origin:string,  //返回一个包含协议名、域名和端口号的 DOMString。
 protocol:string,  //包含 URL 协议名的 DOMString，末尾不带 ':'。
 host:string,  //包含 URL 域名，':'，和端口号的 DOMString。
 hostname:string,  //包含 URL 域名的 DOMString。
 port:string,    //包含 URL 端口号的 DOMString。
 pathname:string,  //URL 的路径的字符串。
 pathList:Array,  //url的路径名列表
 absPath:boolean, //pathname 是否是经对路径
 search:string,    //以 '?' 起头紧跟着 URL 请求参数的 DOMString。该属性的优先级低于 searchParams
 searchParams:Object,  //查询参数search的对象形式；如果没有设置该属性，则默认取 在 params 中 但不在 hashParams 中的所有属性组成的对象来代替； 该属性的优先级高于 search
 hash:string, //以 '#' 起头紧跟着 URL 锚点标记的 DOMString。该属性会 覆盖 hashUrlUtils.href 属性；
 hashSearch:string, // 哈唏hash中的查询字符串； 该属性的优先级低于 hashParams
 hashParams:Object,   //哈唏hash中的参数；如果没有设置该属性 且 设置了 searchParams，则默认取 在 params 中 但不在 searchParams 中的所有属性组成的对象来代替； 该属性的优先级高于 hashSearch； hashSearch 和 hashParams 之合 会 覆盖 hashUrlUtils.searchParams 属性；
 hashUrlUtils:UrlUtils,  //把哈唏字符串 hash 作为 url 解析成的 urlUtils； 顶层中的 hashSearch 和 hashParams 之合 会 覆盖 hashUrlUtils.searchParams 属性；
 params:Object,    //url的参数；
 *
 *
 */
export function stringifyUrl(urlUtils:UrlUtilsAdd,paramsPropStringify?:ParamsPropStringify,paramsPropParse?:ParamsPropParse):string;











/**
 * 把url字符串分隔成 url、查询字符串search 和 哈唏hash 三段字符串；
 * @param urlStr
 * @returns {url: string, search: string, hash: string}   其中，url字符串不包括 search 和 hash ；并且 search 开头有 "?", hash 开头有 "#"
 *
 * 本方法法之所以没用正则 和 URL 等，目的是为了防止 urlStr 中 有 多个 ## 等不规范情况 和 让该方法具有通用性
 */
export function splitURLByQueryString(urlStr:string):{url: string, search?: string, hash?: string};








// JSON解析与字符串化：开始



/**
 * 把对象 obj 用JSON的方式格式化成 URL 的参数格式；
 * @param obj : Object   必选；被格式化的对象
 * @param queryPrefix ? : boolean    可选；默认值：false; 是否带URL的查询字符串前缀 ?
 * @returns 格式化后的 URL 的参数格式
 *
 *
 * 说明
 * 当URL参数对象 obj 不只有一层属性（如果obj的属性也是对象）时，URL的查询字符串就很很表示了；本方法就是用来解决这个问题；
 * 被本方法格式化的URL查询字符串，需要用 JSON 的 parseQueryString 方法来解析成对象；
 *
 */
export function JSONQueryStringify(obj:object,queryPrefix?:boolean):string;





/**
 * 把 通过 JSONQueryStringify 格式化后的查询字符串 queryString 解析成 对象；
 * @param queryString : string   必选；被格式化的对象
 * @returns 解析后的对象
 *
 */
export function parseJSONQueryString(queryString:string):object;








/**
 * parseJSONQueryStrObjProperty(queryObj)
 * 把 通过 JSONQueryStringify 格式化后的查询字符串的对象的属性 解析成 真实的值；
 * @param queryObj : Object   必选；查询字符串对象; 一般是经过初次查询字符串的解析(比如：parseQueryString)成的对象；
 * @returns 解析后的对象
 *
 */
export function parseJSONQueryStrObjProperty(queryObj:object):object;




// JSON解析与字符串化：结束





//查询字符串：开始


/**
 * 接口1
 * queryStringify(params,queryPrefix,paramsPropStringify)
 * @param params : Object    被序列化的参数对象
 * @param queryPrefix ? : boolean   可选；默认值：false ; 是否带有 ？ 前缀
 * @param paramsPropStringify ? : (value,key,params)=> string    可选； 对 value 进行转换的函数；
 * @returns string   序列化后的url查询字符串
 *
 */
export function queryStringify(params:object,queryPrefix?:boolean,paramsPropStringify?:ParamsPropStringify):string;



/**
 * 接口2:
 * queryStringify(params,paramsPropStringify)
 * @param params : Object    被序列化的参数对象
 * @param paramsPropStringify ? : (value,key,params)=> string    可选； 对 value 进行转换的函数；
 * @returns string   序列化后的url查询字符串
*/
export function queryStringify(params:object,paramsPropStringify:ParamsPropStringify):string;








/**
 * parseQueryString(queryString,paramsPropParse)
 * @param queryString : string    被解析的查询字符串；
 * @param paramsPropParse ? : (value,key,queryString)=> value    可选；对 value 进行转换
 * @returns Object   解析后的对象
 */
export  function parseQueryString(queryString:string,paramsPropParse?:ParamsPropParse):object;




//查询字符串：结束






//类查询字符串：开始






/**
 * similarQueryStringify(params,separOpts)
 * 将对类转化成 类似查询字符串格式的字符串
 *
 * @param params : Object    被序列化的参数对象
 * @param separOpts ? : {prop,kv,map}   可选；分隔符 和 值解析回调 的配置选项；
 * separOpts.prop ?: string     可选；默认值："&"；属性与属性之间的分隔符；
 * separOpts.kv ?: string     可选；默认值："="；key 和 value 之间的分隔符；
 * separOpts.map  ? : (value,key,params)=> string    可选； 对 value 进行转换的函数；
 *
 * @returns string   序列化后的类查询字符串
 */
export function similarQueryStringify(params:object,separOpts?:{
    prop?:string,
    kv?:string,
    map?:ParamsPropStringify
}):string;






/**
 * parseSimilarQueryString(queryString,separOpts)
 * 解析 类似查询字符串格式的字符串
 *
 * @param queryString : string    被解析的类似查询字符串格式的字符串；
 * @param separOpts ? : {prop,kv,map}   可选；分隔符 和 值解析回调 的配置选项；
 * separOpts.prop ?: string     可选；默认值："&"；属性与属性之间的分隔符；
 * separOpts.kv ?: string     可选；默认值："="；key 和 value 之间的分隔符；
 * separOpts.map  ? : (value,key,queryString)=> value    可选；对 value 进行转换
 *
 * @returns Object   解析后的对象
 */
export function parseSimilarQueryString(queryString:string,separOpts?:{
    prop?:string,
    kv?:string,
    map?:ParamsPropParse
}):object;




//类查询字符串：结束






//不依赖 URL 和 URLSearchParams 的解析：结束










// 普通解析与字符串化：结束








declare global {
    interface Object {




  //URL相关：开始

  // // fixme:从 Object.js 来

  /**
   * toJSONqueryStringify(queryPrefix)
   * 把当前对象 用JSON的方式格式化成 URL 的参数格式
   * @param queryPrefix ? : boolean    可选；默认值：false; 是否带URL的查询字符串前缀 ?
   * @returns 格式化后的 URL 的参数格式
   *
   * 说明
   * 本方法是通过 JSONQueryStringify 方法进行格式化的
   */
  toJSONqueryStringify(queryPrefix?:boolean):string;

    }



    interface String {


  /**
   * 获取当前字符串经过 parseJSONQueryString 解析成的 对象；
   *
   * 说明：
   * 本方法是通过 parseJSONQueryString 方法进行解析的；
   */
  readonly urlJSONQueryObj:object;

    }




}





