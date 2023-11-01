document.addEventListener('DOMContentLoaded', function() {
    // 点击保存之前，页面中id为apis 的内容全部不显示
    document.getElementById('apis').style.display = 'none';
    // 当点击保存时，获取到几个input输入框的值传入到background.js中
    document.getElementById('save').addEventListener('click', function() {
      save();
    });
    document.getElementById('get_user_info').addEventListener('click', function() {
      get_user_info();
    });
    document.getElementById('open_login_page').addEventListener('click', function() {
      open_login_page();
    });
    document.getElementById('open_user_manage').addEventListener('click', function() {
      open_user_manage_page();
    });
    document.getElementById('open_price_page').addEventListener('click', function() {
      // 获取到price_id
      let price_id = document.getElementById('price_id').value;
      open_payment_page(price_id);
    });
    chrome.runtime.onMessage.addListener(function(request)
    {
      if (request.target === 'PRICE') {
        if (request.type === 'GET_USER_INFO') {
          document.getElementById('user_info').value = JSON.stringify(request.data);
        }
      }
    });
  });
  // 保存配置信息
  function save() {
    let mode = "development"
    let application_id = document.getElementById('application_id').value;
    let client_id = document.getElementById('client_id').value;
    chrome.runtime.sendMessage({target: 'BACKGROUND', type: 'SAVE', mode: mode, application_id: application_id, client_id: client_id}, function(response) {
      console.log(response);
      document.getElementById('apis').style.display = 'block';
    });
  }
  // 获取用户信息
  function get_user_info() {
    chrome.runtime.sendMessage({target: 'BACKGROUND', type: 'GET_USER_INFO'}, function(response) {
      console.log('收到response:',response);
      document.getElementById('user_info').value = JSON.stringify(response);
    });
  }
  
  // 打开登录页面
  function open_login_page() {
    chrome.runtime.sendMessage({target: 'BACKGROUND', type: 'LOGIN'}, function(response) {
      console.log(response);
    });
  }

  // 打开用户中心
  function open_user_manage_page() {
    chrome.runtime.sendMessage({target: 'BACKGROUND', type: 'USER_MANAGE'}, function(response) {
      console.log(response);
    });
  }
  
  // 打开支付页面
  function open_payment_page(price_id) {
    chrome.runtime.sendMessage({target: 'BACKGROUND', type: 'PAY', price_id: price_id}, function(response) {
      console.log(response);
    });
  }