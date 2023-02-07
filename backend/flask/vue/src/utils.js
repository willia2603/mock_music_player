import axios from 'axios'
async function fetchData(url, error) {
    try {
        let res = await axios.get(url);
        return res.data
    } catch(e) {
        error.value = e.message
        return []
    }
}

export default fetchData