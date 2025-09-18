export const timeGreetings = [
  { start: 0, end: 4, messages: [
    "Burning the midnight oil",
    "Still grinding",
    "Late-night hustle mode"
  ]},
  { start: 4, end: 12, messages: [
    "Good morning",
    "Rise and shine 🌅",
    "Fresh start, new goals"
  ]},
  { start: 12, end: 17, messages: [
    "Good afternoon",
    "Stay focused 💡",
    "Push through, you're halfway"
  ]},
  { start: 17, end: 21, messages: [
    "Good evening",
    "Wrap it up strong ✨",
    "Time to slow down"
  ]},
  { start: 21, end: 24, messages: [
    "Hello night owl 🌙",
    "Quiet night, clear mind",
    "Grinding after hours"
  ]},
];

export const timeSupportTexts = [
  { start: 0, end: 4, messages: [
    "The night is yours 🌌",
    "Deep focus zone",
    "Perfect time to plan ahead"
  ]},
  { start: 4, end: 12, messages: [
    "Kickstart your day 🚀",
    "Check today’s priorities",
    "Set the pace early"
  ]},
  { start: 12, end: 17, messages: [
    "Keep the momentum going",
    "Prime focus hours 🔥",
    "Small wins add up"
  ]},
  { start: 17, end: 21, messages: [
    "Review what you’ve achieved",
    "Close out pending tasks",
    "Evening reset time"
  ]},
  { start: 21, end: 24, messages: [
    "Wind down or power through",
    "Get ready for tomorrow",
    "Balance work and rest 🌙"
  ]},
];

export const getRandomGreeting= ()=>{
   const hour = new Date().getHours();
   console.log(hour);
   
  const currentGreeting = timeGreetings.find(greeting => hour >= greeting.start && hour < greeting.end);
  const currentSupportText = timeSupportTexts.find(greeting => hour >= greeting.start && hour < greeting.end);

  if (!currentGreeting||!currentSupportText) return {greeting:"Hello!",supportText:"Time to conquer the day!"}
  const current = currentGreeting;
  
  return {greeting:current.messages[Math.floor(Math.random() * current.messages.length)], supportText:currentSupportText.messages[Math.floor(Math.random() * currentSupportText.messages.length)]}
  }
  function toRoute(text:string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")   
    .replace(/\s+/g, "-")           
    .replace(/-+/g, "-")           
    .replace(/^-|-$/g, "");        
}
