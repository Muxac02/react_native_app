import { createContext, useContext, useState, useEffect } from "react";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = [
        {
          number: 1,
          author: "Иван Иванов",
          updated_at: null,
          created_at: "2025-04-27T18:16:19.067068",
          content: [
            {
              number: 1,
              type: "table",
              name: "records",
              isGroup: false,
              ships: ['СУАЛ "Сибирь"'],
              dateFrom: "2025-01-1",
              dateTo: "2025-04-10",
              content: [
                {
                  number: 1,
                  ship: 'СУАЛ "Сибирь"',
                  port: "МУР",
                  arrive_date: "2025-03-01T10:00:00.000000",
                  sail_date: "2025-03-01T10:00:00.000000",
                  arrive_date_real: "2025-03-01T10:00:00.000000",
                  sail_date_real: "2025-03-01T10:00:00.000000",
                  comment:
                    "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
                },
              ],
            },
            {
              number: 2,
              type: "table",
              name: "records",
              isGroup: true,
              ships: ['СУАЛ "Сибирь"', 'ГУАЛ "Арктика"'],
              dateFrom: "2025-01-1",
              dateTo: "2025-04-10",
              content: [
                {
                  number: 1,
                  ship: 'СУАЛ "Сибирь"',
                  port: "МУР",
                  arrive_date: "2025-03-01T10:00:00.000000",
                  sail_date: "2025-03-01T10:00:00.000000",
                  arrive_date_real: "2025-03-01T10:00:00.000000",
                  sail_date_real: "2025-03-01T10:00:00.000000",
                  comment:
                    "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
                },
                {
                  number: 2,
                  ship: 'СУАЛ "Сибирь"',
                  port: "МУР",
                  arrive_date: "2025-03-01T10:00:00.000000",
                  sail_date: "2025-03-01T10:00:00.000000",
                  arrive_date_real: "2025-03-01T10:00:00.000000",
                  sail_date_real: "2025-03-01T10:00:00.000000",
                  comment:
                    "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
                },
                {
                  number: 3,
                  ship: 'ГУАЛ "Арктика"',
                  port: "МУР",
                  arrive_date: "2025-03-01T10:00:00.000000",
                  sail_date: "2025-03-01T10:00:00.000000",
                  arrive_date_real: "2025-03-01T10:00:00.000000",
                  sail_date_real: "2025-03-01T10:00:00.000000",
                  comment:
                    "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
                },
                {
                  number: 4,
                  ship: 'ГУАЛ "Арктика"',
                  port: "МУР",
                  arrive_date: "2025-03-01T10:00:00.000000",
                  sail_date: "2025-03-01T10:00:00.000000",
                  arrive_date_real: "2025-03-01T10:00:00.000000",
                  sail_date_real: "2025-03-01T10:00:00.000000",
                  comment:
                    "График от 14.02.2025\nГрафик от 14.02.2025\nГрафик от 14.02.2025",
                },
              ],
            },
            {
              number: 3,
              type: "table",
              name: "points",
              isGroup: true,
              ships: ['СУАЛ "Сибирь"', 'ГУАЛ "Арктика"'],
              dateFrom: "2025-01-1",
              dateTo: "2025-04-10",
              content: [
                {
                  number: 1,
                  ship: 'ГУАЛ "Арктика"',
                  arrive: { inTime: 8, late: 2, total: 10 },
                  sail: { inTime: 9, late: 1, total: 10 },
                },
                {
                  number: 2,
                  ship: 'СУАЛ "Сибирь"',
                  arrive: { inTime: 8, late: 2, total: 10 },
                  sail: { inTime: 9, late: 1, total: 10 },
                },
              ],
            },
            {
              number: 4,
              type: "table",
              name: "travel",
              isGroup: true,
              ships: ['СУАЛ "Сибирь"', 'ГУАЛ "Арктика"'],
              dateFrom: "2025-01-1",
              dateTo: "2025-04-10",
              content: [
                {
                  number: 1,
                  ship: 'ГУАЛ "Арктика"',
                  lag: {
                    arrive: {
                      min: "240:30:00",
                      avg: "300:12:00",
                      max: "400:50:00",
                    },
                    sail: {
                      min: "240:30:00",
                      avg: "300:12:00",
                      max: "400:50:00",
                    },
                  },
                  lead: {
                    arrive: {
                      min: "240:30:00",
                      avg: "300:12:00",
                      max: "400:50:00",
                    },
                    sail: {
                      min: "240:30:00",
                      avg: "300:12:00",
                      max: "400:50:00",
                    },
                  },
                },
                {
                  number: 2,
                  ship: 'СУАЛ "Сибирь"',
                  lag: {
                    arrive: {
                      min: "240:30:00",
                      avg: "300:12:00",
                      max: "400:50:00",
                    },
                    sail: {
                      min: "240:30:00",
                      avg: "300:12:00",
                      max: "400:50:00",
                    },
                  },
                  lead: {
                    arrive: {
                      min: "240:30:00",
                      avg: "300:12:00",
                      max: "400:50:00",
                    },
                    sail: {
                      min: "240:30:00",
                      avg: "300:12:00",
                      max: "400:50:00",
                    },
                  },
                },
              ],
            },
            {
              number: 5,
              type: "table",
              name: "port",
              isGroup: true,
              ships: ['СУАЛ "Сибирь"', 'ГУАЛ "Арктика"'],
              dateFrom: "2025-01-1",
              dateTo: "2025-04-10",
              content: [
                {
                  number: 1,
                  ship: 'ГУАЛ "Арктика"',
                  planned: {
                    min: "240:30:00",
                    avg: "300:12:00",
                    max: "400:50:00",
                  },
                  real: {
                    min: "240:30:00",
                    avg: "300:12:00",
                    max: "400:50:00",
                  },
                },
                {
                  number: 2,
                  ship: 'СУАЛ "Сибирь"',
                  planned: {
                    min: "240:30:00",
                    avg: "300:12:00",
                    max: "400:50:00",
                  },
                  real: {
                    min: "240:30:00",
                    avg: "300:12:00",
                    max: "400:50:00",
                  },
                },
              ],
            },
          ],
        },
      ]; // твой метод API
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
    setLoading(true);
    setTimeout(fetchReports, 1000);
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

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        error,
        //updateReport,
        refreshReports: fetchReports,
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
