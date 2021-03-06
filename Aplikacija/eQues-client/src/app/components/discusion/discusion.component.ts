import { Component, OnInit, TRANSLATIONS_FORMAT } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Question } from 'src/app/models/question';
import { Answer } from 'src/app/models/answer';
import { Comment } from 'src/app/models/comment';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { DiscussionField } from 'src/app/models/discussion';
import { CommentField } from 'src/app/models/commentField';
import { Grade } from 'src/app/models/grade';
import { userRating } from 'src/app/models/userRating';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-discusion',
  templateUrl: './discusion.component.html',
  styleUrls: ['./discusion.component.css']
})
export class DiscusionComponent implements OnInit {
  currentUser: User;
  question: Question;
  userAsking: User;
  answers: Answer[]; // brisi
  comments: Comment[]; // brisi
  users: User[]; // brisi
  discussion: DiscussionField[];
  pinButtonClass: String = "";
  starColor: String = "accent";
  currentUserRatings: userRating[];
  userImages: Image[];

  imagePath: String;

  constructor(private authService: AuthService,
              private userService: UserService,
              private questionService: QuestionService,
              private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;

      this.imagePath = 'http://127.0.0.1:5000/static/images/user_images/';
    })

    this.question = new Question();

    this.activatedRoute.paramMap.subscribe(params => {
      this.question.id = parseInt(params.get('questionId'));
    })

    this.questionService.getDiscussion(this.question.id).subscribe(
      resp => {
        this.question = resp['question'];
        this.answers = resp['answers'];
        this.comments = resp['comments'];
        this.users = resp['users'];
        this.userAsking = resp['userAsking'];
       // this.userImages = resp['images'];

        this.currentUserRatings = new Array();

        this.discussion = new Array();

        if(resp['answers'] != undefined) {

          resp['answers'].forEach(answer => {

            // user ratings
            this.currentUserRatings.push(new userRating(new Grade(0, this.currentUser?.id), answer.id));

            console.log(this.currentUserRatings);

            answer.grades.forEach(grade => {
              console.log(grade);
              if(grade.userId == this.currentUser?.id) {
                this.currentUserRatings.forEach(rat => {
                  if(rat.answerId == answer.id) {
                    console.log('u if ' + grade.value);
                    rat.grade.value = grade.value;
                  }
                })
              }
            });

            let discField = new DiscussionField();
            discField.comments = new Array();
            discField.answer = answer;

            console.log('Odgovor je pinovan: ' + answer.isPinned);

            resp['users'].forEach(user => {
              if(user.id == answer.userId) {
                discField.answerUser = user;
              }
            });

            if(resp['comments'] != undefined) {
              resp['comments'].forEach(comment =>  {
                if(comment.answerId == answer.id) {
                  // discField.comments.push(new C)
                  // discField.comments[i].comment = this.comments[i];

                  resp['users'].forEach(user => {
                    if(comment.userId == user.id) {
                      // discField.comments[i].user = new User();
                      // discField.comments[i].user = this.users[i];

                      discField.comments.push(new CommentField(comment, user));
                    }
                  })
                }
              });
            }
            this.discussion.push(discField);
          });
        };
        this.sortAnswers();
      },
      err => {
        console.log(err);
      }
    );


  }

  makeDiscussion() {
    //this.discussion = new DiscussionField[1000]();
    this.answers?.forEach(answer => {
      let discField = new DiscussionField();
      discField.answer = answer;

      this.users?.forEach(user => {
        if(user.id == answer.userId) {
          discField.answerUser = user;
        }
      });

      this.comments?.forEach(comment =>  {
        if(comment.answerId == answer.id) {
          // discField.comments.push(new C)
          // discField.comments[i].comment = this.comments[i];

          this.users?.forEach(user => {
            if(comment.userId == user.id) {
              // discField.comments[i].user = new User();
              // discField.comments[i].user = this.users[i];

              discField.comments?.push(new CommentField(comment, user));
            }
          })
        }
      });

      this.discussion?.push(discField);
    });

    this.discussion?.forEach(dis => {
      console.log(dis.answer.text);
      console.log(dis.answerUser.name);
      console.log();
      dis.comments.forEach(comF => {
        console.log(comF.comment.text);
        console.log(comF.user.name);
      })
    })
  }

  deleteComment(commentId: number) {
    this.discussion.forEach(discField => {
      for(let i = 0; i < discField.comments.length; i++) {
        if(discField.comments[i].comment.id == commentId) {
          discField.comments.splice(i, 1);
        }
      }
    })

    this.questionService.deleteComment(commentId).subscribe(
      resp => {
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteAnswer(answerId: number) {
    for(let i = 0; i < this.discussion.length; i++) {
      if(this.discussion[i].answer.id == answerId) {
        this.discussion.splice(i, 1);
      }
    }

    this.questionService.deleteAnswer(answerId).subscribe(
      resp => {
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    );
  }

  sortAnswers() {
    console.log('u sorting funkciji');
    for(let i = 0; i < this.discussion.length; i++) {
      let answer: DiscussionField;
      if(this.discussion[i].answer.isPinned) {
        answer = this.discussion[i];
        this.discussion.splice(i, 1);
        this.discussion.unshift(answer);
      }
    }


    // a.sort(function(x, y) {
    //   // true values first
    //   return (x === y)? 0 : x? -1 : 1;
  }

  pinAnswer(answer: Answer) {
    this.questionService.pinAnswer(answer).subscribe(
      resp => {
        console.log(resp);
        this.sortAnswers();
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    )
  }

  ratingUpdated(rating:any, answerId: number) {
    let oldGradeValue: number;
    console.log(' u rat updated');
    this.discussion.forEach(discField => {
      if(discField.answer.id == answerId) {
        let userGraded: boolean = false;
        discField.answer.grades.forEach(grade => {
          if(grade.userId == this.currentUser.id) {
            oldGradeValue = grade.value;
            grade.value = rating;
            userGraded = true;
          }
        })
        if(oldGradeValue != rating) {
          if(!userGraded) {
            discField.answer.grades.push(new Grade(rating, this.currentUser.id));
          }

          discField.answer.grades.forEach(grade => {
            if(grade.userId == this.currentUser.id) {
              this.currentUserRatings.forEach(rat => {
                if(rat.answerId == discField.answer.id) {
                  rat.grade.value = grade.value;
                }
              })
            }
          })

          console.log(this.currentUserRatings);

          let jsonData = {
            'answerId': answerId,
            'userId': this.currentUser.id,
            'newGrade': rating
          };

          this.questionService.gradeAnswer(jsonData).subscribe(
            resp => {
              discField.answer = resp['answer'];
            },
            err => {
              console.log(err);
            }
          );
      }
    }
    })
  }
}
