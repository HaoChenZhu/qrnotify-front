import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
/* import { AuthService } from "../security/auth.service";
 */import OktaAuth from "@okta/okta-auth-js";

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
}
