import { useEffect } from 'react';
import { AppDispatch, RootState } from '../state/store';
import {useDispatch, useSelector} from 'react-redux';
import { getTasksAsync } from '../state/task/taskSlice';
import { HashLoader } from 'react-spinners';

const TasksPage = () => {

    const dispatch = useDispatch<AppDispatch>()
    const tasks = useSelector((state: RootState) => state.task);
    useEffect(() => {
        const name = async () => {
            await dispatch(getTasksAsync())
        }
        name();
    }, [])

    if(tasks.length === 0) {
        return <HashLoader color={'#3B8CCF'} size={100} cssOverride={{display: 'block', margin: '100px auto'}}/>;
    }

    return (
        <>
            <h1>{tasks[0]._id}</h1>
        </>
    )
};

export default TasksPage;