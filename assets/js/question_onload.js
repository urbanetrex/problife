import { render_question } from './question-sourcing.js';
import { render_tags } from './question-sourcing.js';

function padID(id, length = 5) {
    return id.toString().padStart(length, '0');
}

function check_access_and_render(problem) {
    const passwordWrapper = document.getElementById("password-accept");
    const contentWrapper = document.getElementById("content-wrapper");
    const passwordInput = document.getElementById("password-input");
    const passwordSubmit = document.getElementById("password-submit");

    if (problem.type === "normal-access") {
        contentWrapper.style.display = "flex";
        render_question(problem);
        render_tags(problem["form-tags"]);
        return;
    }

    if (problem.type === "password-access") {
        passwordWrapper.style.display = "block";

        passwordSubmit.addEventListener("click", () => {
            const userPassword = passwordInput.value.trim();

            if (userPassword === problem.password) {
                passwordWrapper.style.display = "none";
                contentWrapper.style.display = "flex";
                render_question(problem);
                render_tags(problem["form-tags"]);
            } else {
                passwordInput.classList.add("shake");

                // Optional: reset border/placeholder for visual cue
                passwordInput.style.border = "2px ridge red";
                passwordInput.value = "";
                input.classList.add("wrong");
                input.placeholder = "Wrong password, try again";
                passwordInput.placeholder = "Try again...";

                // Remove the class after animation so it can shake again
                setTimeout(() => passwordInput.classList.remove("shake"), 300);
            }
        });
    } else {
        document.getElementById("question-container").textContent = "Unsupported problem type.";
        console.warn(`Unsupported type: ${problem.type}`);
    }
}

async function load_and_display_question() {
    const params = new URLSearchParams(window.location.search);
    const rawId = params.get('qid')?.trim();

    if (!rawId) {
        window.location.href = './index.html';
        return;
    }

    const numId = parseInt(rawId, 10);

    if (isNaN(numId)) {
        document.getElementById('question-container').textContent = "Invalid question ID.";
        return;
    }

    const paddedId = padID(numId);
    document.title = `Question ${paddedId} -- Problife`;
    document.getElementById("header-title").textContent = `Question ${paddedId}`;

    try {
        const module = await import(`./questions/q${paddedId}.js`);
        check_access_and_render(module.problem);
    } catch (err) {
        console.error(err);
        document.getElementById("question-container").textContent = "Question not found.";
    }
}

window.addEventListener("DOMContentLoaded", load_and_display_question);

