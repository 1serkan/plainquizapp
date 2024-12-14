        const doc = document;
        const question = doc.querySelector("question");
        const answers = doc.querySelector("answer");
        const next = doc.querySelector("next");
        const message = doc.querySelector("message");
        const box = doc.getElementById("box");
        let step = 1;
        let isClicked = false;

        const quiz = {

        }

        let questions = ["Wer hat Algebra erfunden?", "Wie alt ist die Türkische Sprache?", "Welcher Fluss hat am meisten Wasser auf der Welt?", "Wo im menschlichen Körper befindet sich der kleinste Knochen?"];
        let answer = [["Diophantos von Alexandria", "Al-Chwarizmi", "Archimedes", "Fermat"], ["100 Jahre", "3000 Jahre", "6000 Jahre", "600 Jahre"], ["Nil", "Rhein", "Kongo", "Amazonas"], ["Im Ohr", "Im Finger", "Im Zäh"]];
        let rightChoices = ["Al-Chwarizmi", "6000 Jahre", "Amazonas", "Im Ohr"];

        if(step == 1){
            question.innerText = questions[0];
            for(let i = 0; i < answer[0].length; i++){
                createSomeP("answer", i);
            }
        }

        function toggleColors(x, b, m, n, state){
            let mheight = "14vh";

            if(window.innerWidth < 980 || screen.width < 500){
                m.style.height = mheight;
            }

            const styles = state === "success" 
            ? {sborder: "1px solid #6EE7B7", scolor: "#16A34A", bcolor: "0.2rem solid #6EE7B7", mcolor: "#6EE7B7", mbgcolor: "rgb(60, 131, 81)", mText: "Du hast die richtige Auswahl getroffen\n Klicke auf Weiter, um fortzufahren.", nText: "Weiter"}
            : {sborder: "1px solid rgb(231, 110, 110)", scolor: "#a31616", bcolor: "0.2rem solid rgb(231, 110, 110)", mcolor: "#e76e6e", mbgcolor: "rgb(131, 60, 60)", mText: "Du hast die falsche Auswahl getroffen\n Klicke auf Wiederholen, um es erneut zu versuchen.", nText: "Wiederholen"};
            
            x.style.border = styles.sborder;
            x.style.color = styles.scolor;
            b.style.border = styles.bcolor;
            m.style.color = styles.mcolor;
            m.style.backgroundColor = styles.mbgcolor;
            m.style.border = styles.sborder;
            m.innerText = styles.mText;
            n.style.backgroundColor = styles.mbgcolor;
            n.style.border = styles.sborder;
            n.innerText = styles.nText;
        }

        function checkSelected(x, i){
            if(isClicked === false){
            if(x.textContent === rightChoices[i]){
                isClicked = true;
                toggleColors(x, box, message, next, "success");
                step++;
            }else {
                isClicked = true;
                toggleColors(x, box, message, next, "failure");
                }
            }
        }

        function createSomeP(x, i) {
            x = doc.createElement("p");
            x.innerText = answer[0][i];
            x.setAttribute("id", "Antwort" + i);
            if(isClicked === false){
                x.addEventListener("mouseover", () => {!isClicked ? x.style.borderBottom = "1px solid #1E3A8A" : null});
                x.addEventListener("mouseleave", () => {!isClicked ? x.style.borderBottom = "1px solid #e5e5e5" : null})
                x.addEventListener("click", () => {
            switch(step){
                case 1: checkSelected(x, 0); break;
                case 2: checkSelected(x, 1); break;
                case 3: checkSelected(x, 2); break;
                case 4: checkSelected(x, 3); break;
                }       
            })
        }
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
            message.remove();
            next.remove();
            answers.remove();
        }

        function checkAnswerSize(array, stIndex, htIndex){
            try{
                if(array[stIndex].length < array[htIndex].length){
                    let e = doc.getElementById("Antwort" + (array[htIndex].length - 1));
                    e.remove();
                }
            }catch(err){
                console.log(err);
            }
        }

        next.addEventListener("click", () => {
            switch(step){
                case 1: refreshContent(0); isClicked = false; break;
                case 2: refreshContent(1); isClicked = false; break;
                case 3: refreshContent(2); isClicked = false; break;
                case 4: refreshContent(3); checkAnswerSize(answer, 3, 2); isClicked = false; break;
                default: end();
            }
        });