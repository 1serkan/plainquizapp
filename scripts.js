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

        function manager(x, i){
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
            if(step == 1){
                manager(x, 0);
            }else if(step == 2){
                manager(x, 1);
            }else if(step == 3){
                manager(x, 2);
            }else if(step == 4){
                manager(x, 3);
            }})
            answers.appendChild(x);
            return x;
        }

        function refreshPage(a){
                question.innerText = questions[a];
                for(let i = 0; i < answer[a].length; i++){
                    let q = doc.getElementById("Antwort" + [i]);
                    q.innerText = answer[a][i];
                    q.style.color = "black";
                    q.style.border = "none";
                }
        }

        next.addEventListener("click", () => {
            if(step == 2){
                refreshPage(1);
            }else if(step == 3){
                refreshPage(2);
            }else if(step == 4){
                refreshPage(3);
                if(answer[3].length < answer[2].length){
                    let e = doc.getElementById("Antwort3");
                    e.remove();
                }
            }
        });