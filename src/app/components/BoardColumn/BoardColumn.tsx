import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./BoardColumn.module.scss";

interface BoardColumnProps {
  title: string;
  taskCount: number;
  tasks: { id: number; title: string; status: string; assigneeId: number }[];
  onDrop: (taskId: number, newStatus: string) => void;
  onTaskClick: (taskId: number) => void;
  onTaskEdit: (taskId: number) => void;
  onTaskDelete: (taskId: number) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({
  title,
  taskCount,
  tasks,
  onDrop,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    onDrop(taskId, title);
  };

  const titleColor =
    title === "Open"
      ? styles.open
      : title === "In Progress"
        ? styles.inProgress
        : title === "In Review"
          ? styles.inReview
          : styles.done;

  return (
    <div
      className={styles.column}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.header}>
        <div className={`${styles.title} ${titleColor}`}>{title}</div>
        <p>{taskCount}</p>
      </div>

      <div className={styles.list}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            assigneeId={task.assigneeId} // Pass assigneeId to TaskCard
            onClick={() => onTaskClick(task.id)}
            onEdit={() => onTaskEdit(task.id)}
            onDelete={() => onTaskDelete(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
