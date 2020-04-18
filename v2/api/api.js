import request from '../utils/request';

/**
 * demo
 *
 */
export function getAddressSuccessDemo(data)
{
    return request.post('Address/success', data);
}

export function getAddressErrorDemo(data)
{
    return request.post('Address/error', data, true);
}


/*
* 授权接口
* */

export function getAuth()
{
    return request.post('');
}