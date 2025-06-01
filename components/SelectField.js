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
import { useState } from "react";

export default function SelectField(props) {
  //const [ship, setShip] = useState("default");
  return (
    <Select
      onValueChange={(val) => {
        props.setItem(val);
      }}
      defaultValue={props.defaultItem ? props.defaultItem : null}
    >
      <SelectTrigger
        variant="underlined"
        size="lg"
        style={{ borderColor: "#fff", padding: 8 }}
      >
        <SelectInput
          placeholder={props.label}
          style={{ fontSize: 16, padding: 0 }}
        />
        <SelectIcon style={{ marginLeft: "auto" }} as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {props.data.map((item) => (
            <SelectItem
              label={item.name}
              value={item.number.toString()}
              key={props.hydr + item.number.toString()}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
