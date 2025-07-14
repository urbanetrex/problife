export function render_question(problem) {
    const verdict = document.getElementById("verdict");

    function showVerdict(success, message) {
        verdict.textContent = message;
        verdict.style.color = success ? "lightgreen" : "tomato";

        verdict.classList.remove("hide");
        verdict.classList.add("show");

        setTimeout(() => {
            verdict.classList.remove("show");
            verdict.classList.add("hide");
        }, 2000);
    }

    const q = problem["form-content"][0];
    let html = `<div class="question-block">`;

    q.question.forEach(line => {
        html += `<p>${line}</p>`;
    });

    // NOW insert author before inputs
    if (problem.author) {
        html += `<p id="author-tag"> - ${problem.author} </p>`
    }

    html += `<input type="${q.submit.type}" id="user-answer" placeholder="Your answer...">`;
    html += `<button id="submit-btn">Submit</button>`;
    html += `</div>`;

    const container = document.getElementById('question-container');
    if (!container) return;

    container.innerHTML = html;

    document.getElementById('submit-btn').onclick = () => {
        const val = document.getElementById('user-answer').value.trim();
        const correct = q.submit.answer;

        if (parseFloat(val) === correct) {
            // Correct answer
            showVerdict(true, "✅ Correct! Well done.");
        } else {
            // Incorrect answer
            showVerdict(false, "❌ Nope. Try again.");
        }
    };
}

export function render_tags(tags) {
    const tagList = document.getElementById('tag-list');
    tagList.innerHTML = ''; // Clear old tags if any

    if (!tags || tags.length === 0) {
        tagList.innerHTML = '<li>No tags available.</li>';
        return;
    }

    tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        tagList.appendChild(li);
    });
}