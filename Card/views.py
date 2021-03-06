import re

from Card.models import Card
from base.common import get_user_from_session
from base.decorator import require_json, require_login, require_params
from base.error import Error
from base.response import response, error_response


@require_json
@require_params(['card', 'is_default'])
@require_login
def add_card(request):
    """
    用户添加银行卡
    """
    card = request.POST['card']
    card_regex = '^[0-9]{19}$'
    regex_ret = re.search(card_regex, card)
    if regex_ret is None:
        return error_response(Error.CARD_LENGTH)
    is_default = str(request.POST['is_default']) == '1'
    o_user = get_user_from_session(request)
    ret = Card.create(o_user, card, is_default)
    return response(body=ret.body.pk) if ret.error == Error.OK else error_response(ret.error)


@require_json
@require_params(['card_id'])
@require_login
def set_default_card(request):
    """
    用户设置默认银行卡
    """
    card_id = request.POST['card_id']
    o_user = get_user_from_session(request)
    ret = Card.get(card_id)
    if ret.error != Error.OK:
        return error_response(ret.error)
    o_card = ret.body
    ret = o_card.set_default(o_user)
    return response() if ret.error == Error.OK else error_response(ret.error)


@require_login
def delete_card(request, card_id):
    """
    用户删除银行卡
    """
    o_user = get_user_from_session(request)
    ret = Card.get(card_id)
    if ret.error != Error.OK:
        return error_response(ret.error)
    o_card = ret.body
    ret = o_card.remove(o_user)
    return response() if ret.error == Error.OK else error_response(ret.error)


@require_login
def get_card_list(request):
    """
    用户获取银行卡列表
    """
    o_user = get_user_from_session(request)
    ret = o_user.get_card_list()
    return response(body=ret.body) if ret.error == Error.OK else error_response(ret.error)
