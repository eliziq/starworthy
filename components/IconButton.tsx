import { FC } from "react";
import { Pressable, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  name: any;
  size: number;
  color: string;
  addStyles: ViewStyle;
  pressHandler: () => void;
};

const IconButton: FC<IconButtonProps> = ({
  name,
  size,
  color,
  addStyles,
  pressHandler: pressHandler,
}) => {
  return (
    <Pressable style={addStyles} onPress={pressHandler}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
