import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotosGateway } from '../../../domain/models/photos/gateways/photos.gateway';
import { environment } from '../../../environments/environment';
import { Photos } from '../../../domain/models/photos/photos.model';


@Injectable({
  providedIn: 'root'
})
export class PhotosAdapterService extends PhotosGateway {

  private _apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    super();
    this._apiUrl = `${environment.backend}photos`;
  }

  getPhotos(): Observable<Array<Photos>> {
    const url = `${this._apiUrl}`;
    return this.http.get<Array<Photos>>(url);
  }

  getPhotosById(id: number): Observable<Photos> {
    throw new Error('Method not implemented.');
  }

}
