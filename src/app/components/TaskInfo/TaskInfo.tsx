"use client";
import React from "react";
import styles from "./TaskInfo.module.scss";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Image from "next/image";

import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";

interface TaskInfoProps {
  id: number;
  title: string;
  description: string;
  status: string;
  assigneeId: number;
  storyPoints: number;
  startDate: string;
  endDate: string;
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const TaskInfo: React.FC<TaskInfoProps> = ({
  id,
  title,
  description,
  status,
  assigneeId,
  storyPoints,
  startDate,
  endDate,
  onEdit,
  onDelete,
}) => {
  // Access users from Redux to get assignee details
  const users = useSelector((state: RootState) => state.users);
  const assignee = users.find((user) => user.id === assigneeId);

  console.log("Task ID:", id);

  return (
    <div className={styles.taskInfo}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.infoTable}>
        <div className={styles.infoRow}>
          <div className={styles.tag}>
            <p>Status</p>
          </div>
          <p>{status}</p>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.tag}>
            <p>Assignee</p>
          </div>
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

        <div className={styles.infoRow}>
          <div className={styles.tag}>
            <p>Story Points</p>
          </div>
          <p> {storyPoints}</p>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.tag}>
            <p>Start</p>
          </div>
          <p> {startDate}</p>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.tag}>
            <p>End</p>
          </div>
          <p> {endDate}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={() => {onEdit(id)}}>
          <FaPenToSquare />
          <p>Edit</p>
        </button>
        <button type="button" onClick={() => {onDelete(id)}}>
          <FaTrashCan />
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

export default TaskInfo;
