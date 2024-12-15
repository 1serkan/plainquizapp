        const doc = document;
        const question = doc.querySelector("question");
        const answers = doc.querySelector("answer");
        const next = doc.querySelector("next");
        const message = doc.querySelector("message");
        const box = doc.getElementById("box");
        const quiz = {
            step: 0,
            isClicked: false,
            questions: ["Wer hat Algebra erfunden?", "Wie alt ist die Türkische Sprache?", "Welcher Fluss hat am meisten Wasser auf der Welt?", "Wo im menschlichen Körper befindet sich der kleinste Knochen?"],
            answer: [["Diophantos von Alexandria", "Al-Chwarizmi", "Archimedes", "Fermat"], ["100 Jahre", "3000 Jahre", "6000 Jahre", "600 Jahre"], ["Nil", "Rhein", "Kongo", "Amazonas"], ["Im Ohr", "Im Finger", "Im Zäh"]],
            rightChoices: ["Al-Chwarizmi", "6000 Jahre", "Amazonas", "Im Ohr"],
            endPageText: "Glückwunsch du hast den Test abgeschlossen!",
            endPageFontSize: "2vh",

            checkSelected (x, r) {
                if(isClicked === false){ 
                    if(x.textContent === this.rightChoices[r]){
                        isClicked = true;
                        toggleColors(x, box, message, next, "success");
                        step++;
                    }else{
                        isClicked = true;
                        toggleColors(x, box, message, next, "failure");
                    }
                }
            }
        }

        function initialize(){
            quiz.step = 0;
            quiz.isClicked = false;
            loadQuestion();
        }

        function loadQuestion(){
            question.innerText = quiz.questions[quiz.step];
            answers.innerHTML = "";

            quiz.answer[quiz.step]
            .forEach((a, i) => {
                const answerElement = createSomeP(a, i);
                answers.appendChild(answerElement);
            });
        };

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

        function checkSelected(x){
            if(quiz.isClicked) return;
            quiz.isClicked = true;

            const correctAnswer = quiz.rightChoices[quiz.step];
            if(x.textContent === correctAnswer){
                toggleColors(x, box, message, next, "success");
                quiz.step++;
            }else {
                toggleColors(x, box, message, next, "failure");
                }
        }

        function createSomeP(x, i) {
            const answerElement = doc.createElement("p");
            answerElement.innerText = x;
            answerElement.setAttribute("id", `Antwort${i}`);

            if(!quiz.isClicked){
                answerElement.addEventListener("mouseover", () => {!isClicked ? x.style.borderBottom = "1px solid #1E3A8A" : null});
                answerElement.addEventListener("mouseleave", () => {!isClicked ? x.style.borderBottom = "1px solid #e5e5e5" : null})
                
                answerElement.addEventListener("click", () => checkSelected(answerElement))
        }

            return answerElement;
        }

        function end(){
            question.innerText = quiz.endPageText;
            question.style.fontSize = quiz.endPageFontSize;
            message.remove();
            next.remove();
            answers.remove();
        }

        next.addEventListener("click", () => {
            if(!quiz.isClicked) return;

            quiz.isClicked = false;
            if(quiz.step < quiz.questions.length) {
                loadQuestion();
            }else{
                end();
            }
        });

        initialize();