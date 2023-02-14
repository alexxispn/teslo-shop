import { createParamDecorator } from '@nestjs/common';

export const GetRawHeaders = createParamDecorator((data, context) => {
  const req = context.switchToHttp().getRequest();
  return req.rawHeaders;
});
