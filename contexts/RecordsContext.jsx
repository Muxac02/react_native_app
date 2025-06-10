import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/utils/apiurl";
const RecordsContext = createContext();

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/records`);
      if (!response.ok) {
        throw new Error("Failed to fetch records:", response.status);
      }
      const data = sortRecords(await response.json());
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const updateRecord = async (id, changes) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/records/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changes),
      });
      await fetchRecords();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const changeStatus = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/records/status_change/${id}`, {
        method: "POST",
      }); // твой метод API
      if (!response.ok) {
        throw new Error(
          `Failed to change record ${id} status:`,
          response.status
        );
      }
      // После успешного обновления перезагружаем данные
      await fetchRecords();
      console.log(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const addRecord = async (body) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/records/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to change record ${id} status:`,
          response.status
        );
      }
      // После успешного обновления перезагружаем данные
      await fetchRecords();
      console.log(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteRecord = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/records/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete record ${id} status:`,
          response.status
        );
      }
      // После успешного обновления перезагружаем данные
      await fetchRecords();
      console.log(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Загружаем данные при монтировании
  useEffect(() => {
    fetchRecords();
  }, []);
  return (
    <RecordsContext.Provider
      value={{
        records,
        loading,
        error,
        refreshRecords: fetchRecords,
        changeStatus: changeStatus,
        addRecord,
        updateRecord,
        deleteRecord,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
};
function sortRecords(records) {
  return records.sort((a, b) => {
    // Определяем приоритет группы (1, 2 или 3)
    const getGroupPriority = (record) => {
      if (record.arrive_date_real === null) return 1; // Группа 1 (самые высокие)
      if (record.sail_date_real === null) return 2; // Группа 2
      return 3; // Группа 3 (самые низкие)
    };

    const groupA = getGroupPriority(a);
    const groupB = getGroupPriority(b);

    // Если записи в разных группах, сортируем по группе
    if (groupA !== groupB) {
      return groupA - groupB;
    }

    // Если в одной группе, сортируем внутри неё
    const getSortableDate = (record) => {
      if (groupA === 1) return new Date(record.sail_date); // Группа 1: сортируем по sail_date
      if (groupA === 2) return new Date(record.sail_date); // Группа 2: сортируем по sail_date
      return new Date(record.sail_date_real); // Группа 3: сортируем по sail_date_real
    };

    const dateA = getSortableDate(a);
    const dateB = getSortableDate(b);

    return dateA - dateB; // По возрастанию (от старых к новым)
  });
}
export const useRecords = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsContext");
  }
  return context;
};
