        let doc = document;
        let question = doc.querySelector("question");
        let answers = doc.querySelector("answer");
        let next = doc.querySelector("next");
        let step = 1;

        let questions = ["Wer hat Algebra erfunden?", "Wie alt ist die Türkische Sprache?", "Welcher Fluss hat am meisten Wasser auf der Welt?"];
        let answer = [["Diophantos von Alexandria", "Al-Chwarizmi", "Archimedes", "Fermat"], ["100 Jahre", "3000 Jahre", "6000 Jahre", "600 Jahre"], ["Nil", "Rhein", "Kongo", "Amazonas"]];
        let rightChoices = ["Al-Chwarizmi", "6000 Jahre", "Amazonas"];

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
                x.style.color = "green";
                x.style.border = "1px solid green";
                step++;
                console.log(step);
            }else if(x.textContent === rightChoices[1] && step == 2){
                console.log("Richtig");
                step++;
            }else if(x.textContent === rightChoices[2] && step == 3){
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
                    let anwortsss = doc.getElementById("Antwort" + [i]);
                    anwortsss.innerText = answer[1][i];
                    anwortsss.style.color = "black";
                    anwortsss.style.border = "none";
                }
            }else if(step == 3){
                question.innerText = questions[2];
                for(let i = 0; i < answer[1].length; i++){
                    let anwortsss = doc.getElementById("Antwort" + [i]);
                    anwortsss.innerText = answer[2][i];
                    anwortsss.style.color = "black";
                    anwortsss.style.border = "none";
                }
            }
        });