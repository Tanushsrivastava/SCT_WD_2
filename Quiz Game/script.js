/* ================= QUESTIONS ================= */

let allQuestions = {
    web: {
        easy: [
            {q:"What does HTML stand for?", o:["Hyper Text Markup Language","High Text Machine Language","Hyper Tool"], a:0},
            {q:"What is CSS used for?", o:["Styling","Programming","Database"], a:0},
            {q:"Which tag is used for paragraph?", o:["<p>","<h1>","<div>"], a:0},
            {q:"Which language runs in browser?", o:["JavaScript","Python","C"], a:0},
            {q:"Which tag is used for image?", o:["<img>","<image>","<pic>"], a:0}
        ],
        medium: [
            {q:"What is Bootstrap?", o:["CSS Framework","Language","DB"], a:0},
            {q:"What does Flexbox do?", o:["Layout","Logic","Storage"], a:0},
            {q:"What is margin?", o:["Outer space","Inner space","Border"], a:0},
            {q:"What is padding?", o:["Inner space","Outer space","Color"], a:0},
            {q:"Which property sets color?", o:["color","bg","font"], a:0}
        ],
        hard: [
            {q:"What is DOM?", o:["Document Object Model","Data Model","None"], a:0},
            {q:"What is API?", o:["Interface","Language","DB"], a:0},
            {q:"What is async in JS?", o:["Non-blocking","Blocking","Loop"], a:0},
            {q:"What is localStorage?", o:["Browser storage","Server DB","Cache"], a:0},
            {q:"What is JSON?", o:["Data format","Language","Database"], a:0}
        ]
    },

    python: {
        easy: [
            {q:"Python file extension?", o:[".py",".js",".html"], a:0},
            {q:"print() is used for?", o:["Output","Input","Loop"], a:0},
            {q:"Which symbol is used for comment?", o:["#","//","<!--"], a:0},
            {q:"Which keyword defines function?", o:["def","func","function"], a:0},
            {q:"Python is?", o:["Language","OS","Browser"], a:0}
        ],
        medium: [
            {q:"What is list?", o:["Collection","Loop","Function"], a:0},
            {q:"len() does?", o:["Length","Print","Input"], a:0},
            {q:"Tuple is?", o:["Immutable","Mutable","Loop"], a:0},
            {q:"Dictionary stores?", o:["Key-Value","Array","Loop"], a:0},
            {q:"range() is used for?", o:["Loop","Print","Input"], a:0}
        ],
        hard: [
            {q:"Lambda function is?", o:["Anonymous","Loop","Class"], a:0},
            {q:"What is OOP?", o:["Object Oriented","Loop","DB"], a:0},
            {q:"What is inheritance?", o:["Reuse code","Delete code","Loop"], a:0},
            {q:"What is module?", o:["File","Loop","Variable"], a:0},
            {q:"What is exception?", o:["Error handling","Loop","Print"], a:0}
        ]
    },

    iot: {
        easy: [
            {q:"IoT stands for?", o:["Internet of Things","Input Output Tech","None"], a:0},
            {q:"Sensor does?", o:["Collect data","Display","Store"], a:0},
            {q:"Device connects via?", o:["Internet","Cable","Paper"], a:0},
            {q:"IoT used in?", o:["Smart home","Book","Pen"], a:0},
            {q:"Basic IoT device?", o:["Arduino","Keyboard","Mouse"], a:0}
        ],
        medium: [
            {q:"What is actuator?", o:["Output device","Input","Loop"], a:0},
            {q:"Cloud used for?", o:["Storage","Input","Print"], a:0},
            {q:"Protocol example?", o:["HTTP","CSS","HTML"], a:0},
            {q:"WiFi used for?", o:["Connection","Storage","Print"], a:0},
            {q:"Data from sensor goes to?", o:["Controller","User","Paper"], a:0}
        ],
        hard: [
            {q:"Arduino is?", o:["Microcontroller","Software","App"], a:0},
            {q:"Raspberry Pi is?", o:["Mini computer","Sensor","Wire"], a:0},
            {q:"MQTT is?", o:["Protocol","Language","DB"], a:0},
            {q:"Edge computing?", o:["Local processing","Cloud","Loop"], a:0},
            {q:"IoT security concern?", o:["Data leak","Color","Font"], a:0}
        ]
    },

    dbms: {
        easy: [
            {q:"DBMS stands for?", o:["Database Management System","Backup","Model"], a:0},
            {q:"Database stores?", o:["Data","Style","Code"], a:0},
            {q:"SQL is?", o:["Query language","Style","Loop"], a:0},
            {q:"Table contains?", o:["Rows & Columns","Only rows","Only columns"], a:0},
            {q:"Primary key is?", o:["Unique","Duplicate","Null"], a:0}
        ],
        medium: [
            {q:"Foreign key?", o:["Reference key","Main key","None"], a:0},
            {q:"Normalization?", o:["Organize data","Delete","Print"], a:0},
            {q:"Index used for?", o:["Fast search","Delete","Print"], a:0},
            {q:"Query retrieves?", o:["Data","Style","Loop"], a:0},
            {q:"DBMS type?", o:["Relational","Only file","None"], a:0}
        ],
        hard: [
            {q:"ACID stands for?", o:["Atomicity etc","Loop","Style"], a:0},
            {q:"Transaction?", o:["Process","Color","Loop"], a:0},
            {q:"Join used for?", o:["Combine tables","Delete","Insert"], a:0},
            {q:"View is?", o:["Virtual table","Real","Loop"], a:0},
            {q:"Stored procedure?", o:["Precompiled query","Loop","Style"], a:0}
        ]
    }
};

