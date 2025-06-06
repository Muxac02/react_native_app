import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import { Alert } from "react-native";

// Основная функция для выбора и проверки файла
export const selectAndValidateExcelFile = async () => {
  try {
    // 1. Выбор файла пользователем
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      copyToCacheDirectory: true,
    });
    if (!result.assets[0].uri) {
      throw new Error("Файл не выбран");
    }

    // 2. Чтение файла
    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const workbook = XLSX.read(base64, { type: "base64" });

    // 3. Проверка структуры
    const validationResult = validateExcelData(workbook);

    if (!validationResult.isValid) {
      throw new Error(validationResult.message);
    }

    // 4. Если проверка пройдена - обработка данных
    const processedData = processValidData(workbook);

    return {
      success: true,
      data: processedData,
      fileUri: result.assets[0].uri,
    };
  } catch (error) {
    Alert.alert("Ошибка", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Функция валидации данных Excel
const validateExcelData = (workbook) => {
  // Проверяем наличие хотя бы одного листа
  if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
    return {
      isValid: false,
      message: "Файл не содержит ни одного листа",
    };
  }

  // Берем первый лист
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Проверяем, что есть данные (хотя бы 1 строка кроме заголовков)
  if (data.length < 2) {
    return {
      isValid: false,
      message: "Файл не содержит данных",
    };
  }

  // Проверяем каждую строку (начиная со второй, если первая - заголовки)
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const rowNumber = i + 1;
    // Проверка колонки 1: целое число [1-12]
    if (!isValidInteger(row[0], 1, 12) || !Number.isInteger(Number(row[0]))) {
      return {
        isValid: false,
        message: `Строка ${rowNumber}: Колонка A должна содержать целое число от 1 до 12`,
      };
    }

    // Проверка колонки 2: целое число [1-2]
    if (!isValidInteger(row[1], 1, 2) || !Number.isInteger(Number(row[1]))) {
      return {
        isValid: false,
        message: `Строка ${rowNumber}: Колонка B должна содержать целое число 1 или 2`,
      };
    }

    // Проверка колонки 3: валидная дата (не пустая)
    if (!isValidDate(row[2])) {
      return {
        isValid: false,
        message: `Строка ${rowNumber}: Колонка C должна содержать валидную дату`,
      };
    }

    // Проверка колонки 4: валидная дата (не пустая) >= даты из колонки 3
    if (!isValidDate(row[3])) {
      return {
        isValid: false,
        message: `Строка ${rowNumber}: Колонка D должна содержать валидную дату`,
      };
    }

    const date3 = parseDate(row[2]);
    const date4 = parseDate(row[3]);

    if (date4 < date3) {
      return {
        isValid: false,
        message: `Строка ${rowNumber}: Дата в колонке D должна быть больше или равна дате в колонке C`,
      };
    }

    // Проверка колонки 5: валидная дата (может быть пустой)
    if (row[4] !== undefined && row[4] !== "" && !isValidDate(row[4])) {
      return {
        isValid: false,
        message: `Строка ${rowNumber}: Колонка E должна содержать валидную дату или быть пустой`,
      };
    }

    // Проверка колонки 6: если не пустая - валидная дата >= даты из колонки 5
    if (row[5] !== undefined && row[5] !== "") {
      if (!isValidDate(row[5])) {
        return {
          isValid: false,
          message: `Строка ${rowNumber}: Колонка F должна содержать валидную дату или быть пустой`,
        };
      }

      if (row[4] && row[4] !== "") {
        const date5 = parseDate(row[4]);
        const date6 = parseDate(row[5]);

        if (date6 < date5) {
          return {
            isValid: false,
            message: `Строка ${rowNumber}: Дата в колонке F должна быть больше или равна дате в колонке E`,
          };
        }
      }
    }

    // Колонка 7: любая строка или пустая - не требует проверки
  }

  return {
    isValid: true,
    message: "Файл соответствует требуемой структуре",
  };
};

// Обработка данных после успешной валидации
const processValidData = (workbook) => {
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Пропускаем заголовок (если есть)
  const rows = data.length > 1 ? data.slice(0) : [];

  return rows.map((row) => ({
    ship: row[0],
    port: row[1],
    arrive_date: row[2] ? parseDate(row[2]) : null,
    sail_date: row[3] ? parseDate(row[3]) : null,
    arrive_date_real: row[4] ? parseDate(row[4]) : null,
    sail_date_real: row[5] ? parseDate(row[5]) : null,
    comment: row[6] || "",
  }));
};

// Вспомогательные функции для валидации
const isValidInteger = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

const isValidDate = (dateString) => {
  if (!dateString) return false;
  return !isNaN(parseDate(dateString).getTime());
};

const parseDate = (dateString) => {
  // Пытаемся разобрать дату в разных форматах
  const formats = [
    "yyyy-MM-dd HH:mm:ss",
    "dd.MM.yyyy HH:mm:ss",
    "MM/dd/yyyy HH:mm:ss",
    "yyyy-MM-dd",
    "dd.MM.yyyy",
    "MM/dd/yyyy",
  ];

  for (const format of formats) {
    const date = tryParseDate(dateString, format);
    if (date) return date;
  }

  return new Date(dateString); // Последняя попытка
};

const tryParseDate = (dateString, format) => {
  // Простая реализация парсинга для разных форматов
  const parts = format.split(/[-\s\/.:]/);
  const values = String(dateString).split(/[-\s\/.:]/);

  if (parts.length !== values.length) return null;

  const dateParts = {};
  for (let i = 0; i < parts.length; i++) {
    dateParts[parts[i]] = parseInt(values[i], 10);
  }

  if (dateParts.yyyy && dateParts.MM && dateParts.dd) {
    return new Date(
      dateParts.yyyy,
      dateParts.MM - 1,
      dateParts.dd,
      dateParts.HH || 0,
      dateParts.mm || 0,
      dateParts.ss || 0
    );
  }

  return null;
};
