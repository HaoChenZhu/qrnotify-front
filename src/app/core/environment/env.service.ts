export class EnvService {
    [key: string]: any;

    public apiRestDomain = '';
    public adminContext = '';
    constructor() {
        console.log('EnvService initialized with:', this); // ¿Qué imprime esto?
    }

}