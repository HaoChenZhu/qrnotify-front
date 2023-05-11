import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../security/auth.service";

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {

    constructor(private oktaAuth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // Obtén el token de acceso de Okta
        const accessToken = this.oktaAuth.getToken();

        // Clona la solicitud original y añádele el encabezado de autorización
        const clonedRequest = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        // Envía la nueva solicitud
        return next.handle(clonedRequest);
    }
}
