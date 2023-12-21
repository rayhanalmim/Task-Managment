import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useTaskData = (user) => {
    const { data: taskdata=[], isPending, isLoading, refetch } = useQuery({
        queryKey: ['Task For', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/taskdata?email=${user?.email}`)
            console.log(res.data)
            return res.data;
        }
    })
    return [taskdata, isPending, isLoading, refetch];
};

export default useTaskData;