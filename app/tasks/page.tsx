"use client";

import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

// Mock task list
const initialTasks = [
  { id: 1, title: "Design a logo", reward: "0.001" },
  { id: 2, title: "Fix a website bug", reward: "0.002" },
  { id: 3, title: "Write blog content", reward: "0.0005" },
];

export default function TasksPage() {
  const { isConnected, address } = useAccount();
  const { sendTransactionAsync, isPending } = useSendTransaction();

  const [tasks, setTasks] = useState(initialTasks);
  const [completedTask, setCompletedTask] = useState<number | null>(null);

  async function handleCompleteTask(taskId: number, rewardEth: string) {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      // Send reward (demo: sends to self)
      await sendTransactionAsync({
        to: address!,
        value: parseEther(rewardEth),
      });

      setCompletedTask(taskId);
      alert(`Task ${taskId} completed! You earned ${rewardEth} ETH.`);
    } catch (err) {
      console.error(err);
      alert("Transaction failed.");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Tasks</h1>

      {!isConnected && (
        <p className="text-gray-600 mb-4">
          Connect your wallet to complete tasks and earn rewards.
        </p>
      )}

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-500">
                Reward: {task.reward} ETH
              </p>
            </div>
            <button
              disabled={isPending || completedTask === task.id}
              onClick={() => handleCompleteTask(task.id, task.reward)}
              className={`px-4 py-2 rounded-lg text-white ${
                completedTask === task.id
                  ? "bg-gray-500"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {completedTask === task.id
                ? "Completed"
                : isPending
                ? "Processing..."
                : "Complete Task"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
