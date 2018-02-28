/**
 * Contains constants used application wide.
 */
export class AppConstants {
    private _serverUrl: string;

    constructor(){
        this._serverUrl = 'http://localhost:8009';
    }

    /**
     * Returns server base url.  
     */
    get serverUrl(): string {
        return this._serverUrl;
    }
}
