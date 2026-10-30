console.log("Yippee");

let taskInput = document.getElementById("taskInput")
let addButton = document.getElementById("addButton")
let taskList = document.getElementById("taskList")

let tasks =[];

//Start of the AI Code
const scrambleChars = "0123456789!██▒░ABCDEF";

function scrambleText(el, finalText, { startDelay = 400, revealDelay = 90, interval = 40, onDone } = {}) {

    el.textContent = finalText;
    el.style.width = el.offsetWidth + "px";

    const start = performance.now();
    const endTime = startDelay + finalText.length * revealDelay;

    const timer = setInterval(() => {
        const elapsed = performance.now() - start;
        let output = "";

        for (let i = 0; i < finalText.length; i++) {
            const ch = finalText[i];
            if (ch === " ") {
                output += " ";
            } else if (elapsed >= startDelay + i * revealDelay) {
                output += ch;
            } else {
                output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }
        }

        el.textContent = output;

        if (elapsed >= endTime) {
        el.textContent = finalText;
        clearInterval(timer);
        if (onDone) onDone();
}
    }, interval);
}

const inputArea = document.querySelector(".input-area");

title.style.visibility = "hidden";

setTimeout(() => {
    title.style.visibility = "visible";
    scrambleText(title, title.dataset.text, {
        startDelay: 890,
        revealDelay: 250,
        interval: 45,
        onDone: () => inputArea.classList.add("show")
    });
}, 4000);
//End of the AI Code

function renderlist () {
    taskList.innerHTML = "";
    
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task;

        let button = document.createElement("button");
        button.innerText = "Delete";
        button.classList.add("reset-button");
        button.addEventListener("click", () => {
            deleteTask(index);
        });

        li.appendChild(button);

        taskList.appendChild(li);
    });
}

function addList () {
    let task = taskInput.value.trim();
    
    if (task === "") {
        alert("Please insert your agenda. Do not leave it unfilled.")
    } else {
        tasks.push(task);
    
        renderlist();
    
        taskInput.value = "";
    }
}

function deleteTask (index) {
    tasks.splice(index,1);
    renderlist();
}

renderlist();
addButton.addEventListener("click", addList);
taskInput.addEventListener("keypress", (tombol) => {
    if (tombol.key === "Enter") {
        addList();
    }
} );
