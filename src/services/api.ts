// This file simulates API interactions using local storage

import { WorkflowSaveStateType } from "../utils/type/workflow";

/**
 * Save the workflow to local storage with a 500ms delay
 * save the workflow with existing workflow in the local storage
 */
export const saveWorkflow = (workflow: WorkflowSaveStateType) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        let workflowData: any = localStorage.getItem("workflowData");
        if (workflowData) {
          workflowData = JSON.parse(workflowData);
          if (Array.isArray(workflowData) && workflowData.length > 0) {
            const existingIndex = workflowData.findIndex(
              (item: any) => item?.id === workflow?.id
            );
            if (existingIndex !== -1) {
              workflowData[existingIndex] = workflow;
            } else {
              workflowData.push(workflow);
            }
          } else {
            workflowData = [workflow];
          }
        } else {
          workflowData = [workflow];
        }
        localStorage.setItem("workflowData", JSON.stringify(workflowData));
        resolve({ success: true, message: "Workflow saved successfully" });
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Load all workflows from local storage with a 500ms delay to simulate network request
 */
export const loadWorkflow = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const workflowData = localStorage.getItem("workflowData");
        if (workflowData) {
          resolve({ success: true, data: JSON.parse(workflowData) });
        } else {
          resolve({ success: true, data: [] });
        }
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
};
/**
 * delete the passed workflow from local storage
 */
export const deleteWorkflow = (workflowId: string) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        let workflowData: any = localStorage.getItem("workflowData");

        if (workflowData) {
          workflowData = JSON.parse(workflowData);

          if (Array.isArray(workflowData) && workflowData.length > 0) {
            const workflowIndex = workflowData.findIndex(
              (item: any) => item?.id === workflowId
            );

            if (workflowIndex !== -1) {
              workflowData.splice(workflowIndex, 1);
              localStorage.setItem(
                "workflowData",
                JSON.stringify(workflowData)
              );
              resolve({
                success: true,
                message: "Workflow deleted successfully",
              });
            } else {
              resolve({ success: false, message: "Workflow not found" });
            }
          } else {
            resolve({ success: false, message: "No workflows found" });
          }
        } else {
          resolve({ success: false, message: "No workflows found" });
        }
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
};
