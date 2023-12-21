import { DragDropContext } from "react-beautiful-dnd";
import { useContext, useState } from "react";
import TaskColimn from "./TaskColimn";
import useTaskData from "../../Hook/useTaskData";
import { AuthContext } from "../../Authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    const [state, setState] = useState([]);
    const {user } = useContext(AuthContext);

    const { data: taskdata=[], isPending, isLoading, refetch } = useQuery({
        queryKey: ['Task For', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/taskdata?email=${user?.email}`)
            const itemData = res.data[0];
            setState(itemData)
            console.log(itemData)
            return itemData;
        }
    })

    if (isLoading) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>
    }
    console.log(taskdata, state);

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
           {
            state?.tasks?.length ?  <div className="grid grid-cols-3 pt-5 justify-items-center gap-3">
            {
                state.columnOrder.map((columId) => {
                    const column = state.columns[columId]
                    const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                    return <TaskColimn key={column.id} column={column} tasks={tasks}></TaskColimn>
                })
            }
        </div> : <div><h3 className="text-center pt-5 font-bold underline text-3xl">No task found, <br />Please add some task</h3></div>
           }
        </DragDropContext>
    );
};

export default TaskDashboard;

const initialData = {
    tasks: [
        { id: 1, content: "Configure Next.js application" },
        { id: 2, content: "Configure Next.js and tailwind " },
        { id: 3, content: "Create sidebar navigation menu" },
        { id: 4, content: "Create page footer" },
        { id: 5, content: "Create page navigation menu" },
        { id: 6, content: "Create page layout" },
    ],
    columns: {
        "column-1": {
            id: "column-1",
            title: "TO-DO",
            taskIds: [0, 1, 2, 3, 4, 5],
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