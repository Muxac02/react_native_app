import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/utils/apiurl";

const SearchRecordsContext = createContext();

export const SearchRecordsProvider = ({ children }) => {
  const [recordsSearch, setRecords] = useState([]);
  const [loadingSearch, setLoading] = useState(false);
  const [errorSearch, setError] = useState(null);

  const fetchRecords = async (body) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/records/search`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }); // твой метод API
      if (!response.ok) {
        throw new Error(
          `Failed to fetch records, status: ${response.status}`,
          response.status
        );
      }
      const data = await response.json();
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchRecordsContext.Provider
      value={{
        recordsSearch,
        loadingSearch,
        errorSearch,
        fetchRecords,
      }}
    >
      {children}
    </SearchRecordsContext.Provider>
  );
};

export const useSearchRecords = () => {
  const context = useContext(SearchRecordsContext);
  if (!context) {
    throw new Error(
      "useSearchRecords must be used within a SearchRecordsContext"
    );
  }
  return context;
};
