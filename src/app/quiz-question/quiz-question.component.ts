import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz-service/quiz.service';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
})
export class QuizQuestionComponent implements OnInit {
  public quiz: any;
  public apiSubscribe: any;
  public routeSubscribe: any;
  public answerSubmitted: any = [];
  public quizAnswered: any = 1;
  public allAnswered: any = false;
  public quizResult: Boolean = false;
  public quizID: any;
  public progress: any = 0;
  public startTime: any = 0;
  public ellapsedTime: any = '0:00';
  public timer: any = 0;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeSubscribe = this.activatedRoute.params.subscribe((params) => {
      this.quizID = params['id'];
      if (this.quizID && this.quizID > 0) {
        this.allAnswered = false;
        this.apiSubscribe = this.quizService
          .getQuizQuestion(this.quizID)
          .subscribe((response: any) => {
            this.quiz = response;
            this.quiz.questions.forEach((element) => {
              element.selected = null;
              if (element.options) {
                element.options = element.options.split(',');
              }
            });
            this.quizAnswered = this.quiz.questions[0].id;
            this.goToNextQuestion(this.quizAnswered, 0);
          });
      }
    });
  }

  ngOnInit(): void {}

  /**
   * submit answer and redirect to next question
   * @method submitAnswer
   */
  public submitAnswer(id, answer) {
    this.answerSubmitted.push({
      ques_id: id,
      submitted_option: answer,
    });
    this.goToNextQuestion(this.quizAnswered + 1, this.progress + 20);
    if (this.answerSubmitted.length > 4) {
      this.allAnswered = true;
      const request = {
        quiz_id: this.quizID,
        mappings: this.answerSubmitted,
      };
      this.quizService.getQuizResult(request).subscribe((response) => {
        this.quizResult = response;
        this.router.navigate(['/result']);
      });
    }
  }

  public goToNextQuestion(index: number, progress: number) {
    this.quizAnswered = index;
    this.progress = progress;
    this.loadQuiz();
    if (this.progress <= 100) {
      document.getElementById("progress-bar").style.width = `${this.progress}%`;
    }
  }

  /**
   * @method loadQuiz
   */
  public loadQuiz(quizName: string = null) {
    this.timer = setInterval(() => {
      this.startTime = this.startTime + 1;
      this.ellapsedTime = this.parseTime(this.startTime);
    }, 1000);
    setTimeout(() => {
      this.startTime = 0;
      clearInterval(this.timer);
      this.goToNextQuestion(this.quizAnswered + 1, this.progress + 20);
    }, 15000);
  }

  /**
   * @method parseTime
   */
  public parseTime(totalSeconds: number) {
    let secs: string | number = Math.round(totalSeconds % 60);
    secs = (secs < 10 ? '0' : '') + secs;
    return `0:${secs}`;
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
    this.apiSubscribe.unsubscribe();
  }
}
