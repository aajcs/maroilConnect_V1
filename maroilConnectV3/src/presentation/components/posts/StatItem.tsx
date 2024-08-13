// StatItem.tsx
import {Layout, Text} from '@ui-kitten/components';
import {MyIcon} from '../iu/MyIcon';

interface Props {
  icon?: string;
  count?: number | string;
  onClick?: () => void;
  color?: string;
}

export const StatItem = ({icon, count, onClick, color}: Props) => {
  return (
    <Layout
      style={{flexDirection: 'row', alignItems: 'center'}}
      onTouchEnd={onClick}>
      {icon && <MyIcon name={icon} color={color} />}
      <Text style={{marginHorizontal: 2}} category="s1">
        {count}
      </Text>
    </Layout>
  );
};
