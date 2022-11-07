import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PRIVILEGE_LEVEL } from 'src/config/guardsConstants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const privilegeLevel = this.reflector.get<string>(
      PRIVILEGE_LEVEL,
      context.getHandler(),
    );
    if (privilegeLevel && user.role > privilegeLevel) return false;
    return true;
  }
}
