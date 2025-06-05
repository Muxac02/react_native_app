import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const generateExcelFile = async (data, number) => {
  try {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    const wsData = [];

    // Process each table in the data array
    data.forEach((table, index) => {
      if (index > 0) {
        wsData.push([]);
      }
      // Add title based on table name
      let title;
      switch (table.name) {
        case "records":
          title = table.isGroup
            ? "Записи за промежуток"
            : "Записи за промежуток";
          break;
        case "points":
          title = "Статистика прохождения КТ";
          break;
        case "travel":
          title = "Статистика времени следования";
          break;
        case "port":
          title = "Статистика времени нахождения в порту";
          break;
        default:
          title = "Таблица";
      }

      // Add title and date range
      wsData.push([title]);
      wsData.push([
        `С: ${
          new Date(table.dateFrom).getTime() != 0
            ? formatDate(table.dateFrom)
            : "Без ограничений"
        }`,
        `По: ${
          new Date(table.dateTo).getTime() != 0
            ? formatDate(table.dateTo)
            : "Без ограничений"
        }`,
      ]);

      // Add table content based on table type
      switch (table.name) {
        case "records":
          addRecordsTable(wsData, table.content);
          break;
        case "points":
          addPointsTable(wsData, table.content);
          break;
        case "travel":
          addTravelTable(wsData, table.content);
          break;
        case "port":
          addPortTable(wsData, table.content);
          break;
      }

      // Add the worksheet to the workbook
    });
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, `Отчет №${number} мониторинг`);

    // Generate Excel file
    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    // Define file path
    const directory = `${FileSystem.documentDirectory}reports/`;
    const fileName = `report_number${number}_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;
    const fileUri = `${directory}${fileName}`;

    // Ensure directory exists
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

    // Write the file
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Share the file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Отчет",
        UTI: "com.microsoft.excel.xlsx",
      });
    } else {
      console.log("Sharing not available on this platform");
    }

    return { success: true, fileUri };
  } catch (error) {
    console.error("Error generating Excel file:", error);
    return { success: false, error };
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Helper function to format datetime
const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
};

// Helper function to add records table
const addRecordsTable = (wsData, content) => {
  // Add headers
  wsData.push([
    "Судно",
    "Дата прибытия в порт",
    "Дата ухода в рейс",
    "Реальная дата прибытия в порт",
    "Реальная дата ухода в рейс",
    "Комментарий",
    "Порт",
  ]);

  // Add content rows
  content.forEach((item) => {
    wsData.push([
      ships.find((s) => s.number == item.ship).name,
      formatDateTime(item.arrive_date),
      formatDateTime(item.sail_date),
      new Date(item.arrive_date_real).getTime() != 0
        ? formatDateTime(item.arrive_date_real)
        : "",
      new Date(item.sail_date_real).getTime() != 0
        ? formatDateTime(item.sail_date_real)
        : "",
      item.comment ? item.comment.replace(/\n/g, " ") : "", // Replace newlines with spaces
      ports.find((s) => s.number == item.port).name,
    ]);
  });
};

// Helper function to add points table
const addPointsTable = (wsData, content) => {
  // Add headers
  wsData.push(["Судно", "Все КТ", "", "", "Прибытия", "", "", "Уходы", "", ""]);
  wsData.push([
    "",
    "всего",
    "в срок",
    "опоздания",
    "всего",
    "в срок",
    "опоздания",
    "всего",
    "в срок",
    "опоздания",
  ]);

  // Add content rows
  content.forEach((item) => {
    wsData.push([
      ships.find((s) => s.number == item.ship).name,
      item.arrive.total + item.sail.total,
      item.arrive.inTime + item.sail.inTime,
      item.arrive.late + item.sail.late,
      item.arrive.total,
      item.arrive.inTime,
      item.arrive.late,
      item.sail.total,
      item.sail.inTime,
      item.sail.late,
    ]);

    // Add ratio row
    const totalPoints = item.arrive.total + item.sail.total;
    const inTimePoints = item.arrive.inTime + item.sail.inTime;
    const arriveRatio =
      item.arrive.total > 0
        ? (item.arrive.inTime / item.arrive.total).toFixed(2)
        : "0.00";
    const sailRatio =
      item.sail.total > 0
        ? (item.sail.inTime / item.sail.total).toFixed(2)
        : "0.00";
    const totalRatio =
      totalPoints > 0 ? (inTimePoints / totalPoints).toFixed(2) : "0.00";

    wsData.push([
      "",
      totalRatio,
      "",
      "",
      arriveRatio,
      "",
      "",
      sailRatio,
      "",
      "",
    ]);
  });
};

// Helper function to add travel table
const addTravelTable = (wsData, content) => {
  // Add headers
  wsData.push([
    "Судно",
    "Отставание",
    "",
    "",
    "",
    "",
    "",
    "Опережение",
    "",
    "",
    "",
    "",
  ]);
  wsData.push([
    "",
    "Прибытие в порт",
    "",
    "",
    "Уход в рейс",
    "",
    "",
    "Прибытие в порт",
    "",
    "",
    "Уход в рейс",
    "",
  ]);
  wsData.push([
    "",
    "мин.",
    "средн.",
    "макс.",
    "мин.",
    "средн.",
    "макс.",
    "мин.",
    "средн.",
    "макс.",
    "мин.",
    "средн.",
    "макс.",
  ]);

  // Add content rows
  content.forEach((item) => {
    wsData.push([
      ships.find((s) => s.number == item.ship).name,
      item.lag.arrive.min,
      item.lag.arrive.avg,
      item.lag.arrive.max,
      item.lag.sail.min,
      item.lag.sail.avg,
      item.lag.sail.max,
      item.lead.arrive.min,
      item.lead.arrive.avg,
      item.lead.arrive.max,
      item.lead.sail.min,
      item.lead.sail.avg,
      item.lead.sail.max,
    ]);
  });
};

// Helper function to add port table
const addPortTable = (wsData, content) => {
  // Add headers
  wsData.push(["Судно", "Запланированное", "", "", "Фактическое", "", ""]);
  wsData.push(["", "мин.", "средн.", "макс.", "мин.", "средн.", "макс."]);

  // Add content rows
  content.forEach((item) => {
    wsData.push([
      ships.find((s) => s.number == item.ship).name,
      item.planned.min,
      item.planned.avg,
      item.planned.max,
      item.real.min,
      item.real.avg,
      item.real.max,
    ]);
  });
};

const ships = [
  {
    number: 1,
    name: 'а\\л "Ямал"',
  },
  {
    number: 2,
    name: 'а\\л "50 лет Победы"',
  },
  {
    number: 3,
    name: 'а\\л "Таймыр"',
  },
  {
    number: 4,
    name: 'а\\л "Вайгач"',
  },
  {
    number: 5,
    name: 'СУАЛ "Арктика"',
  },
  {
    number: 6,
    name: 'СУАЛ "Сибирь"',
  },
  {
    number: 7,
    name: 'СУАЛ "Урал"',
  },
  {
    number: 8,
    name: 'а\\л-к "Севморпуть"',
  },
  {
    number: 9,
    name: 'а.т.о. "Имандра"',
  },
  {
    number: 10,
    name: 'а.т.о. "Лотта"',
  },
  {
    number: 11,
    name: 'с-т "Серебрянка"',
  },
  {
    number: 12,
    name: 'к-в "Россита"',
  },
];
const ports = [
  {
    name: "МУР",
    number: 1,
  },
  {
    name: "СПб",
    number: 2,
  },
];

export default generateExcelFile;
