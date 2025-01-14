"use client";
import React from "react";
import styles from "./TaskInfo.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Image from "next/image";

interface TaskInfoProps {
  id: number;
  title: string;
  description: string;
  status: string;
  assigneeId: number;
  storyPoints: number;
  startDate: string;
  endDate: string;
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
}) => {
  // Access users from Redux to get assignee details
  const users = useSelector((state: RootState) => state.users);
  const assignee = users.find((user) => user.id === assigneeId);

  console.log("Task ID:", id)

  return (
    <div className={styles.taskInfo}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Status: {status}</p>
      <p>Story Points: {storyPoints}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      {assignee && (
        <div className={styles.assignee}>
          <Image
            src={assignee.avatar}
            alt={assignee.name}
            className={styles.avatar}
            width={50}
            height={50}
          />
          <span>{assignee.name}</span>
        </div>
      )}
    </div>
  );
};

export default TaskInfo;