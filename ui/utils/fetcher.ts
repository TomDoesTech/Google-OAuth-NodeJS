import axios from "axios";

const fetcher = async <T>(url: string, headers = {}): Promise<T | null> => {
  try {
    const { data } = await axios.get<T>(url, {
      headers,
      withCredentials: true,
    });

    return data;
  } catch (e) {
    return null;
  }
};

export default fetcher;
