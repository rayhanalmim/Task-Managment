import { Draggable, Droppable } from "react-beautiful-dnd";

const TaskColimn = ({ column, tasks }) => {
    console.log(tasks)
    return (
        <div className={`w-full border-gray-800 border-2`}>

            <h3 className="bg-gray-800 text-white text-center py-2 font-semibold">{column.title}</h3>

            <Droppable droppableId={column.id}>
                {(droppableProvided, droppableSnapshot) => (
                    <div
                    className=" p-3 gap-3 flex flex-col"
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                {(draggableProvided, draggableSnapshot) => (
                                    <div
                                        className="p-2 border-gray-300 cursor-pointer rounded border-2"
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                    >
                                        <h3>{task.content}</h3>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TaskColimn;