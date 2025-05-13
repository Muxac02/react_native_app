import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { Button, ButtonText } from "@/components/ui/button";
import { ChevronDownIcon } from "@/components/ui/icon";
import { ChevronUpIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { useState } from "react";
import DateTimePicker from "@/components/DateTimePickerForDrawer";
import { Switch } from "@/components/ui/switch";
import { HStack } from "@/components/ui/hstack";
import { Icon, SearchIcon } from "@/components/ui/icon";

export default function RecordSearchDrawer(props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ship, setShip] = useState("default");
  const [port, setPort] = useState("default");
  const [additionalSearchParams, setAdditionalSearchParams] = useState([]);
  const [arriveDateInfo, setArriveDateInfo] = useState({
    start: new Date(),
    end: new Date(),
    startChanged: false,
    endChanged: false,
  });
  const [sailDateInfo, setSailDateInfo] = useState({
    start: new Date(),
    end: new Date(),
    startChanged: false,
    endChanged: false,
  });
  const [archived, setArchived] = useState(false);
  const handleDateInfoChanged = (event, selectedDate) => {
    const currentDate = selectedDate;
    if (event.pos === "start") {
      if (event.type === "set") {
        event.dir === "arrive"
          ? setArriveDateInfo({
              ...arriveDateInfo,
              start: currentDate,
              startChanged: true,
            })
          : setSailDateInfo({
              ...sailDateInfo,
              start: currentDate,
              startChanged: true,
            });
      }
    } else if (event.pos === "end") {
      if (event.type === "set") {
        event.dir === "arrive"
          ? setArriveDateInfo({
              ...arriveDateInfo,
              end: currentDate,
              endChanged: true,
            })
          : setSailDateInfo({
              ...sailDateInfo,
              end: currentDate,
              endChanged: true,
            });
      }
    } else {
      console.error("date time picker diapozon handle changed error");
    }
  };
  const handleDateInfoClear = (dir, pos) => {
    if (dir === "arrive") {
      if (pos === "start") {
        setArriveDateInfo({
          ...arriveDateInfo,
          start: new Date(),
          startChanged: false,
        });
      } else if (pos === "end") {
        setArriveDateInfo({
          ...arriveDateInfo,
          end: new Date(),
          endChanged: false,
        });
      }
    } else if (dir === "sail") {
      if (pos === "start") {
        setSailDateInfo({
          ...sailDateInfo,
          start: new Date(),
          startChanged: false,
        });
      } else if (pos === "end") {
        setSailDateInfo({
          ...sailDateInfo,
          end: new Date(),
          endChanged: false,
        });
      }
    }
    if (pos === "all") {
      dir === "arrive"
        ? setArriveDateInfo({
            start: new Date(),
            end: new Date(),
            startChanged: false,
            endChanged: false,
          })
        : setSailDateInfo({
            start: new Date(),
            end: new Date(),
            startChanged: false,
            endChanged: false,
          });
    }
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
    <View>
      <TouchableHighlight
        style={{ borderRadius: 24 }}
        underlayColor={"rgba(165, 165, 165, 0.4)"}
        onPress={() => {
          setOpen(true);
        }}
      >
        <Icon as={SearchIcon} style={styles.icon} />
      </TouchableHighlight>
      <Drawer
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        size="md"
        anchor="top"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Text style={styles.title}>Поиск записей</Text>
          </DrawerHeader>
          <DrawerBody>
            <Select
              onValueChange={(val) => {
                setShip(val);
              }}
            >
              <SelectTrigger variant="underlined" size="lg">
                <SelectInput
                  placeholder="Судно"
                  style={{ fontSize: 16, padding: 0 }}
                />
                <SelectIcon
                  style={{ marginLeft: "auto" }}
                  as={ChevronDownIcon}
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Судно" value="default" />
                  {ships.map((ship) => (
                    <SelectItem
                      label={ship.name}
                      value={ship.number.toString()}
                      key={"ship_select_item" + ship.number.toString()}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            <Select
              onValueChange={(val) => {
                setPort(val);
              }}
            >
              <SelectTrigger variant="underlined" size="lg">
                <SelectInput
                  placeholder="Порт"
                  style={{ fontSize: 16, padding: 0 }}
                />
                <SelectIcon
                  style={{ marginLeft: "auto" }}
                  as={ChevronDownIcon}
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Порт" value="default" />
                  {ports.map((port) => (
                    <SelectItem
                      label={port.name}
                      value={port.number.toString()}
                      key={"port_select_item" + port.number.toString()}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            <Accordion
              size="lg"
              variant="filled"
              type="multiple"
              isCollapsible={true}
              isDisabled={false}
              className="mt-4 shadow-0"
              onValueChange={(ev) => {
                const diff = additionalSearchParams.filter(
                  (e) => !ev.includes(e)
                );
                if (diff == "arrival_dates") {
                  handleDateInfoClear("arrive", "all");
                } else if (diff == "sail_dates") {
                  handleDateInfoClear("sail", "all");
                }
                setAdditionalSearchParams(ev);
              }}
            >
              <AccordionItem value="arrival_dates">
                <AccordionHeader>
                  <AccordionTrigger className="p-0 pb-3">
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText
                            style={{ fontSize: 18, fontWeight: "400" }}
                          >
                            Промежуток даты прибытия в порт
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronUpIcon} />
                          ) : (
                            <AccordionIcon as={ChevronDownIcon} />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="p-2">
                  <View>
                    <Text style={{ fontSize: 14, paddingLeft: 4 }}>Начало</Text>
                    <DateTimePicker
                      date={arriveDateInfo.start}
                      changed={arriveDateInfo.startChanged}
                      onChange={handleDateInfoChanged}
                      onClear={handleDateInfoClear}
                      dir={"arrive"}
                      pos={"start"}
                    />
                  </View>
                  <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, paddingLeft: 4 }}>Конец</Text>
                    <DateTimePicker
                      date={arriveDateInfo.end}
                      changed={arriveDateInfo.endChanged}
                      onChange={handleDateInfoChanged}
                      onClear={handleDateInfoClear}
                      dir={"arrive"}
                      pos={"end"}
                    />
                  </View>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sail_dates">
                <AccordionHeader>
                  <AccordionTrigger className="p-0 pb-3">
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText
                            style={{ fontSize: 18, fontWeight: "400" }}
                          >
                            Промежуток даты ухода в рейс
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon as={ChevronUpIcon} />
                          ) : (
                            <AccordionIcon as={ChevronDownIcon} />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="p-2">
                  <View>
                    <Text style={{ fontSize: 14, paddingLeft: 4 }}>Начало</Text>
                    <DateTimePicker
                      date={sailDateInfo.start}
                      changed={sailDateInfo.startChanged}
                      onChange={handleDateInfoChanged}
                      onClear={handleDateInfoClear}
                      dir={"sail"}
                      pos={"start"}
                    />
                  </View>
                  <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, paddingLeft: 4 }}>Конец</Text>
                    <DateTimePicker
                      date={sailDateInfo.end}
                      changed={sailDateInfo.endChanged}
                      onChange={handleDateInfoChanged}
                      onClear={handleDateInfoClear}
                      dir={"sail"}
                      pos={"end"}
                    />
                  </View>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <HStack space="md" style={{ alignSelf: "center" }}>
              <Switch
                size="lg"
                isDisabled={false}
                trackColor={{
                  false: "rgba(95, 96, 98, 0.9)",
                  true: "rgba(0, 50, 116, 1)",
                }}
                thumbColor={"#fff"}
                activeThumbColor={"#fff"}
                onValueChange={(val) => {
                  setArchived(val);
                }}
              />
              <Text
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
                Архивные
              </Text>
            </HStack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onPress={() => {
                const data = {
                  ship: ship,
                  port: port,
                  arriveDateInfo: JSON.stringify(arriveDateInfo),
                  sailDateInfo: JSON.stringify(sailDateInfo),
                  archived: archived,
                };
                router.push({
                  pathname: "/search",
                  params: data,
                });
                setOpen(false);
              }}
              style={{ flex: 1, backgroundColor: "#025EA1", borderRadius: 8 }}
            >
              <ButtonText>Поиск</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    margin: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
  },
});
