const projectBlueprints = {
  ai: [
    {
      name: "Prompt Pocket",
      summary: "A clean place to save, tag, and copy useful AI prompts.",
      features: ["Add and edit prompts", "Filter by use case", "Copy with one click"],
      github: "Easy to explain with screenshots, and AI users immediately understand the value."
    },
    {
      name: "Idea Coach",
      summary: "A helper that turns vague ideas into small project plans.",
      features: ["Collect goals and constraints", "Suggest three project paths", "Generate a first-day checklist"],
      github: "It speaks directly to beginners, which makes the README feel personal and useful."
    },
    {
      name: "AI Study Cards",
      summary: "A flashcard builder for turning notes into review questions.",
      features: ["Create cards", "Mark confidence", "Review weak cards first"],
      github: "It combines AI, learning, and a clear daily-use workflow."
    }
  ],
  learning: [
    {
      name: "Learning Ladder",
      summary: "A tiny roadmap builder that turns a topic into weekly steps.",
      features: ["Choose a topic", "Create milestone cards", "Track progress"],
      github: "People like projects that show a journey, not just a tool."
    },
    {
      name: "Focus Sprint Board",
      summary: "A study board for planning focused 30-minute learning sessions.",
      features: ["Plan sessions", "Start a timer", "Record what was learned"],
      github: "It is simple, practical, and easy to demo in one screenshot."
    },
    {
      name: "Concept Garden",
      summary: "A visual notebook for connecting ideas while learning.",
      features: ["Add concepts", "Link related ideas", "Search notes"],
      github: "It has room to grow into a visually memorable project."
    }
  ],
  life: [
    {
      name: "Tiny Life Planner",
      summary: "A gentle planner for daily tasks, habits, and small wins.",
      features: ["Plan today", "Track small wins", "Review the week"],
      github: "It feels relatable because everyone understands daily overwhelm."
    },
    {
      name: "Decision Compass",
      summary: "A tool for comparing choices when you are stuck.",
      features: ["List options", "Score what matters", "Show a clear recommendation"],
      github: "The idea is emotionally clear: it helps people move when they feel stuck."
    },
    {
      name: "File Calm",
      summary: "A visual helper for planning how to organize messy folders.",
      features: ["Pick file categories", "Preview folder structure", "Create an organization plan"],
      github: "It solves a common pain without needing a complex backend."
    }
  ],
  github: [
    {
      name: "README Spark",
      summary: "A generator that helps projects tell their story clearly.",
      features: ["Collect project basics", "Generate README sections", "Suggest badges and screenshots"],
      github: "GitHub users care about README quality, so the audience is already there."
    },
    {
      name: "Repo First Aid",
      summary: "A checklist app for improving a new GitHub repository.",
      features: ["Check README quality", "Suggest missing files", "Create next actions"],
      github: "It is made for GitHub builders, which makes it naturally shareable."
    },
    {
      name: "Launch Checklist",
      summary: "A release checklist for turning a local project into a public repo.",
      features: ["Track launch tasks", "Generate repo description", "Plan the next version"],
      github: "It helps people cross the gap from private practice to public work."
    }
  ],
  game: [
    {
      name: "Bug Squash Board",
      summary: "A small browser game about fixing project bugs before time runs out.",
      features: ["Click bugs", "Gain focus points", "Unlock small upgrades"],
      github: "Games are easy to show visually and can make a simple repo feel alive."
    },
    {
      name: "Code Quest Cards",
      summary: "A card game where each card is a beginner coding challenge.",
      features: ["Draw a challenge", "Pick a difficulty", "Track completed cards"],
      github: "It turns learning into something playful and screenshot-friendly."
    },
    {
      name: "Pixel Habit Garden",
      summary: "A tiny garden that grows when you complete daily tasks.",
      features: ["Add habits", "Water plants", "Unlock garden tiles"],
      github: "It has charm, progress, and obvious visual improvement over time."
    }
  ]
};

const profiles = {
  beginner: {
    label: "Beginner friendly",
    note: "You need a project with a small first version and fast visual feedback."
  },
  learning: {
    label: "Skill building",
    note: "You can handle a little structure, as long as the first goal stays clear."
  },
  builder: {
    label: "Builder mode",
    note: "You can take on a richer feature set and polish the experience."
  }
};

