export function levelFromXP(xp: number): number {
// simple curve: L = floor(1 + sqrt(xp/100)) → 0-99 xp = L1, 100-399 = L2, etc.
return Math.max(1, Math.floor(1 + Math.sqrt(xp / 100)));
}


export function xpForTask(levelRequired: number): number {
// higher entry tasks grant a bit more XP
return 25 + levelRequired * 15; // tweak as you like
}


export function nextLevelAt(level: number): number {
// invert the level function roughly
const targetXP = (level * level - 1) * 100;
return Math.max(0, targetXP);
}