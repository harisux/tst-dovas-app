import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Nudo } from 'src/app/models/nudo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestConfService {

  constructor(private http: HttpClient) { }

  //private urlServer = 'http://localhost:3000/api';
  private urlServer = 'https://dovas-app.herokuapp.com/api';

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error);
  }

  //Nudos
  obtenerNudos(): Observable<Nudo[]> {
    return this.http.get<Nudo[]>(`${this.urlServer}/nudos`).pipe(
      catchError(this.handleError)
    );
  }
  crearNudo(nuevoNudo: Nudo): any {
    return this.http.post(`${this.urlServer}/nudo`, nuevoNudo, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  editarNudo(nudoEdit: Nudo): any {
    return this.http.put(`${this.urlServer}/nudo/${nudoEdit._id}`, nudoEdit, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  borrarNudo(nudoBorrar: Nudo): any {
    return this.http.delete<Nudo>(`${this.urlServer}/nudo/${nudoBorrar._id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