const goals = {
  portfolio: "The best fit is something easy to explain and attractive in screenshots.",
  learning: "The best fit should teach you one or two useful skills without becoming huge.",
  recognition: "The best fit needs a clear audience, a strong README, and a memorable hook.",
  productivity: "The best fit should solve a small repeated problem in daily life.",
  fun: "The best fit should feel playful quickly, even before it has many features."
};

const moods = {
  lost: "Because you feel a bit lost, the first version should be narrow and reassuring.",
  quick: "Because you want quick results, the first version should be finishable in one or two sessions.",
  careful: "Because you are worried about difficulty, the plan should avoid hidden technical traps.",
  wow: "Because you want something impressive, the idea needs a visual or emotional hook."
};

const timeLabels = {
  short: "2-4 days",
  medium: "1 week",
  long: "1-2 weeks"
};

const cardTypes = [
  {
    type: "Safe Pick",
    difficulty: "2/5",
    angle: "The easiest path to a finished first version."
  },
  {
    type: "Showcase Pick",
    difficulty: "3/5",
    angle: "The strongest choice for GitHub presentation."
  },
  {
    type: "Growth Pick",
    difficulty: "4/5",
    angle: "The best choice if you want to learn more while building."
  }
];

const form = document.querySelector("#project-form");
const cardsGrid = document.querySelector("#cards-grid");
const resetButton = document.querySelector("#reset-button");
const readmeTitle = document.querySelector("#readme-title");
const readmeOutput = document.querySelector("#readme-output");

function createRecommendations(formData) {
  const blueprints = projectBlueprints[formData.interest];

  return blueprints.map((project, index) => {
    const cardType = cardTypes[index];
    const firstTask = buildFirstTask(project, formData.level);

    return {
      ...project,
      ...cardType,
      reason: `${profiles[formData.level].note} ${goals[formData.goal]} ${moods[formData.mood]}`,
      firstVersion: project.features.slice(0, 3),
      firstTask,
      timeline: timeLabels[formData.time],
      levelLabel: profiles[formData.level].label
    };
  });
}

function buildFirstTask(project, level) {
  if (level === "beginner") {
    return `Create a single page that shows the title "${project.name}", the one-line idea, and three feature cards.`;
  }

  if (level === "learning") {
    return `Build the main page and make one interactive control work for "${project.features[0]}".`;
  }

  return `Build a polished first screen and connect the main interaction for "${project.features[0]}".`;
}

function renderCards(recommendations) {
  cardsGrid.innerHTML = "";

  recommendations.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <strong>${project.type}</strong>
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
      <div class="meta-row">
        <span>${project.levelLabel}</span>
        <span>Difficulty ${project.difficulty}</span>
        <span>${project.timeline}</span>
      </div>
      <p><b>Why it fits:</b> ${project.reason}</p>
      <p><b>First version:</b></p>
      <ul>
        ${project.firstVersion.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
      <p><b>GitHub highlight:</b> ${project.github}</p>
      <p><b>Today:</b> ${project.firstTask}</p>
      <button class="card-button" type="button">Generate README</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      renderReadme(project);
    });

    cardsGrid.appendChild(card);
  });
}

function renderReadme(project) {
  readmeTitle.textContent = `${project.name} README draft`;
  readmeOutput.textContent = `# ${project.name}

${project.summary}

## Why This Exists

${project.reason}

## First Version

${project.firstVersion.map((feature) => `- ${feature}`).join("\n")}

## GitHub Highlight

${project.github}

## First Task

${project.firstTask}

## Estimated Scope

- Difficulty: ${project.difficulty}
- Timeline: ${project.timeline}
- Direction: ${project.type}
`;
}

function getFormData() {
  return Object.fromEntries(new FormData(form).entries());
}

function generate() {
  const recommendations = createRecommendations(getFormData());
  renderCards(recommendations);
  renderReadme(recommendations[0]);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generate();
});

resetButton.addEventListener("click", () => {
  form.reset();
  generate();
});

generate();
