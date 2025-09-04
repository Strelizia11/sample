export type TaskStatus = "open" | "claimed" | "completed" | "paid";


export type Task = {
id: string;
title: string;
description: string;
levelRequired: number; // min level to unlock
rewardEth: string; // string to avoid float issues
clientAddress?: string; // optional for payments
freelancerAddress?: string; // who claimed
status: TaskStatus;
createdAt: number;
};


export type Profile = {
address?: string;
xp: number;
level: number;
completedTaskIds: string[];
};