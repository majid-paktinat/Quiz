    let countDown = 75;
    let interval = 1; // sec
    let flgDeduct = false;   
    let flgFinish = false;
    let QList = ["Who won the 1994 FIFA World Cup?",
                "Which of these star soccer players has never played for Real Madrid?",
                "According to the official FIFA rulebook, how long can a goalkeeper hold onto the ball for?",
                "Anfield is the home of which English Premier League club?",
                "Which of these players has never played for Manchester United?",
                "Why did the Indian national team withdraw from the FIFA World Cup competition in 1950?",
                "In the MLS in what city does the team Chivas USA play?",
                "What are the home colors of the FC Barcelona soccer uniform?",
                "Back in the Mls, who is an all-time leading goal scorer in the league?",
                "Which of these teams is not playing in the EPL in the 2009-2010 season?"];
    let AList = [["Italy", "Argentina", "Germany", "France", "Brazil"],
                ["David Beckham", "Zinedine Zidane", "Ronaldo", "Robinho", "Lionel Messi"],
                ["3 Seconds", "5 Seconds", "30 seconds", "10 seconds", "Until he feels like letting go"],
                ["Manchester United", "West Ham United", "Manchester City", "Liverpool","Everton"],
                ["Eric Cantona", "Bobby Charlton", "Ryan Giggs", "Mark Hughes", "Bobby Moore"],
                ["As a political protest", "Because they did not have enough players to field a full squad", "Because they could not play barefoot", "Because turbans were not allowed", "They didn't, that's just a soccer myth"],
                ["Buffalo, New York", "Baltimore, Maryland", "Carson, California", "Miami, Florida","Phoenix, Arizona"],
                ["Orange and White", "Black and White", "Blue and Red", "Yellow and Blue", "All Blue"],
                ["Landon Donovan", "Jaime Moreno", "Preki", "Carlos Ruiz", "David Beckham"],
                ["Wolverhampton Wanderers", "Birmingham City", "Burnley FC", "Wigan Athletic", "Newcastle United"],];
    let CList = [5,5,2,4,5,3,3,3,2,5];    
    let intervalVar;

    // start quiz | see score board
    // show the time, show the deduction and the numbe of deduction
    // if timer stops redirect the page to game over page and ask for the name
    // write with event delegation
    // of timeover lock the content or redirect
    
    document.querySelector("#nameDiv").style.opacity = "0";
    document.querySelector("#nameDiv").addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("myButton").click();
        }
    })



    function saveRecord(){
        gameOver(document.getElementById("timercountdownDiv").innerHTML, document.querySelector("#success").getAttribute("aria-valuenow"));
        document.querySelector("#nameDiv").style.opacity = "0";
        document.querySelector("#questionsDiv").innerHTML += `<br><h2 style='color:lightgray'>Your record is saved!</h2>
        <br><h3><a href='${window.location.href}'>Play Again...</a></h3>`;
    }


    startQuiz();
    var playerName;

    function gameOver(timeLeft, correctPercentage){
        //playerName = prompt("name ?");
        var d = new Date();
        var t = d.toLocaleDateString();
        // create object
        let gameObj = {
            Name: document.querySelector("#myName").value,
            CorrectAnswers: correctPercentage+"%",
            TimeLeft: timeLeft,
            Date: t
        }
        addToLocalStorageObject("SoccerQuiz", d, gameObj);
    } 

    /**
     * Add an item to a localStorage() object
     * @param {String} name  The localStorage() key
     * @param {String} key   The localStorage() value object key
     * @param {String} value The localStorage() value object value
     */
    function addToLocalStorageObject (name, key, value) {

        // Get the existing data
        var existing = localStorage.getItem(name);

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? JSON.parse(existing) : {};

        // Add new data to localStorage Array
        existing[key] = value;

        // Save back to localStorage
        localStorage.setItem(name, JSON.stringify(existing));
    };


    function startQuiz(){
        document.getElementById("timercountdownDiv").innerHTML = countDown;
        intervalVar = setInterval(myStartTimer, interval*1000);
        nextQuestion();
    }
    
    function nextQuestion(index=1){
        var lbl; 
        lbl = document.createElement("LABEL");
        lbl.id = `lblQ${index}`;
        lbl.innerText = `${index} - ${QList[index-1]}`;
        document.querySelector("#questionsDiv").innerHTML = "";
        document.querySelector("#questionsDiv").appendChild(lbl);
        document.querySelector("#questionsDiv").appendChild(document.createElement("BR"));
        document.querySelector("#questionsDiv").appendChild(document.createElement("BR"));
        
        for (i=0; i<AList[index-1].length; i++){
            var lblA = document.createElement("LABEL");
            document.querySelector("#questionsDiv").appendChild(lblA);
            var radio = document.createElement("INPUT");
            radio.name = `lblA${index}`;
            radio.setAttribute("type", "radio");
            radio.setAttribute('data-index', index);
            radio.setAttribute('value', i+1);
            radio.setAttribute('onclick', "myCalculation(this)"); //radio.onclick = myCalculation();
            radio.id=`r${index}${i+1}`;
            lblA.appendChild(radio);
            lblA.innerHTML =lblA.innerHTML + `&nbsp;&nbsp;${String.fromCharCode(65+i)}&nbsp;.&nbsp;` + AList[index-1][i];
            document.querySelector("#questionsDiv").appendChild(document.createElement("BR"));
            document.querySelector("#questionsDiv").appendChild(document.createElement("BR"));
        }
    }

    function myStartTimer() {
        (flgDeduct?myDeductTimer():console.log("count donw is : " + --countDown));
        document.getElementById("timercountdownDiv").innerHTML = countDown;
        if (countDown==0){
            myStopTimer();
            document.getElementById("timercountdownDiv").innerHTML = "Time is Over";
        }
        if (flgFinish) myStopTimer();
    }

    function myStopTimer() {
        clearInterval(intervalVar);
        document.querySelector("#timercountdownDiv").style.opacity = "0";
        document.querySelector("#timercountdownDiv").style.height="0";
        document.querySelector("#progressDiv").style.opacity = "0";
        document.querySelector("#progressDiv").style.height="0";
        document.querySelector("#nameDiv").style.opacity = "1";
        document.querySelector("#questionsDiv").innerHTML = 
        `<h1 style='text-decoration-line: underline;;'>Game is Over!</h1><br><h2 style='color:blue'>Your score is :</h2><br><h2 style='color:lightgray'>Time Left : ${countDown} out of 75 </h2><br><h2 style='color:lightgray'>Correct Answer : ${Number(document.querySelector("#success").getAttribute("aria-valuenow"))/10} out of 10</h2>`;
    }

    function myDeductTimer(){
        countDown = countDown - 5; 
        flgDeduct = ! flgDeduct;
        document.getElementById("timercountdownDiv").innerHTML = countDown+(interval);
        console.log("count donw is : " + countDown);
    }

    function myResumeTimer() { 
        flgDeduct = ! flgDeduct;
    }
    
    function myCalculation(e){
        let indx = e.getAttribute('data-index')-1;
        if (e.value!=CList[indx]) {
            let progressWarn = Number(document.querySelector("#warning").getAttribute("aria-valuenow"));
            document.querySelector("#warning").setAttribute("aria-valuenow", progressWarn+10);
            document.querySelector("#warning").setAttribute("style", `width: ${progressWarn+10}%`);
            document.querySelector("#warning").innerText=`${progressWarn+10}%`;
            myResumeTimer();
        }  else {
            let progressSucc = Number(document.querySelector("#success").getAttribute("aria-valuenow"));
            document.querySelector("#success").setAttribute("aria-valuenow", progressSucc+10);
            document.querySelector("#success").setAttribute("style", `width: ${progressSucc+10}%`);
            document.querySelector("#success").innerText=`${progressSucc+10}%`;
        }
        
        if (Number(e.getAttribute('data-index'))+1<=CList.length){
            nextQuestion(Number(e.getAttribute('data-index'))+1);
        } else {flgFinish = true; console.log("questionsDiv Finished!");}
    }
    