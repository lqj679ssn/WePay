import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Good } from "app/_model";

@Injectable()
export class GoodService {

    private URL: string;
    private headers: Headers;
    private options: RequestOptions;
    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });
    }

    getGoodInfo() {
        this.URL = '/good';
        return this.http.get(this.URL)
            .map((response: Response) => response.json()).catch(this.handleError);
    }

    getCategory() {
        this.URL = "/category?type=all";
        return this.http.get(this.URL)
            .map((response: Response) => response.json()).catch(this.handleError);
    }

    addGoodInfo(good: Good) {
        this.URL = '/good';
        let goodInfo = JSON.stringify({
            category_id: good.category_id,
            name: good.name,
            price: good.price,
            store: good.store,
            pic: good.pic,
            description: good.description,
            gzipped: good.gzipped
        });
        return this.http.post(this.URL, goodInfo, this.options)
            .map((response: Response) => response.json()).catch(this.handleError);
    }

    deleteGoodInfo(good_id: number) {
        this.URL = '/good';
        let deleteURL = this.URL + "/" + good_id;
        return this.http.delete(deleteURL)
            .map((response: Response) => response.json()).catch(this.handleError);
    }

    updateGoodInfo(good: Good) {
        this.URL = '/good';
        let updateURL = this.URL + "/" + good.good_id;
        let goodInfo = JSON.stringify({
            category_id: good.category_id,
            name: good.name,
            price: good.price,
            store: good.store,
            pic: good.pic,
            description: good.description,
            gzipped: good.gzipped
        });
        return this.http.put(updateURL, goodInfo, this.options)
            .map((response: Response) => response.json()).catch(this.handleError);
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}