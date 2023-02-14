import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );
    if (!validRoles || validRoles.length === 0) return true;
    const userRoles: string[] = context.getArgs()[0].user.roles;
    if (!userRoles) return false;
    const hasRole = () => validRoles.some((role) => userRoles.includes(role));
    if (!hasRole()) throw new UnauthorizedException('You are not authorized');
    return true;
  }
}
