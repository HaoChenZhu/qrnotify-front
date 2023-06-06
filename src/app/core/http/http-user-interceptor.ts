import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";


@Injectable()
export class HttpUserInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.url.includes('user')) {
            // Añade el token solo a las peticiones a la API de administradores
            const token = localStorage.getItem('token');
            if (token) {
                const clonedReq = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${token}`)
                });
                return next.handle(clonedReq);
            } {
                this.router.navigate(['/login']);
            }
        }

        return next.handle(request);
    }
}
