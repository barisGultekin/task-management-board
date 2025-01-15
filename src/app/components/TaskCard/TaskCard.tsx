"use client";
import React from "react";
import styles from "./TaskCard.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";

import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";

interface TaskCardProps {
  id: number;
  title: string;
  assigneeId: number;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  assigneeId,
  onClick,
  onEdit,
  onDelete,
}) => {
  // Access users from the Redux store
  const users = useSelector((state: RootState) => state.users);
  interface User {
    id: number;
    name: string;
    avatar: string;
  }

  const assignee: User | undefined = users.find(
    (user: User) => user.id === assigneeId
  );

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
      <div className={styles.actions}>
        <div
          className={`${styles.action} ${styles.edit}`}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <FaPenToSquare />
        </div>
        <div
          className={`${styles.action} ${styles.delete}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FaTrashCan />
        </div>
      </div>
      <div className={styles.taskInfo}>
        <p>{title}</p>
        {assignee && (
          <div className={styles.assignee}>
            <Image
              src={assignee.avatar}
              alt={assignee.name}
              className={styles.avatar}
              width={24}
              height={24}
            />
            <p>{assignee.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
