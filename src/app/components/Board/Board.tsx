"use client"
import React, { useState } from "react";
import BoardColumn from "../BoardColumn/BoardColumn";
import styles from "./Board.module.scss";

const Board = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "Open" },
    { id: 2, title: "Task 2", status: "In Progress" },
    { id: 3, title: "Task 3", status: "In Review" },
    { id: 4, title: "Task 4", status: "Done" },
  ]);

  const handleDrop = (taskId: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className={styles.board}>
      {["Open", "In Progress", "In Review", "Done"].map((status) => (
        <BoardColumn
          key={status}
          title={status}
          tasks={tasks.filter((task) => task.status === status)}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default Board;