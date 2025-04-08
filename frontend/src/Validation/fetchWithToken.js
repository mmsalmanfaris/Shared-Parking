import { AlertCircle } from "lucide-react";

const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../login";
        alert("Fetch With Token Error!!")
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
};

export default fetchWithToken;