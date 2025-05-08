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
import { ChevronDownIcon } from "@/components/ui/icon";
import { ChevronUpIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function RecordSearchDrawer(props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    ship: "",
    port: "",
    arrive_date_start: "",
    arrive_date_end: "",
    sail_date_start: "",
    sail_date_end: "",
    archived: false,
  });
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
        onPress={() => {
          setOpen(true);
        }}
      >
        <Image source={require(`../assets/omni.jpg`)} style={styles.icon} />
      </TouchableHighlight>
      <Drawer
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        size="lg"
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
                setSearchParams({ ...searchParams, ship: val });
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
            <Accordion
              size="lg"
              variant="filled"
              type="multiple"
              isCollapsible={true}
              isDisabled={false}
              className="mt-2"
            >
              <AccordionItem value="a">
                <AccordionHeader>
                  <AccordionTrigger className="p-0 pb-2">
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
                <AccordionContent className="p-0"></AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText>
                            What payment methods do you accept?
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
                <AccordionContent>
                  <AccordionContentText>
                    We accept all major credit cards, including Visa,
                    Mastercard, and American Express. We also support payments
                    through PayPal.
                  </AccordionContentText>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
          <DrawerFooter>
            <TouchableHighlight
              onPress={() => {
                setOpen(false);
              }}
            >
              <Text>Hello</Text>
            </TouchableHighlight>
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
