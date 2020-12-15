import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizComponent } from './quiz/quiz.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'quiz', pathMatch: 'full', component: QuizComponent },
  { path: 'quiz/:id', component: QuizQuestionComponent },
  { path: 'result', component: QuizResultComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
