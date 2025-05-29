import { createContext, useContext } from "react";

const SelectContext = createContext();

export const SelectProvider = ({ children }) => {
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
    ,
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

  return (
    <SelectContext.Provider
      value={{
        ships,
        ports,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a SelectContext");
  }
  return context;
};
