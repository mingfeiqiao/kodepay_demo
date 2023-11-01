/* eslint-disable no-unused-vars */
// 接收图标点击事件
import {Kodepay} from "kodepay";
let kodepay_client = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  if (request.target === 'BACKGROUND') {
    if (request.type === 'PAY') {
      kodepay_client.open_payment_page(request.price_id);
      sendResponse({status: 'OK'});
    } else if (request.type === 'SAVE') {
      kodepay_client = Kodepay.kodepay(request.application_id, request.client_id, request.mode);
      return true;
    } else if (request.type === 'GET_USER_INFO') {
      kodepay_client.get_user_info().then(response => {
        console.log('get_user_info', response);
        chrome.runtime.sendMessage({target: 'PRICE', type: 'GET_USER_INFO', data: response});
      });
      sendResponse('ok');
    } else if (request.type === 'LOGIN') {
      kodepay_client.open_login_page();
      sendResponse('ok');
      return true;
    } else if (request.type === 'USER_MANAGE') {
      kodepay_client.open_user_management_page();
      sendResponse('ok');
      return true;
    } 
  }
});