import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/utils/apiurl";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(`${API_URL}/users/authors`); // твой метод API
      if (!response.ok) {
        throw new Error("Failed to fetch authors:", response.status);
      }
      const data = await response.json();
      setAuthors(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/reports`); // твой метод API
      if (!response.ok) {
        throw new Error("Failed to fetch reports:", response.status);
      }
      const data = await response.json();
      setReports(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные при монтировании
  useEffect(() => {
    fetchAuthors();
    fetchReports();
  }, []);

  //   const updateReport = async (id, changes) => {
  //     try {
  //       setLoading(true);
  //       await api.updateReport(id, changes); // твой метод API
  //       // После успешного обновления перезагружаем данные
  //       await fetchReports();
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const addReport = async (body) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/reports/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to create report ${id} status:`,
          response.status
        );
      }
      // После успешного обновления перезагружаем данные
      await fetchReports();
      console.log(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const changeReport = async (id, body) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/reports/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update report ${id} status:`,
          response.status
        );
      }
      // После успешного обновления перезагружаем данные
      await fetchReports();
      console.log(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/reports/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete report ${id} status:`,
          response.status
        );
      }
      // После успешного обновления перезагружаем данные
      await fetchReports();
      console.log(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        error,
        authors,
        //updateReport,
        refreshReports: fetchReports,
        addReport,
        changeReport,
        deleteReport,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportsContext");
  }
  return context;
};
