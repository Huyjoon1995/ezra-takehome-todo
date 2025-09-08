import { HttpHandler } from 'msw';

declare global {
    interface Window {
        __MSW_HANDLERS__: HttpHandler[];
    }
}
