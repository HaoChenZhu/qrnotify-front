import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../security/auth.service";
import OktaAuth from "@okta/okta-auth-js";

@Injectable()
export class HttpUserInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // Obtén el token de acceso de Okta
        if (request.url.includes('user')) {
            // Añade el token solo a las peticiones a la API de administradores
            const token = localStorage.getItem('token');
            if (token) {
                const clonedReq = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${token}`)
                });
                return next.handle(clonedReq);
            }
        }

        return next.handle(request);
    }
}
