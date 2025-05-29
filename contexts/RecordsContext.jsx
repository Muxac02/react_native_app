import { createContext, useContext, useState, useEffect } from "react";

const RecordsContext = createContext();

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = [
        {
          arrive_date: "2025-04-27T18:20:00",
          port: "МУР",
          sail_date: "2025-05-04T18:20:00",
          sail_date_real: "2025-04-27T18:35:53.966429",
          updated_at: null,
          number: 1,
          ship: 'а\\л "Таймыр"',
          created_at: "2025-04-27T18:16:19.067068",
          arrive_date_real: "2025-04-27T18:35:49.998517",
          comment: "string",
        },
        {
          arrive_date: "2025-04-27T18:30:00",
          port: "СПб",
          sail_date: "2025-05-04T18:30:00",
          sail_date_real: null,
          updated_at: null,
          number: 2,
          ship: 'СУАЛ "Урал"',
          created_at: "2025-04-27T18:33:11.545150",
          arrive_date_real: null,
          comment: "string",
        },
      ]; // твой метод API
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные при монтировании
  useEffect(() => {
    setLoading(true);
    setTimeout(fetchRecords, 2000);
  }, []);

  //   const updateRecord = async (id, changes) => {
  //     try {
  //       setLoading(true);
  //       await api.updateRecord(id, changes); // твой метод API
  //       // После успешного обновления перезагружаем данные
  //       await fetchRecords();
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <RecordsContext.Provider
      value={{
        records,
        loading,
        error,
        //updateRecord,
        refreshRecords: fetchRecords,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsContext");
  }
  return context;
};
