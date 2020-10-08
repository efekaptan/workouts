import Axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../../config';
import { Search } from '../../context';
import Workout from './workout';

interface FindAllResponse {
    workouts: Workout[];
    recordCount: number;
}

export const findAll = async (search: Search): Promise<FindAllResponse> => {
    const result: AxiosResponse<[[], number]> = await Axios.get(`${apiUrl}/workouts`, {
        params: {
            ...search,
            categories: search.categories?.join(',')
        }
    });

    return {
        workouts: result.data[0].map(removeLargeImageSuffix),
        recordCount: result.data[1]
    };
}

export const findOne = async (id: number): Promise<Workout> => {
    const result: AxiosResponse<Workout> = await Axios.get(`${apiUrl}/workouts/${id}`);
    return result.data;
}

const removeLargeImageSuffix = (workout: Workout) => {
    const largeSuffix = '-large';

    return {
        ...workout,
        image: workout.image.replace(largeSuffix, '')
    }
}