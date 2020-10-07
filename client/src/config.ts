let apiUrl: string;

if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://localhost:3001';
} else {
    apiUrl = 'https://workouts-api.herokuapp.com';
}

const categories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
const pageSize = 20;

export { apiUrl, categories, pageSize };