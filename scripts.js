        const doc = document;
        const quiz = {
            question: doc.querySelector("question"),
            answers: doc.querySelector("answer"),
            next: doc.querySelector("next"),
            message: doc.getElementsByClassName("message")[0],
            box: doc.getElementsByClassName("box")[0],
            languagesButton: doc.getElementsByClassName("languages")[0],
            step: 0,
            isClicked: false,
            type: [[], [], []],
            language: 0,
            questions: [[], [], []],
            answer: [[], [], []],
            rightChoices: [[], [], []],
            nextButtonText: "Next",
            retryButtonText: "Retry",
            successText: "You have made the correct selection\n Click Next to continue.",
            failureText: "You have made the wrong selection\n Click on Retry to try again.",
            endPageText: "Congratulations, you have completed the test!",
            endPageFontSize: "2vh",
            selectLanguage(input){
                quiz.checkIfExist();
                switch(input.textContent){
                    case "Java": this.language = 0; break;
                    case "C++": this.language = 1; break;
                    default: this.language = 2; break;
                }
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
            checkIfExist(){
                if (!quiz.question || !quiz.answers || !quiz.next || !quiz.message) {
                    throw new Error("DOM element were not found.");
                }
            },
            loadQuestion(){
                quiz.answers.innerHTML = "";
                quiz.question.innerText = quiz.questions[quiz.language][quiz.step];
                doc.title =  `Question ${quiz.step}/${quiz.questions[quiz.language].length - 1}`;
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
                    inputElement.style.width = `${quiz.rightChoices[quiz.language][quiz.step].length}vh`
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
                doc.title = "Quiz: Congratulations!";
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
            styleManager(element, box, message, nextButton, state){
                const elements = [
                    { element: element, success: "successElement", failure: "failureElement" },
                    { element: box, success: "successBox", failure: "failureBox" },
                    { element: message, success: "successBg", failure: "failureBg" },
                    { element: nextButton, success: "successBg", failure: "failureBg" },
                ];
                
                if (state == "remove") {
                    elements.forEach(({ element, success, failure }) => {
                        element.classList.remove(success, failure);
                    });
                }else if (state === "success" || state === "failure") {
                    elements.forEach(({ element, success, failure }) => {
                        element.classList.add(state === "success" ? success : failure);
                    });
                }
            },
            toggleColors(Element, Box, Message, nextButton, state){
                quiz.styleManager(Element, Box, Message, nextButton, "remove");
                quiz.styleManager(Element, Box, Message, nextButton, state);
                

                Message.innerText = state === "success" ? quiz.successText : quiz.failureText;
                nextButton.innerText = state === "success" ? quiz.nextButtonText : quiz.retryButtonText;
            },
            createAnswerElement(x) {
                    const answerElement = doc.createElement("p");
                    answerElement.innerText = x;
                    answerElement.classList.add("antwort");
    
                    if(!quiz.isClicked){
                        answerElement.addEventListener("mouseover", () => {!quiz.isClicked ? answerElement.classList.add("antwortBorderLeft") : null});
                        answerElement.addEventListener("mouseleave", () => {!quiz.isClicked ? answerElement.classList.remove("antwortBorderLeft") : null})

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
                quiz.pushToArray(q.language, q);
            });
        })
        .catch(error => console.error('Error loading the JSON:', error));