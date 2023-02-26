export const initialData : any = {
    tasks: {
      1: { id: 1, content: "Task 1" },
      2: { id: 2, content: "Task 2" },
      3: { id: 3, content: "Task 3" },
      4: { id: 4, content: "Task 4" },
      5: { id: 5, content: "Task 5" },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "TO-DO",
        taskIds: [1, 2, 3, 4, 5],
      },
      "column-2": {
        id: "column-2",
        title: "IN-PROGRESS",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "COMPLETED",
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2", "column-3"],
};