        let doc = document;
        let frage = doc.querySelector("frage");
        let antwortListe = doc.querySelector("antworten");
        let button = doc.querySelector("button");
        let step = 1;
        let next = doc.querySelector("next");

        let fragen = ["Wer hat Algebra erfunden?", "Wie alt ist die Türkische Sprache?", "Welcher Fluss hat am meisten Wasser auf der Welt?"];
        let antwort = [["Diophantos von Alexandria", "Al-Chwarizmi", "Archimedes", "Fermat"], ["100 Jahre", "3000 Jahre", "6000 Jahre", "600 Jahre"], ["Nil", "Rhein", "Kongo", "Amazonas"]];
        let richtig = ["Al-Chwarizmi", "6000 Jahre", "Amazonas"];

        if(step == 1){
            frage.innerText = fragen[0];
            for(let i = 0; i < antwort[0].length; i++){
                createSomeP("antwort", i);
            }
        }

        function createSomeP(x, i) {
            x = doc.createElement("p");
            x.innerText = antwort[0][i];
            x.setAttribute("id", "Antwort" + i);
            x.addEventListener("click", () => {
            if(x.textContent === richtig[0] && step == 1){
                x.style.color = "green";
                x.style.border = "1px solid green";
                step++;
                console.log(step);
            }else if(x.textContent === richtig[1] && step == 2){
                console.log("Richtig");
                step++;
            }else if(x.textContent === richtig[2] && step == 3){
                console.log("Richtig");
                step++;
            }else{
                console.log("falsch");
                }
            })
            antwortListe.appendChild(x);
            return x;
        }

        next.addEventListener("click", () => {
            if(step == 2){
                frage.innerText = fragen[1];
                for(let i = 0; i < antwort[1].length; i++){
                    let anwortsss = doc.getElementById("Antwort" + [i]);
                    anwortsss.innerText = antwort[1][i];
                    anwortsss.style.color = "black";
                    anwortsss.style.border = "none";
                }
            }else if(step == 3){
                frage.innerText = fragen[2];
                for(let i = 0; i < antwort[1].length; i++){
                    let anwortsss = doc.getElementById("Antwort" + [i]);
                    anwortsss.innerText = antwort[2][i];
                    anwortsss.style.color = "black";
                    anwortsss.style.border = "none";
                }
            }
        });