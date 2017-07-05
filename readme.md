# AKS接口文档 0705v1.2

## 用户登录

### 发送验证码
> /user/phone

- request
```
{
    'username': 手机号
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 发送失败 ／ 手机号格式错误
	'body': []
}
```

### 用户注册
> /user/register

- request
```
{
	'password': 密码
	'is_seller': 是否是商家
	'brand': 商家品牌（当is_seller=true时有效）
	'username': 用户名（当is_seller=true时有效）
	'captcha': 手机验证码（当is_seller=false时有效）
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 已存在的用户名 ／ 验证码错误 ／ 验证码过期 ／ 用户注册错误 ／ 品牌字符串长度错误 ／ 用户名字符串长度错误
	'body': 用户ID
}
```

### 用户登录
> /user/login

- request
```
{
	'username': 用户名
	'password': 密码
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 不存在的用户名 ／ 错误的用户名或密码
	'body': 用户ID
}
```

### 用户退出
> /user/logout

- request
```
{}
```
- response
```
{
	'code': 0
	'msg': OK
	'body': []
}
```

## 信息管理

### 编辑收货信息
> /buyer/address/edit

- request
```
{
	'real_name': 真实姓名
	'address': 地址
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 不是买家用户
	'body': []
}
```

### 获取收货信息
> /buyer/address/get

- response
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 不是买家用户
	'body':  {
		'real_name': 真实姓名
		'address': 地址
	}
}
```

### 添加银行卡
> /user/card/add

- request
```
{
	'card': 银行卡号
	'is_default': 设置默认
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 不是买家用户 ／ 添加错误
	'body': 银行卡ID
}
```

### 设置默认银行卡
> /user/card/default

- request
```
{
	'card_id': 银行卡ID
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不是你的银行卡
}
```

### 删除银行卡
> /user/card/remove

- request
```
{
	'card_id': 银行卡ID
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不是你的银行卡
}
```

### 获取银行卡
> /user/card/get

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 不是买家用户
	'body': [{
		'card_id': 银行卡ID
		'card': 银行卡号
		'is_default': 是否默认
	}]
}
```

## 商品

### 获取商品类别
> /category/list

- request
```
{}
```
- response
```
{
	'code': 0
	'msg': OK
	'body': [{
		'category_name': 商品类别
		'category_id': 类别ID
	}]
}
```

### 获取一个类别的所有商品
> /category/good-list

- request
```
{
	'category_id': 类别ID
}
```
- response
```
{
	'code': 0
	'msg': OK
	'body': [{
		'good_id': 商品ID
		'brand': 品牌名
		'good_name': 商品名
		'store': 商品库存
		'price': 商品价格
		'pic': 商品图片
	}]
}
```

### 卖家添加商品
> /seller/good/add

- request
```
{
	'category_id': 商品类别ID
	'name': 商品名
	'price': 商品价格
	'store': 商品库存
	'pic': 商品图片
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 添加错误
	'body': 商品ID
}
```

### 卖家删除商品
> /seller/good/remove

- request
```
{
	'good_id': 商品ID
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 不是你的商品
	'body': []
}
```

### 卖家商品列表
> /seller/good/list

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 不是商家用户
	'body': [{
		'good_id': 商品ID
		'good_name': 商品名
		'store': 商品库存
		'price': 商品价格
		'pic': 商品图片
	}]
}
```

## 按钮

### 买家设置按钮
> /buyer/button/set

- request
```
{
	'good_id': 商品ID
	'number': 购买数量
{
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': 购买数量错误 ／ 不存在的商品ID ／ 商品已下架 ／ 当前用户不是买家 ／ 设置错误
	'body': []
}
```

### 买家获取设置按钮列表
> /buyer/button/list

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不是买家用户
	'body': [{
		'category_id': 商品类别ID
		'category_name': 商品类别名称
		'good_id': 商品ID
		'good_name': 商品名称
		'number': 购买ID
	}]
}
```

### 按钮新增订单
> /order/add

- request
```
{
	'user_id': 	用户ID
	'category_id': 商品类别ID
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 余额不足 ／ 库存不足 ／ 未选择地址 ／ 未添加银行卡 ／ 商品下架 ／ 商品未初始化
	'body': []
}
```

## 订单

### 用户获取订单
> /order/list

- hint
```
有买家有卖家
```
- request
```
{
	'status': 'unsend' / 'unreceive'
	'page': 查看页码
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK ／ 页码错误
	'body': {
		is_over: 是否查看全部
		order_list: [{
			'order_id': 订单ID
			'good_name': 商品名
			'real_name': 买家姓名
			'phone': 买家手机
			'address': 买家地址
			'number': 商品数量
		}]
	}
}
```

### 卖家确认发货
> /order/send

- request
```
{
	'order_id': 订单ID
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': 不是你的订单 ／ 订单状态错误
	'body': []
}
```

### 买家确认收货
> /order/receive

- request
```
{
	'order_id':  订单ID
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': 不是你的订单 ／ 订单状态错误
	'body': []
}
```


## 其他

### 用户初始化按钮

- request
```
{
	'user_id': 用户ID,
	'wifi_SSID': Wifi账号
	'wifi_password': Wifi密码
{
```
- response
```
{
    'code': 错误代码，默认为0（OK）
{
```
