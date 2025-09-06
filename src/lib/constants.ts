export const timeGreetings = [
  { start: 0, end: 4, messages: [
    "Burning the midnight oil?",
    "Night owl vibes!",
    "The world is quiet, but you’re awake"
  ]},
  { start: 4, end: 12, messages: [
    "Good morning!",
    "Rise and shine!",
    "Time to grab that coffee and conquer the day!"
  ]},
  { start: 12, end: 17, messages: [
    "Good afternoon!",
    "Keep pushing!",
    "Hope your day’s going amazing!"
  ]},
  { start: 17, end: 21, messages: [
    "Good evening!",
    "Relax, you’ve earned it!",
    "Time to unwind and recharge"
  ]},
  { start: 21, end: 24, messages: [
    "Hello night owl!",
    "Late night grind?",
    "Stars are out, but so are you!"
  ]},
];
export const timeSupportTexts = [
  {
    start: 0,  
    end: 4,  
    messages: [
      "Keep going, the night is yours",
      "Late night work session",
      "Time to wrap things up or push through"
    ]
  },
  {
    start: 4,  
    end: 12, 
    messages: [
      "Start your morning strong",
      "Check your tasks for today",
      "Kick off your day"
    ]
  },
  {
    start: 12, 
    end: 17,  
    messages: [
      "Keep up the momentum",
      "Afternoon focus time",
      "Time to make progress"
    ]
  },
  {
    start: 17, 
    end: 21,   
    messages: [
      "Wind down and review your day",
      "Evening tasks, let's finish strong",
      "Check your remaining priorities"
    ]
  },
  {
    start: 21, 
    end: 24,   
    messages: [
      "Night work session",
      "Prepare for tomorrow",
      "Time to relax or push a little more"
    ]
  }
];

export const careerTasks = [
  { text: "Update your LinkedIn profile headline", done: false },
  { text: "Send a connection request to someone in your industry", done: false },
  { text: "Write a short post sharing your knowledge", done: false },
  { text: "Apply to one job or freelance project today", done: false },
  { text: "Learn one new concept in your field", done: false }]
export const recommendedJobs = [
    {
      title: "Frontend Developer Intern",
      company: "TechNova Labs",
      tags: ["Remote", "Internship"],
    },
    {
      title: "Junior Backend Engineer",
      company: "DataCore Systems",
      tags: ["Full-time", "Node.js"],
    },
    {
      title: "UI/UX Designer",
      company: "BrightApps",
      tags: ["Hybrid", "Figma"],
    },
  ]
export const getRandomGreeting= ()=>{
   const hour = new Date().getHours();
  const currentGreeting = timeGreetings.find(greeting => hour >= greeting.start && hour < greeting.end);
  const currentSupportText = timeSupportTexts.find(greeting => hour >= greeting.start && hour < greeting.end);

  if (!currentGreeting||!currentSupportText) return {greeting:"Hello!",supportText:"Time to conquer the day!"}
  const current = currentGreeting;
  
  return {greeting:current.messages[Math.floor(Math.random() * current.messages.length)], supportText:currentSupportText.messages[Math.floor(Math.random() * currentSupportText.messages.length)]}
  }