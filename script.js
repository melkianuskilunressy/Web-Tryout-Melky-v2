
let quizData = [...questions];
quizData.sort(() => Math.random() - 0.5);

let current = 0;
let answers = new Array(quizData.length).fill(null);

function renderQuestion(){
    const q = quizData[current];
    let html = `<h3>Soal ${current+1} dari ${quizData.length}</h3>`;
    html += `<p>${q.question}</p>`;

    q.options.forEach((opt,i)=>{
        const checked = answers[current]===i ? 'checked' : '';
        html += `<label class="option">
        <input type="radio" name="answer" value="${i}" ${checked}
        onchange="answers[${current}]=${i}">
        ${String.fromCharCode(65+i)}. ${opt}
        </label>`;
    });

    html += `<div>`;
    if(current>0) html += `<button class="btn btn-warning text-white" onclick="prevQuestion()">Sebelumnya</button>`;
    if(current<quizData.length-1)
        html += `<button class="btn btn-primary" onclick="nextQuestion()">Berikutnya</button>`;
    else
        html += `<button class="btn btn-success" onclick="finishQuiz()">Selesai</button>`;
    html += `</div>`;

    document.getElementById('quiz-container').innerHTML = html;
}

function nextQuestion(){ current++; renderQuestion(); }
function prevQuestion(){ current--; renderQuestion(); }

function finishQuiz(){
    let correct = 0;
    let review = '';

    quizData.forEach((q,i)=>{
        const user = answers[i];
        const isCorrect = user === q.answer;
        if(isCorrect) correct++;

        review += `<div class="review">
        <strong>Soal ${i+1}</strong><br>
        ${q.question}<br>
        Jawaban Anda: ${user!==null ? String.fromCharCode(65+user) : '-'}<br>
        Jawaban Benar: ${String.fromCharCode(65+q.answer)}<br>
        Pembahasan: ${q.explanation}
        </div>`;
    });

    const wrong = quizData.length - correct;
    const score = Math.round((correct/quizData.length)*100);

    document.getElementById('quiz-container').innerHTML = `
    <h2>Hasil Latihan</h2>
    <p>Total Soal: ${quizData.length}</p>
    <p>Jawaban Benar: ${correct}</p>
    <p>Jawaban Salah: ${wrong}</p>
    <p>Skor: ${score}</p>
    ${review}
    <button onclick="location.reload()">Ulangi</button>`;
}

showHome();


function showHome(){
document.getElementById("quiz-container").innerHTML=`
<div class="text-center py-5">
<h2>SELAMAT DATANG</h2>
<p>Jumlah Soal : <b>${quizData.length}</b></p>
<p>Waktu : <b>120 Menit</b></p>
<button class="btn btn-primary btn-lg" onclick="startQuiz()">GAS</button>
</div>`;
}
function startQuiz(){
document.getElementById("timer").style.display="block";
if(typeof startTimer==='function') startTimer();
renderQuestion();
}

let timeLeft = 120 * 60; // 120 menit

function startTimer() {

    const timer = document.getElementById("timer");

    const interval = setInterval(function () {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timer.innerHTML =
            `⏰ ${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(interval);
            finishQuiz();
        }

    }, 1000);

}