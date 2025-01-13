import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./BoardColumn.module.scss";

interface BoardColumnProps {
  title: string;
  tasks: { id: number; title: string }[];
  onDrop: (taskId: number, newStatus: string) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({ title, tasks, onDrop }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    onDrop(taskId, title);
  };

  return (
    <div className={styles.column} onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} id={task.id} title={task.title} />
      ))}
    </div>
  );
};

export default BoardColumn;