/* ================= LOGIC ================= */

let playerName = "";
let questions = [];
let current = 0;
let score = 0;
let timer;
let timeLeft = 10;

/* 🔊 SOUND FIX */
let correctSound = new Audio("https://www.soundjay.com/buttons/sounds/button-4.mp3");
let wrongSound = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");
let clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

/* SAFE PLAY FUNCTION */
function playSound(sound){
    sound.currentTime = 0;
    sound.play().catch(()=>{});
}

/* UNLOCK SOUND (IMPORTANT) */
document.body.addEventListener("click", () => {
    playSound(clickSound);
}, { once: true });

/* START */
function startQuiz(){
    playerName = document.getElementById("playerName").value;

    if(playerName===""){
        alert("Enter your name!");
        return;
    }

    playSound(clickSound);

    let stream = document.getElementById("stream").value;
    let difficulty = document.getElementById("difficulty").value;

    questions = allQuestions[stream][difficulty];

    current = 0;
    score = 0;

    document.getElementById("startScreen").classList.add("d-none");
    document.getElementById("quizBox").classList.remove("d-none");

    loadQuestion();
}

/* LOAD */
function loadQuestion(){
    resetTimer();

    let q = questions[current];

    document.getElementById("questionNo").innerText = `Question ${current+1}`;
    document.getElementById("question").innerText = q.q;

    let html="";
    q.o.forEach((opt,i)=>{
        html+=`<button class="btn option w-100 mb-2" onclick="selectOption(${i})">${opt}</button>`;
    });

    document.getElementById("options").innerHTML=html;
}

/* SELECT */
function selectOption(i){
    let correct = questions[current].a;
    let btns = document.querySelectorAll(".option");

    btns.forEach(b=>b.disabled=true);

    if(i===correct){
        btns[i].classList.add("btn-success");
        playSound(correctSound);
        score++;
    } else {
        btns[i].classList.add("btn-danger");
        btns[correct].classList.add("btn-success");
        playSound(wrongSound);
    }

    clearInterval(timer);
}

/* NEXT */
function nextQuestion(){
    current++;
    if(current < questions.length){
        loadQuestion();
    } else {
        finishQuiz();
    }
}

/* FINISH */
function finishQuiz(){
    playSound(clickSound);

    let data = JSON.parse(localStorage.getItem("leaderboard")) || [];

    data.push({name: playerName, score: score});

    data.sort((a,b)=>b.score-a.score);
    data = data.slice(0,5);

    localStorage.setItem("leaderboard", JSON.stringify(data));

    showLeaderboard();
}

/* LEADERBOARD */
function showLeaderboard(){
    document.getElementById("quizBox").classList.add("d-none");
    document.getElementById("startScreen").classList.remove("d-none");

    let data = JSON.parse(localStorage.getItem("leaderboard")) || [];

    let html="";
    data.forEach((p)=>{
        html+=`<li class="list-group-item d-flex justify-content-between">
        ${p.name} <span>${p.score}</span></li>`;
    });

    document.getElementById("leaderboardList").innerHTML=html;
}

/* TIMER */
function resetTimer(){
    timeLeft=10;
    document.getElementById("timer").innerText=timeLeft;

    timer=setInterval(()=>{
        timeLeft--;
        document.getElementById("timer").innerText=timeLeft;

        if(timeLeft===0){
            clearInterval(timer);
            nextQuestion();
        }
    },1000);
}