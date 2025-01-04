        const doc = document;
        const quiz = {
            question: doc.querySelector("question"),
            answers: doc.querySelector("answer"),
            next: doc.querySelector("next"),
            message: doc.querySelector("message"),
            box: doc.getElementById("box"),
            languagesButton: doc.getElementById("languages"),
            step: 0,
            isClicked: false,
            type: 1, //type 1 = multiple choice - type 2 text
            language: 0,
            questions: [[], []], //Index 0 sind Java Fragen
            answer: [[], []],
            rightChoices: [[], []],
            endPageText: "Glückwunsch du hast den Test abgeschlossen!",
            endPageFontSize: "2vh",
            selectLanguage(input){
                input.textContent == "Java" ? this.language = 0 : this.language = 1;
                quiz.loadQuestion();
                quiz.next.style.display = "flex";
            },
            initialize(){
                quiz.language = 0;
                quiz.step = 0;
                quiz.isClicked = false;
            },
            checkSelected(answerElement){
                if(quiz.isClicked) return;
                quiz.isClicked = true;

                if(quiz.language == 0){
                if(answerElement.textContent === quiz.rightChoices[0][quiz.step]){
                    quiz.toggleColors(answerElement, quiz.box, quiz.message, quiz.next, "success");
                    quiz.step++;
                }else {
                    quiz.toggleColors(answerElement, quiz.box, quiz.message, quiz.next, "failure");
                }
                }else{
                    if(answerElement.textContent === quiz.rightChoices[1][quiz.step]){
                        quiz.toggleColors(answerElement, quiz.box, quiz.message, quiz.next, "success");
                        quiz.step++;
                    }else {
                        quiz.toggleColors(answerElement, quiz.box, quiz.message, quiz.next, "failure");
                    }
                }
            },
            loadQuestion(){
                quiz.answers.innerHTML = "";
                if(quiz.language == 0){
                    quiz.question.innerText = quiz.questions[0][quiz.step];
                    quiz.answer[0][quiz.step]
                    .forEach((a, i) => {
                        const answerElement = quiz.createAnswerElement(a, i);
                        quiz.answers.appendChild(answerElement);
                });
                }else{
                    quiz.question.innerText = quiz.questions[1][quiz.step];
                    quiz.answer[1][quiz.step]
                    .forEach((a, i) => {
                        const answerElement = quiz.createAnswerElement(a, i);
                        quiz.answers.appendChild(answerElement);
                })}
            },
            end(){
                quiz.question.innerText = quiz.endPageText;
                quiz.question.style.fontSize = quiz.endPageFontSize;
                quiz.del(this.message);
                quiz.del(this.next);
                quiz.del(this.answers);
                quiz.del(this.languagesButton);
            },
            del(x){
                x.remove();
            },
            toggleColors(x, b, m, n, state){
                let mheight = "14vh";

                if(window.innerWidth < 980 || screen.width < 500){
                    m.style.height = mheight;
                }

                const styles = state === "success" 
                ? {sborder: "1px solid", scolor: "#16A34A", bcolor: "0.2rem solid", mcolor: "#6EE7B7", mbgcolor: "rgb(60, 131, 81)", mText: "Du hast die richtige Auswahl getroffen\n Klicke auf Weiter, um fortzufahren.", nText: "Weiter"}
                : {sborder: "1px solid", scolor: "#a31616", bcolor: "0.2rem solid", mcolor: "#e76e6e", mbgcolor: "rgb(131, 60, 60)", mText: "Du hast die falsche Auswahl getroffen\n Klicke auf Wiederholen, um es erneut zu versuchen.", nText: "Wiederholen"};
            
                x.style.border = `${styles.sborder} ${styles.mcolor}`;
                x.style.color = styles.scolor;
                b.style.border = `${styles.bcolor} ${styles.mcolor}`;
                m.style.color = styles.mcolor;
                m.style.backgroundColor = styles.mbgcolor;
                m.style.border = `${styles.sborder} ${styles.mcolor}`;
                m.innerText = styles.mText;
                n.style.backgroundColor = styles.mbgcolor;
                n.style.border = `${styles.sborder} ${styles.mcolor}`;
                n.innerText = styles.nText;
            },
            createAnswerElement(x, i) {
                const answerElement = doc.createElement("p");
                answerElement.innerText = x;
                answerElement.setAttribute("id", `Antwort${i}`);
    
                if(!quiz.isClicked){
                    answerElement.addEventListener("mouseover", () => {!quiz.isClicked ? answerElement.style.borderBottom = "1px solid #1E3A8A" : null});
                    answerElement.addEventListener("mouseleave", () => {!quiz.isClicked ? answerElement.style.borderBottom = "1px solid #e5e5e5" : null})
                    
                    answerElement.addEventListener("click", () => quiz.checkSelected(answerElement))
            }
    
                return answerElement;
            }
        }

        quiz.next.addEventListener("click", () => {
            if(!quiz.isClicked) return;

            quiz.isClicked = false;
            if(quiz.step < quiz.questions[quiz.language].length) {
                quiz.loadQuestion();
            }else{
                quiz.end();
            }
        });

        fetch('quiz.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.questions);
            data.questions.forEach((q, index) => {
                if(q.language == 0){
                    quiz.questions[0].push(q.question);
                    quiz.answer[0].push(q.answers);
                    quiz.rightChoices[0].push(q.correctAnswer)
                }else if(q.language == 1){
                    quiz.questions[1].push(q.question);
                    quiz.answer[1].push(q.answers);
                    quiz.rightChoices[1].push(q.correctAnswer)
                    }
            });
        })
        .catch(error => console.error('Fehler beim Laden der JSON:', error));

        quiz.initialize();