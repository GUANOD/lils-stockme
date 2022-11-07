import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 *
 * If user is staff ensures
 */
@Injectable()
export class EnsureUserGuard implements CanActivate {
  constructor() {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reqUserId = request.params.id;

    if (reqUserId != user.sub) {
    }
    return true;
  }
}
