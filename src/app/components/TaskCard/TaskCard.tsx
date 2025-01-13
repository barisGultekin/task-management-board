import React from "react";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  id: number;
  title: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  return (
    <div className={styles.card} draggable onDragStart={handleDragStart}>
      {title}
    </div>
  );
};

export default TaskCard;