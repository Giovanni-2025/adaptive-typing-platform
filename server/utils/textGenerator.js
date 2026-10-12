// Temporary generator: random "words" from the unlocked keys.
// The AI text and weak-key weighting come in a later step.
function generatePracticeText(keys, wordCount = 20) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    const len = 3 + Math.floor(Math.random() * 3);
    let word = "";
    for (let j = 0; j < len; j++) {
      word += keys[Math.floor(Math.random() * keys.length)];
    }
    words.push(word);
  }
  return words.join(" ");
}

module.exports = { generatePracticeText };