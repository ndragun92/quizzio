export const questionTypeOptions = Object.values(EQuestionType).map((type) => ({
  label: type.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
  value: type,
}));

export const statuses = Object.values(EStatus).map((cat) => ({
  label: cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // capitalize each word
  value: cat,
}));

export const gameModes = Object.values(EGameMode).map((cat) => ({
  label: cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // capitalize each word
  value: cat,
}));

export const categories = Object.values(ECategory).map((cat) => ({
  label: cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // capitalize each word
  value: cat,
}));

export const difficulties = Object.values(EDifficulty).map((diff) => ({
  label: diff.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // capitalize each word
  value: diff,
}));