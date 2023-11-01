import { get, post } from '@/utils/axios';

// get请求示例
export const exampleGet = arg => { return get('', arg) };

// post请求示例
export const getProductJson = arg => { return post('', arg) };