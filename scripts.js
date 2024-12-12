        let doc = document;
        let question = doc.querySelector("question");
        let answers = doc.querySelector("answer");
        let next = doc.querySelector("next");
        let step = 1;

        let questions = ["Wer hat Algebra erfunden?", "Wie alt ist die Türkische Sprache?", "Welcher Fluss hat am meisten Wasser auf der Welt?", "Wo im menschlichen Körper befindet sich der kleinste Knochen?"];
        let answer = [["Diophantos von Alexandria", "Al-Chwarizmi", "Archimedes", "Fermat"], ["100 Jahre", "3000 Jahre", "6000 Jahre", "600 Jahre"], ["Nil", "Rhein", "Kongo", "Amazonas"], ["Im Ohr", "Im Finger", "Im Zäh"]];
        let rightChoices = ["Al-Chwarizmi", "6000 Jahre", "Amazonas", "Im Ohr"];

        if(step == 1){
            question.innerText = questions[0];
            for(let i = 0; i < answer[0].length; i++){
                createSomeP("answer", i);
            }
        }

        function checkSelected(x, i){
            if(x.textContent === rightChoices[i]){
                x.style.color = "#16A34A";
                x.style.border = "1px solid #6EE7B7";
                step++;
            }else {
                x.style.color = "red";
                x.style.border = "1px solid rgb(231, 110, 110)";
            }
        }

        function createSomeP(x, i) {
            x = doc.createElement("p");
            x.innerText = answer[0][i];
            x.setAttribute("id", "Antwort" + i);
            x.addEventListener("click", () => {
            switch(step){
                case 1: checkSelected(x, 0); break;
                case 2: checkSelected(x, 1); break;
                case 3: checkSelected(x, 2); break;
                case 4: checkSelected(x, 3); break;
            }
        })
            answers.appendChild(x);
            return x;
        }

        function refreshContent(a){
                question.innerText = questions[a];
                for(let i = 0; i < answer[a].length; i++){
                    let q = doc.getElementById("Antwort" + [i]);
                    q.innerText = answer[a][i];
                    q.style.color = "black";
                    q.style.border = "none";
                }
        }

        function end(){
            question.innerText = "Glückwunsch du hast den Test abgeschlossen!";
            question.style.fontSize = "1rem";
            next.remove();
            answers.remove();
        }

        function checkAnswerSize(asmallerThan, stIndex, ahigherThan, htIndex){
            if(asmallerThan[stIndex].length < ahigherThan[htIndex].length){
                let e = doc.getElementById("Antwort" + (ahigherThan[htIndex].length - 1));
                e.remove();
            }
        }

        next.addEventListener("click", () => {
            switch(step){
                case 2: refreshContent(1); break;
                case 3: refreshContent(2); break;
                case 4: refreshContent(3); checkAnswerSize(answer, 3, answer, 2); break;
                default: end();
            }
        });