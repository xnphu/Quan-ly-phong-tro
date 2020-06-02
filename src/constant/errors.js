import createError from 'http-errors';

export const ERRORS = {
  BAD_STRUCTURE: createError.BadRequest('Bad Structure'),
  USER_NOTFOUND_ERROR: createError.BadRequest('Không tìm thấy người dùng!'),
  UNAUTHORIZED_ERROR: createError.Unauthorized('Không được cấp quyền!'),
  INVALID_PASSWORD_ERROR: createError.BadRequest('Mật khẩu sai!'),
  NOTHING_CHANGED: createError.BadGateway('Không có gì thay đổi'),
  USER_EXIST: createError.BadRequest('Tài khoản đã tồn tại'),
  ROOM_EXIST: createError.BadRequest('Phòng đã tồn tại'),
  ROOM_NOT_EXIST: createError.BadRequest('Phòng không tồn tại'),
};
