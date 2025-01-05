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
            type: [[], [], []],
            language: 0,
            questions: [[], [], []], //Index 0 sind Java Fragen
            answer: [[], [], []],
            rightChoices: [[], [], []],
            endPageText: "Congratulations, you have completed the test!",
            endPageFontSize: "2vh",
            selectLanguage(input){
                input.textContent == "Java" ? this.language = 0 : (input.textContent == "C++") ? this.language = 1 : this.language = 2;
                quiz.loadQuestion();
                quiz.next.style.display = "flex";
            },
            checkSelected(answerElement){
                if(quiz.isClicked) return;
                quiz.isClicked = true;

                if(answerElement.textContent === quiz.rightChoices[quiz.language][quiz.step]){
                    quiz.toggleColors(answerElement, quiz.box, quiz.message, quiz.next, "success");
                    quiz.step++;
                }else {
                    quiz.toggleColors(answerElement, quiz.box, quiz.message, quiz.next, "failure");
                }
            },
            loadQuestion(){
                quiz.answers.innerHTML = "";
                quiz.question.innerText = quiz.questions[quiz.language][quiz.step];
                if(quiz.type[quiz.language][quiz.step] == 0){
                    quiz.answers.style.display = "grid";
                    quiz.answer[quiz.language][quiz.step]
                    .forEach((a, i) => {
                        const answerElement = quiz.createAnswerElement(a, i);
                        quiz.answers.appendChild(answerElement);
                    });
                }else{
                    quiz.answers.style.display = "flex";
                    const inputElement = doc.createElement("input");
                    const textNext = doc.createElement("p");
                    textNext.innerText = quiz.answer[quiz.language][quiz.step][0];
                    inputElement.setAttribute("id", "inputfield")
                    inputElement.maxLength = quiz.rightChoices[quiz.language][quiz.step].length;
                    inputElement.style.width = `${quiz.rightChoices[quiz.language][quiz.step].length - 1.8}vh`
                    inputElement.style.fontSize = "100%";
                    inputElement.addEventListener("change", (x) => {
                        console.log(quiz.step);
                        if(x.target.value == quiz.rightChoices[quiz.language][quiz.step]){
                            quiz.toggleColors(inputElement, quiz.box, quiz.message, quiz.next, "success");
                            quiz.isClicked = true;
                            inputElement.style.pointerEvents = "none";
                            quiz.step++;
                            console.log(quiz.step);
                        }else {
                            quiz.toggleColors(inputElement, quiz.box, quiz.message, quiz.next, "failure");
                        }
                    })
                    quiz.answers.appendChild(inputElement);
                    quiz.answers.appendChild(textNext);
                }
            },
            end(){
                quiz.question.innerText = quiz.endPageText;
                quiz.question.style.fontSize = quiz.endPageFontSize;
                this.message.remove();
                this.next.remove();
                this.answers.remove();
                this.languagesButton.remove();
            },
            pushToArray(x, q){
                quiz.questions[x].push(q.question); 
                quiz.answer[x].push(q.answers); 
                quiz.rightChoices[x].push(q.correctAnswer);
                quiz.type[x].push(q.type);
            },
            toggleColors(x, b, m, n, state){
                let mheight = "14vh";

                if(window.innerWidth < 980 || screen.width < 500){
                    m.style.height = mheight;
                }

                const styles = state === "success" 
                ? {sborder: "1px solid", scolor: "#16A34A", bcolor: "0.2rem solid", mcolor: "#6EE7B7", mbgcolor: "rgb(60, 131, 81)", mText: "You have made the correct selection\n Click Next to continue.", nText: "Next"}
                : {sborder: "1px solid", scolor: "#a31616", bcolor: "0.2rem solid", mcolor: "#e76e6e", mbgcolor: "rgb(131, 60, 60)", mText: "You have made the wrong selection\n Click on Retry to try again.", nText: "Retry"};
            
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
            createAnswerElement(x) {
                    const answerElement = doc.createElement("p");
                    answerElement.innerText = x;
                    answerElement.setAttribute("id", `antwort`);
                    (x.length) < 20 ? answerElement.style.width = `${x.length}rem` : answerElement.style.width = `20rem`;
    
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
            data.questions.forEach((q) => {
                switch(q.language){
                    case 0: quiz.pushToArray(q.language, q); break;
                    case 1: quiz.pushToArray(q.language, q); break;
                    case 2: quiz.pushToArray(q.language, q); break;
                };
            });
        })
        .catch(error => console.error('Error loading the JSON:', error));