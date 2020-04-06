'use strict'

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '猫の日実行委員会が1987年に制定した「猫の日」は何月何日？', c:['２月２２日', '８月８日', '３月１日', '１０月２９日']},
    {q: '猫が感じられない味覚は何？', c:['甘味', '苦味', '塩味', '辛味']},
    {q: '猫には、人間の指紋の様に模様が一匹一匹違う場所があります。それはどこでしょう？', c:['鼻', '瞳孔', '爪', '肉球']},
    {q: '猫にとって特に食べさせてはいけない危険な食べ物はどれか？', c:['ネギ類', '鶏ササミ', 'ニンジン', '生卵']},
    {q: '一般的に猫が触られて嫌がることが多いと言われている場所はどこか？', c:['お腹', '腰', 'あご下', '首の後ろ']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;


  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i] ] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered === true) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
      isAnswered = false;
      question.textContent = quizSet[currentNum].q;

      while(choices.firstChild) {
        choices.removeChild(choices.firstChild);
      }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      choices.appendChild(li);
    });

    if (currentNum ===  quizSet.length - 1) {
      btn.textContent = '結果を確認する';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}