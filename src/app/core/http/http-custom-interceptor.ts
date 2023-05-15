import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../security/auth.service";
import OktaAuth from "@okta/okta-auth-js";

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {

    constructor(private oktaAuth: OktaAuth) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.includes('/admin')) {
            const accessToken = this.oktaAuth.getAccessToken();
            if (accessToken) {
                const clonedReq = req.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + accessToken
                    }
                });
                return next.handle(clonedReq);
            }
        }
        return next.handle(req);
    }
    /*  intercept(request: HttpRequest<any>, next: HttpHandler) {
         // Obtén el token de acceso de Okta
         const accessToken = this.oktaAuth.getAccessToken();
 
         // Clona la solicitud original y añádele el encabezado de autorización
         const clonedRequest = request.clone({
             setHeaders: {
                 Authorization: 'Bearer ' + accessToken
             }
         });
 
         // Envía la nueva solicitud
         return next.handle(clonedRequest);
     } */
}
