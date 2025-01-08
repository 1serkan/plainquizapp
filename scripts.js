        // Access to the DOM document
        const doc = document;
        
        // Main quiz object
        const quiz = {
            // References to DOM elements
            question: doc.querySelector("question"), // Element for displaying the question
            answerList: doc.querySelector("answerList"), // Container for the answer options
            nextButton: doc.querySelector("next"), // Button to proceed to the next question
            message: doc.querySelector(".message"), // Feedback message element
            box: doc.querySelector(".box"), // Container for the quiz interface
            languagesButton: doc.querySelector(".languages"), // Button for selecting the language
            
            // Quiz state and data structures
            step: 0, // Current question index
            isClicked: false, // Flag to prevent multiple clicks
            type: [[], [], []], // Question types (e.g., multiple choice or input)
            language: 0, // Current language (0 = Java, 1 = C++, 2 = Python)
            languageToText: "",
            success: "success",
            failure: "failure",
            questions: [[], [], []], // Array of questions by language
            answer: [[], [], []], // Array of answers by language
            rightChoices: [[], [], []], // Array of correct answers by language

            // Text constants for feedback and buttons
            nextButtonText: "Next",
            retryButtonText: "Retry",
            regularText: "Choose from the following options",
            successText: "You have made the correct selection\n Click Next to continue.",
            failureText: "You have made the wrong selection\n Click on Retry to try again.",
            docTitleText: "Quiz: Congratulations!",
            endPageText: "Congratulations, you have completed the test!",
            endPageFontSize: "2vh",

            // Language selection and question initialization
            selectLanguage(input){
                quiz.checkIfExist(); // Ensure required DOM elements exist
                // Set the language based on button text
                switch(input.textContent){
                    case "Java": this.language = 0, this.languageToText = "Java"; break;
                    case "C++": this.language = 1, this.languageToText = "C++"; break;
                    default: this.language = 2, this.languageToText = "Python"; break;
                }

                quiz.step = 0; // Reset step if user selects language
                quiz.isClicked = false; // Reset clicked if user selects language
                quiz.loadQuestion(); // Load the first question
                quiz.nextButton.style.display = "flex"; // Show the "Next" button
            },

            // Validate the selected answer
            checkSelected(answerElement){
                if(quiz.isClicked) return; // Prevent multiple clicks
                quiz.isClicked = true;

                // Check if the selected answer is correct
                if(answerElement.textContent === quiz.rightChoices[quiz.language][quiz.step]){
                    quiz.toggleColors(answerElement, quiz.box, quiz.message, quiz.nextButton, quiz.success);
                    quiz.step++; // Move to the next question
                }else {
                    quiz.toggleColors(answerElement, quiz.box, quiz.message, quiz.nextButton, quiz.failure);
                }
            },

            //CLO = ClassListOperations
            clo(element, content, operationType){ 
                if(operationType == "add"){
                    element.classList.add(content);
                }else{
                    element.classList.remove(content);
                }
            },

            // Ensure that required DOM elements are present
            checkIfExist(){
                if (!quiz.question || !quiz.answerList || !quiz.nextButton || !quiz.message) {
                    throw new Error("DOM element were not found.");
                }
            },

            // To reset the colors
            resetColors(){
                quiz.clo(quiz.box, "successBox", "r");
                quiz.clo(quiz.box, "failureBox", "r");
                quiz.clo(quiz.message, "successBg", "r");
                quiz.clo(quiz.message, "failureBg", "r");
                quiz.clo(quiz.nextButton, "failureBg", "r");
                quiz.clo(quiz.nextButton, "failureBox", "r");
                quiz.clo(quiz.nextButton, "successBg", "r");

                this.message.innerText = this.regularText;
                this.nextButton.innerText = this.nextButtonText;
            },

            // Load the current question and its answers
            loadQuestion(){
                quiz.answerList.innerHTML = ""; // Clear the answers container
                quiz.question.innerText = quiz.questions[quiz.language][quiz.step]; // Set the question text
                doc.title =  `${quiz.languageToText} Quiz ${quiz.step}/${quiz.questions[quiz.language].length - 1}`; // Update the document title
                quiz.resetColors(); // Reset Colors at each step

                if(quiz.type[quiz.language][quiz.step] == 0){
                    // Multiple-choice question
                    quiz.answerList.style.display = "grid";
                    quiz.answer[quiz.language][quiz.step].forEach((a, i) => {
                        const answerElement = quiz.createAnswerElement(a, i);
                        quiz.answerList.appendChild(answerElement);
                    });
                }else{
                    // Input-based question
                    quiz.answerList.style.display = "flex";
                    const inputElement = doc.createElement("input");
                    const textNext = doc.createElement("p");
                    textNext.innerText = quiz.answer[quiz.language][quiz.step][0];
                    quiz.clo(inputElement, "inputfield", "add");
                    inputElement.maxLength = quiz.rightChoices[quiz.language][quiz.step].length;
                    inputElement.style.width = `${quiz.rightChoices[quiz.language][quiz.step].length}vh`
                    inputElement.style.fontSize = "100%";

                    // Add event listener for input validation
                    inputElement.addEventListener("change", (x) => {
                        if(x.target.value == quiz.rightChoices[quiz.language][quiz.step]){
                            quiz.resetColors();
                            quiz.toggleColors(inputElement, quiz.box, quiz.message, quiz.nextButton, quiz.success);
                            quiz.isClicked = true;
                            inputElement.style.pointerEvents = "none";
                            quiz.step++;
                        }else {
                            quiz.toggleColors(inputElement, quiz.box, quiz.message, quiz.nextButton, quiz.failure);
                        }
                    })
                    quiz.answerList.appendChild(inputElement);
                    quiz.answerList.appendChild(textNext);
                }
            },

            // tH = triggerHover, to trigger Hover Effect 
            tH(element, trigger, operationType){
                element.addEventListener(trigger, () => {!quiz.isClicked ? quiz.clo(element, "answerBorderLeft", operationType) : null});
            },

            // End the quiz
            end(){
                quiz.question.innerText = quiz.endPageText;
                quiz.question.style.fontSize = quiz.endPageFontSize;
                doc.title = quiz.docTitleText;
                this.message.remove();
                this.nextButton.remove();
                this.answerList.remove();
                this.languagesButton.remove();
            },

            // Push new question data into arrays
            pushToArray(i, q){
                quiz.questions[i].push(q.question); 
                quiz.answer[i].push(q.answers); 
                quiz.rightChoices[i].push(q.correctAnswer);
                quiz.type[i].push(q.type);
            },

            // Manage element styles dynamically
            styleManager(element, box, message, nextButton, state){
                const successElement = (element.nodeName == "P") ? "successChoiceElement" : "successInputElement";
                const failureElement = (element.nodeName == "P") ? "failureChoiceElement" : "failureInputElement";

                const elements = [
                    { element: element, success: successElement, failure: failureElement },
                    { element: box, success: "successBox", failure: "failureBox" },
                    { element: message, success: "successBg", failure: "failureBg" },
                    { element: nextButton, success: "successBg", failure: "failureBg" },
                ];

                if (state == "remove") {
                    elements.forEach(({ element, success, failure }) => {
                        quiz.clo(element, (success, failure), "remove");
                    });
                }
                else if (state === quiz.success || state === quiz.failure) {
                    elements.forEach(({ element, success, failure }) => {
                        quiz.clo(element, state === quiz.success ? success : failure, "add");
                    });
                }
            },

            // Toggle element colors based on success or failure
            toggleColors(Element, Box, Message, nextButton, state){
                quiz.styleManager(Element, Box, Message, nextButton, "remove");
                quiz.styleManager(Element, Box, Message, nextButton, state);

                Message.innerText = state === quiz.success ? quiz.successText : quiz.failureText;
                nextButton.innerText = state === quiz.success ? quiz.nextButtonText : quiz.retryButtonText;
            },

            // Create an answer element dynamically
            createAnswerElement(x) {
                const answerElement = doc.createElement("p");
                answerElement.innerText = x;
                quiz.clo(answerElement, "answer", "add");
    
                if(!quiz.isClicked){

                    quiz.tH(answerElement, "mouseover", "add");
                    quiz.tH(answerElement, "mouseleave", "remove");

                    answerElement.addEventListener("click", () => quiz.checkSelected(answerElement))
                }

                return answerElement;
            }
        }

        // Add event listener to the "Next" button
        quiz.nextButton.addEventListener("click", () => {
            if(!quiz.isClicked) quiz.resetColors();

            quiz.isClicked = false;
            if(quiz.step < quiz.questions[quiz.language].length) {
                quiz.loadQuestion();
            }else{
                quiz.end();
            }
        });

        // Fetch quiz data from a JSON file
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