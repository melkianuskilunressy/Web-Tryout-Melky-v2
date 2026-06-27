// ================= TIMER =================
let timeLeft = 120 * 60; // 120 menit
let timerInterval = null;

function startTimer() {
    const timer = document.getElementById("timer");

    // Hindari timer berjalan lebih dari satu kali
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timer.innerHTML =
            `⏰ Waktu: ${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            alert("Waktu habis!");
            finishQuiz();
        }

    }, 1000);
}

// ================= QUIZ =================

let quizData = [...questions];
quizData.sort(() => Math.random() - 0.5);

let current = 0;
let answers = new Array(quizData.length).fill(null);

function renderQuestion() {

    const q = quizData[current];

    let html = `
    <h3>Soal ${current + 1} dari ${quizData.length}</h3>
    <p>${q.question}</p>
    `;

    q.options.forEach((opt, i) => {

        const checked = answers[current] === i ? "checked" : "";

        html += `
        <label class="option d-block mb-2">
            <input
                type="radio"
                name="answer"
                value="${i}"
                ${checked}
                onchange="answers[${current}] = ${i}">
            ${String.fromCharCode(65 + i)}. ${opt}
        </label>
        `;

    });

    html += `<div class="mt-3">`;

    if (current > 0) {
        html += `<button class="btn btn-warning text-white me-2" onclick="prevQuestion()">Sebelumnya</button>`;
    }

    if (current < quizData.length - 1) {

        html += `<button class="btn btn-primary" onclick="nextQuestion()">Berikutnya</button>`;

    } else {

        html += `<button class="btn btn-success" onclick="finishQuiz()">Selesai</button>`;

    }

    html += `</div>`;

    document.getElementById("quiz-container").innerHTML = html;
}

function nextQuestion() {
    current++;
    renderQuestion();
}

function prevQuestion() {
    current--;
    renderQuestion();
}

function finishQuiz() {

    if (timerInterval) clearInterval(timerInterval);

    let correct = 0;
    let review = "";

    quizData.forEach((q, i) => {

        const user = answers[i];

        const isCorrect = user === q.answer;

        if (isCorrect) correct++;

        review += `
        <div class="review mb-3">
            <strong>Soal ${i + 1}</strong><br>
            ${q.question}<br><br>

            Jawaban Anda :
            ${user !== null ? String.fromCharCode(65 + user) : "-"}<br>

            Jawaban Benar :
            ${String.fromCharCode(65 + q.answer)}<br><br>

            Pembahasan :
            ${q.explanation || "-"}
        </div>
        <hr>
        `;
    });

    const wrong = quizData.length - correct;

    const score = Math.round((correct / quizData.length) * 100);

    document.getElementById("quiz-container").innerHTML = `

        <h2>Hasil Latihan</h2>

        <p><b>Total Soal :</b> ${quizData.length}</p>

        <p><b>Jawaban Benar :</b> ${correct}</p>

        <p><b>Jawaban Salah :</b> ${wrong}</p>

        <p><b>Skor :</b> ${score}</p>

        ${review}

        <button class="btn btn-primary" onclick="location.reload()">
            Ulangi
        </button>

    `;
}

// ================= HALAMAN AWAL =================

function showHome() {

    document.getElementById("timer").style.display = "none";

    document.getElementById("quiz-container").innerHTML = `

    <div class="text-center py-5">

        <h2>Selamat Datang</h2>

        <p>Jumlah Soal : <b>${quizData.length}</b></p>

        <p>Waktu : <b>120 Menit</b></p>

        <button class="btn btn-primary btn-lg" onclick="startQuiz()">

            Mulai Tryout

        </button>

    </div>

    `;
}

function startQuiz() {

    document.getElementById("timer").style.display = "block";

    timeLeft = 120 * 60;

    startTimer();

    renderQuestion();
}

// ================= START =================

showHome();