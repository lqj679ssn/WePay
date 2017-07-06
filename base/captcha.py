import json
from urllib.parse import urlencode

import requests
from django.utils.crypto import get_random_string

yunpian_appkey = '9a834d16cdd60ffa3a606c7c55dad5ab'


class SendMobile:
    @staticmethod
    def send_captcha(mobile):
        text = "【浙江大学智能按钮】您的验证码是#code#。有效时间为5分钟"
        code = get_random_string(length=6, allowed_chars="1234567890")
        text = text.replace("#code#", code)
        SendMobile.send_sms(yunpian_appkey, text, mobile)
        return code

    @staticmethod
    def send_sms(apikey, text, mobile):
        """
        云片短信发送API
        :param apikey: 云片应用密钥
        :param text: 发送明文
        :param mobile: 11位手机号
        :return:
        """
        # 服务地址
        url = "https://sms.yunpian.com/v2/sms/single_send.json"
        params = urlencode({'apikey': apikey, 'text': text, 'mobile': mobile})
        headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "application/json"}
        response = requests.post(url, params, headers=headers)
        response_str = response.text
        response.close()
        # print(response_str)
        return json.loads(response_str)

# print(SendMobile.send_captcha("17816871961"))
