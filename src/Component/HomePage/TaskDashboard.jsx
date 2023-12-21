import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import TaskColimn from "./TaskColimn";

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);
  
    const newColumn = {
      ...sourceCol,
      taskIds: newTaskIds,
    };
  
    return newColumn;
  };

const TaskDashboard = () => {
    const [state, setState] = useState(initialData);
    console.log(state)



    const onDragEnd = (result) => {
        const { destination, source } = result;
        // If user tries to drop in an unknown destination
        if (!destination) return;

        // if the user drags and drops back in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // If the user drops within the same column but in a different positoin
        const sourceCol = state.columns[source.droppableId];
        const destinationCol = state.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(
                sourceCol,
                source.index,
                destination.index
            );

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };
            setState(newState);
            return;
        }

        // If the user moves from one column to another
        const startTaskIds = Array.from(sourceCol.taskIds);
        const [removed] = startTaskIds.splice(source.index, 1);
        const newStartCol = {
            ...sourceCol,
            taskIds: startTaskIds,
        };

        const endTaskIds = Array.from(destinationCol.taskIds);
        endTaskIds.splice(destination.index, 0, removed);
        const newEndCol = {
            ...destinationCol,
            taskIds: endTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            },
        };

        setState(newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 pt-5 justify-items-center gap-3">
                {
                    state.columnOrder.map((columId) => {
                        const column = state.columns[columId]
                        const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                        return <TaskColimn key={column.id} column={column} tasks={tasks}></TaskColimn>
                    })
                }
            </div>
        </DragDropContext>
    );
};

export default TaskDashboard;

const initialData = {
    tasks: {
        1: { id: 1, content: "Configure Next.js application" },
        2: { id: 2, content: "Configure Next.js and tailwind " },
        3: { id: 3, content: "Create sidebar navigation menu" },
        4: { id: 4, content: "Create page footer" },
        5: { id: 5, content: "Create page navigation menu" },
        6: { id: 6, content: "Create page layout" },
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "TO-DO",
            taskIds: [1, 2, 3, 4, 5, 6],
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