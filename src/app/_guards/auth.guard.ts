import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AutenticacaoService } from '../_services/autenticacao.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private autenticacaoService: AutenticacaoService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.autenticacaoService.currentUserValue;
        
        if (currentUser) {
            if (route.data.roles && route.data.roles.indexOf(currentUser.papel) === -1) {
                this.router.navigate(['/']);
                return false;
            }
 
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}