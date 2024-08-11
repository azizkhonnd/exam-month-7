import { useEffect, useState } from "react";
import axios from '../api'

const useFetch = (ENDPOINT) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const dataLoad = async () => {
            try {
                setLoading(true);
                const response = await axios(ENDPOINT);
                setData(response.data?.payload);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }

        dataLoad();
    }, [ENDPOINT])

    return [data, loading];
}

export default useFetch