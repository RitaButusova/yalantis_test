import axios from "axios";

const url = 'https://yalantis-react-school-api.yalantis.com/api/task0/users';

function service() {
    return axios.get(url);
}

export default service;

