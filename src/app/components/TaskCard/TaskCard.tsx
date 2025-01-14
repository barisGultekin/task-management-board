"use client";
import React from "react";
import styles from "./TaskCard.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"
import Image from "next/image";

interface TaskCardProps {
  id: number;
  title: string;
  assigneeId: number;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, assigneeId, onClick }) => {
  // Access users from the Redux store
  const users = useSelector((state: RootState) => state.users);
  interface User {
    id: number;
    name: string;
    avatar: string;
  }

  const assignee: User | undefined = users.find((user: User) => user.id === assigneeId);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  return (
    <div
      className={styles.card}
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
    >
      <div className={styles.taskInfo}>
        <p>{title}</p>
        {assignee && (
          <div className={styles.assignee}>
            <Image src={assignee.avatar} alt={assignee.name} className={styles.avatar} width={28} height={28}/>
            <p>{assignee.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;