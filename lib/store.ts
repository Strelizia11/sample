"use client";
const PROFILE_KEY = "co_mission_profile_v1";


export function useTasks() {
const [tasks, setTasks] = useState<Task[]>([]);
useEffect(() => {
const raw = localStorage.getItem(TASKS_KEY);
if (raw) setTasks(JSON.parse(raw));
else setTasks(getDefaultTasks());
}, []);
useEffect(() => {
if (tasks.length) localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}, [tasks]);
return { tasks, setTasks };
}


export function useProfile() {
const [profile, setProfile] = useState<Profile>({ xp: 0, level: 1, completedTaskIds: [] });
useEffect(() => {
const raw = localStorage.getItem(PROFILE_KEY);
if (raw) setProfile(JSON.parse(raw));
}, []);
useEffect(() => {
localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}, [profile]);
return { profile, setProfile };
}


function getDefaultTasks(): Task[] {
const now = Date.now();
return [
{
id: "t-1",
title: "Write a 200-word product blurb",
description: "Draft a short, engaging blurb for a new gadget.",
levelRequired: 1,
rewardEth: "0.0002",
clientAddress: "0x0000000000000000000000000000000000000000",
status: "open",
createdAt: now,
},
{
id: "t-2",
title: "Fix a small CSS bug",
description: "Button misaligned on mobile — adjust Tailwind classes.",
levelRequired: 1,
rewardEth: "0.0003",
clientAddress: "0x0000000000000000000000000000000000000000",
status: "open",
createdAt: now,
},
{
id: "t-3",
title: "Basic logo sketch",
description: "Provide 3 black-and-white sketches.",
levelRequired: 2,
rewardEth: "0.0005",
clientAddress: "0x0000000000000000000000000000000000000000",
status: "open",
createdAt: now,
},
];
}