import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private baseUrl = 'http://localhost:9393/suk/calculator'; // Assurez-vous que l'URL correspond au backend

  constructor(private http: HttpClient) {}

  getPlugins(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/plugins`);
  }

  calculate(operation: string, num1: number, num2: number): Observable<number> {
    // Enlever le segment supplémentaire /calculator
    return this.http.get<number>(
      `${this.baseUrl}/calculate?operation=${operation}&num1=${num1}&num2=${num2}`
    );
  }

  
}
