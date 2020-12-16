import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz-service/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  public questions: any;
  public apiSubscribe: any;

  constructor(private quizService: QuizService, private router: Router) {
    this.apiSubscribe = this.quizService.getAllQuiz().subscribe((response: any) => {
      this.questions = response;
    });
  }

  ngOnInit() {}

  /**
   * navigate to quiz page for the selected quiz
   * @method naviagteToQuizPage
   */
  public naviagteToQuizPage(id) {
    this.router.navigate(['/quiz', id]);
  }

  ngOnDestroy() {
    this.apiSubscribe.unsubscribe();
  }
}
