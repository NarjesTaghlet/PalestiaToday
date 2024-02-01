// quizz-tine.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz-tine',
  templateUrl: './quizz-tine.component.html',
  styleUrls: ['./quizz-tine.component.css']
})
export class QuizzTineComponent implements OnInit {
  currentQuestionIndex: number = 0;
  selectedAnswer: string = '';
  score: number = 0;
  userAnswers: any[] = [];
  questions: any[] = [
    {
      question: 'What is the capital of Palestine?',
      options: ['Jerusalem', 'Ramallah', 'Gaza', 'Hebron'],
      correctAnswer: 'Jerusalem'
    },
    {
      question: 'Which sea is located to the west of Palestine?',
      options: ['Mediterranean Sea', 'Dead Sea', 'Red Sea', 'Black Sea'],
      correctAnswer: 'Mediterranean Sea'
    },
    {
      question: 'What is the official language of Palestine?',
      options: ['Arabic', 'Hebrew', 'English', 'French'],
      correctAnswer: 'Arabic'
    },
    {
      question: 'Which city is known for its historic market, or "souq," in Palestine?',
      options: ['Nablus', 'Bethlehem', 'Jericho', 'Haifa'],
      correctAnswer: 'Nablus'
    },
    {
      question: 'In which year did the Nakba occur?',
      options: ['1947', '1948', '1950', '1960'],
      correctAnswer: '1948'
    },
    {
      question: 'What is the traditional Palestinian dish made of minced meat and bulgur?',
      options: ['Tabbouleh', 'Hummus', 'Kebbeh', 'Falafel'],
      correctAnswer: 'Kebbeh'
    },
    {
      question: 'Which Palestinian city is famous for its olive oil production?',
      options: ['Hebron', 'Ramallah', 'Nablus', 'Jerusalem'],
      correctAnswer: 'Nablus'
    },
    {
      question: 'What is the significance of the Dome of the Rock in Jerusalem?',
      options: ['Jewish Synagogue', 'Christian Church', 'Islamic Mosque', 'Buddhist Temple'],
      correctAnswer: 'Islamic Mosque'
    },  ];

  get currentQuestion(): any {
    return this.questions[this.currentQuestionIndex];
  }

  ngOnInit(): void {
  }

  submitAnswer(): void {
    // Populate the userAnswers array
    const currentQuestion = this.currentQuestion;
    const userAnswer = {
      question: currentQuestion.question,
      selectedAnswer: this.selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer
    };
    this.userAnswers.push(userAnswer);  // Add the current question and answers to the array

    // Handle answer submission logic here
    if (this.selectedAnswer === currentQuestion.correctAnswer) {
      this.score++; // Increment the score if the answer is correct
    }

    setTimeout(() => {
      this.selectedAnswer = '';  // Reset the selected answer for the next question
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex === this.questions.length) {
        console.log('Quiz completed. Score:', this.score);
        this.displayCorrectAnswers();  // Call displayCorrectAnswers method after quiz is completed
      }
    }, 1000);
  }

  // Existing displayCorrectAnswers method remains the same


  // New method to display the correct answers
  displayCorrectAnswers(): void {
    console.log('Correct Answers:');
    this.userAnswers.forEach(answer => {
      console.log(`Question: ${answer.question}`);
      console.log(`Your Answer: ${answer.selectedAnswer}`);
      console.log(`Correct Answer: ${answer.correctAnswer}`);
      console.log('---');
    });
  }


}
