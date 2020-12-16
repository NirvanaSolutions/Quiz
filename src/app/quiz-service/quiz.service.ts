import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {


  constructor(private http: HttpClient) { }

  /**
   * @method getAllQuiz
   */
  public getAllQuiz(): Observable<any> {
    const url =  environment.apiUrl + 'quiz';
    return this.http.get(url);
  }

  /**
   * @method getQuizQuestion
   */
  public getQuizQuestion(id: any): Observable<any> {
    const url =  environment.apiUrl + `quiz_${id}`;
    return this.http.get(url);
  }

  /**
   * @method getQuizResult
   */
  public getQuizResult(request): Observable<any> {
      const url =  environment.apiUrl + 'user-quiz-score';
      return this.http.post(url, request);
  }

}
