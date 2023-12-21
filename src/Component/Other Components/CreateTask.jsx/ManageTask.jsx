import TaskDashboard from '../../HomePage/TaskDashboard';

const ManageTask = () => {
    return (
        <div>
            <div className="relative border-s-8 border-gray-700 ps-3">
                <h2 className="text-6xl font-bold z-20">My Task</h2>
                <p className="absolute bottom-0 text-6xl md:text-7xl lg:text-9xl z-10 opacity-5 overflow-hidden">My Task</p>
            </div>
             <div className="w-11/12 mx-auto">
                <TaskDashboard></TaskDashboard>
            </div>
        </div>
    );
};

export default ManageTask;