import {Icon, useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
}

export const MyIcon = ({name, color, white = false}: Props) => {
  const theme = useTheme();

  if (white) {
    color = theme['color-info-100'];
  } else if (!color) {
    color = theme['text-basic-color'];
  } else if (color === 'red') {
    color = theme['color-danger-500'];
  } else if (typeof color === 'string') {
    color = color;
  } else {
    color = theme[color] ?? theme['text-basic-color'];
  }

  return <Icon style={styles.icon} fill={color} name={name} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
});
