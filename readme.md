# AKS系统说明书0714 v3.3

## 环境配置

- Python 3.5.3
- Django 1.11.0
- requests
- quniu
- pymysql


## 接口文档

### 用户登录

#### 发送验证码
> PUT /session

- request
```
{
    'phone': 手机号
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 发送失败 / 手机号格式错误
	'body': []
}
```

#### 用户注册
> POST /user

- request
```
{
	'password': 密码
	'is_seller': 是否是商家
	'brand': 商家品牌（当is_seller=1时有效）
	'username': 用户名（当is_seller=1）
	'captcha': 手机验证码（当is_seller=0）
}
```
- response
```
{s't
	'code': 错误代码，默认为0（OK）
	'msg': OK / 已存在的用户名 / 验证码错误 / 验证码过期 / 用户注册错误 / 品牌字符串长度错误 / 用户名字符串长度错误 / 密码太短
	'body': {
	    'user_id': 用户ID
	    'avatar': 用户头像链接
	}
}
```

#### 用户登录
> POST /session

- request
```
{
    'username': 用户名
    'password': 密码
    'is_seller': 是否为商家
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不存在的用户名 / 错误的用户名或密码
	'body': {
	    'user_id': 用户ID
	    'avatar': 用户头像链接
	    'brand': 商家品牌（仅当用户为商家时存在）
	}
}
```

#### 用户退出
> DELETE /session

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

#### 编辑收货信息
> PUT /user/address

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
	'msg': OK / 不是买家用户 / 真实姓名长度错误 / 地址长度错误
	'body': []
}
```

#### 获取收货信息
> GET /user/address

- response
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不是买家用户
	'body':  {
		'real_name': 真实姓名
		'address': 地址
	}
}
```

#### 添加银行卡
> POST /card

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
	'msg': OK / 添加错误
	'body': 银行卡ID
}
```

#### 设置默认银行卡
> PUT /user/default-card

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

#### 删除银行卡
> DELETE /card/<card_id>

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不是你的银行卡
}
```

#### 获取银行卡
> GET /card

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
		'card_id': 银行卡ID
		'card': 银行卡号
		'is_default': 是否默认
	}]
}
```

## 商品

#### 获取商品类别
> GET /category?type=<type>

- request
```
type: all / unset
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

#### 获取一个类别的所有商品
> GET /category/<category_id>/good

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
		'good_id': 商品ID
		'brand': 品牌名
		'good_name': 商品名
		'store': 商品库存
		'price': 商品价格
		'pic': 商品图片
		'description': 商品描述
		'category_id': 商品类别ID
		'category_name': 商品类别名
	}]
}
```

#### 卖家添加商品
> POST /good

- request
```
{
	'category_id': 商品类别ID
	'good_name': 商品名
	'price': 商品价格
	'store': 商品库存
	'pic': 商品图片(->gZip)->Base64
	'description': 商品描述
	'gzipped': 是否使用gzip压缩图片 0/1
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 商品名长度错误 / 商品描述长度错误 / 商品价格错误 / 商品库存错误 / 添加错误 / 图片解析错误 / 图片过大 / 图片上传失败
	'body': 商品ID
}
```

#### 卖家编辑商品
> PUT /good/<good_id>

- request
```
{
	'name': 商品名
	'price': 商品价格
	'store': 商品库存
	'pic': 商品图片(->gZip)->Base64
	'description': 商品描述
	'gzipped': 是否使用gzip压缩图片 0/1
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 商品名长度错误 / 商品描述长度错误 / 商品价格错误 / 商品库存错误 / 添加错误 / 图片解析错误 / 图片过大 / 图片上传失败
	'body': []
}
```

#### 卖家删除商品
> DELETE /good/<good_id>

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不是你的商品
	'body': []
}
```

#### 卖家商品列表简要信息
> GET /good

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不是商家用户
	'body': [{
		'good_id': 商品ID
		'good_name': 商品名
		'store': 商品库存
		'price': 商品价格
		'pic': 商品图片
	}]
}
```

#### 商家获取单一商品
>GET /good/<good_id>

- request
```
{}
```
- response
```
{
    'code': 0
    'msg': OK
    'body': {
        'good_id': 商品ID
		'good_name': 商品名
		'store': 商品库存
		'price': 商品价格
		'pic': 商品图片
		'description': 商品描述
		'category_id': 商品类别ID
		'category_name': 商品类别名
    }
}
```

## 按钮

#### 买家新增设置按钮
> POST /button

- request
```
{
	'good_id': 商品ID
	'number': 购买数量
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 购买数量错误 / 不存在的商品ID / 商品已下架 / 当前用户不是买家 / 设置错误
	'body': 按钮ID
}
```

#### 买家编辑设置按钮
> PUT /button/<button_id>

- request
```
{
	'good_id': 商品ID
	'number': 购买数量
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 购买数量错误 / 不存在的商品ID / 商品已下架 / 当前用户不是买家 / 设置错误 / 商品不属于此分类
	'body': 按钮ID
}
```

#### 买家删除设置按钮
> DELETE /button/<button_id>

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 不是你的按钮
	'body': 按钮ID
}
```

#### 买家获取设置按钮列表
> GET /button

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
	    'button_id': 按钮ID
		'category_id': 商品类别ID
		'category_name': 商品类别名称
		'good_id': 商品ID
		'good_name': 商品名称
		'number': 购买ID
		'good_pic': 商品图片
		'price': 商品单价
	}]
}
```

#### 按钮新增订单
> POST /order

- request
```
{
	'user_id': 用户ID
	'category_id': 商品类别ID
}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 余额不足 / 库存不足 / 未选择地址 / 未添加银行卡 / 商品下架 / 商品未初始化
	'body': []
}
```

## 订单

#### 用户获取订单
> GET /order?status=<status>&[exist=<exist>]&[count=<count>]

- request
```
status: unsent / unreceived
exist: 已存在的条目数（当为商家用户时有效，买家不需要传）
count: 每页显示条数（当为商家用户时有效，买家不需要传）
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': OK / 已存在条数错误 / 每页条数错误
	'body': {
	    count: 当前时刻订单总数
		order_list: [{
			'order_id': 订单ID
			'good_name': 商品名
			'real_name': 买家姓名
			'phone': 买家手机
			'address': 买家地址
			'number': 商品数量
			'price': 订单总价
			'pic': 商品图片
			'create_time': 订单创建时间
			'deliver_time': 订单发货时间
		}]
	}
}
```

#### 卖家确认发货
> PUT /order/<order_id>/status

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': 不是你的订单 / 订单状态错误
	'body': []
}
```

#### 买家确认收货
> PUT /order/<order_id>/status

- request
```
{}
```
- response
```
{
	'code': 错误代码，默认为0（OK）
	'msg': 不是你的订单 / 订单状态错误
	'body': []
}
```


## 其他

#### 用户初始化按钮

- request
```
{
	'user_id': 用户ID,
	'wifi_SSID': Wifi账号
	'wifi_password': Wifi密码
}
```
- response
```
{
    'code': 错误代码，默认为0（OK）
}
```
