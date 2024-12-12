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

        function createSomeP(x, i) {
            x = doc.createElement("p");
            x.innerText = answer[0][i];
            x.setAttribute("id", "Antwort" + i);
            x.addEventListener("click", () => {
            if(x.textContent === rightChoices[0] && step == 1){
                x.style.color = "#16A34A";
                x.style.border = "1px solid #6EE7B7";
                step++;
                console.log(step);
            }else if(x.textContent === rightChoices[1] && step == 2){
                console.log("Richtig");
                step++;
            }else if(x.textContent === rightChoices[2] && step == 3){
                console.log("Richtig");
                step++;
            }else if(x.textContent === rightChoices[3] && step == 4){
                console.log("Richtig");
                step++;
            }else{
                console.log("falsch");
                }
            })
            answers.appendChild(x);
            return x;
        }

        next.addEventListener("click", () => {
            if(step == 2){
                question.innerText = questions[1];
                for(let i = 0; i < answer[1].length; i++){
                    let q = doc.getElementById("Antwort" + [i]);
                    q.innerText = answer[1][i];
                    q.style.color = "black";
                    q.style.border = "none";
                }
            }else if(step == 3){
                question.innerText = questions[2];
                for(let i = 0; i < answer[2].length; i++){
                    let q = doc.getElementById("Antwort" + [i]);
                    q.innerText = answer[2][i];
                    q.style.color = "black";
                    q.style.border = "none";
                }
            }else if(step == 4){
            question.innerText = questions[3];
            if(answer[3].length < answer[2].length){
                let element = doc.getElementById("Antwort3");
                element.remove();
            }
            for(let i = 0; i < answer[3].length; i++){
                let q = doc.getElementById("Antwort" + [i]);
                q.innerText = answer[3][i];
                q.style.color = "black";
                q.style.border = "none";
            }
        }
        });