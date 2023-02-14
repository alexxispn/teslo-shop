import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, context) => {
  const req = context.switchToHttp().getRequest();
  const user = req.user;
  if (!user) throw new InternalServerErrorException('User not found');
  if (data) return user[data];
  return user;
});
