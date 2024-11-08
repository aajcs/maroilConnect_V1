import {useState} from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {
  CircularProgressBar,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {format} from 'date-fns';
import Collapsible from 'react-native-collapsible';
import {MyIcon} from '../iu/MyIcon';
import {getRelativeTimeEspecifico} from '../../utils/timeUtil';
import {useConfigStore} from '../../store/iu/useConfigStore';

interface CardPoliticasUsoProps {
  data: any;
  title: {title1: string; title2: string};
}

export const CardPoliticasUso = ({data, title}: CardPoliticasUsoProps) => {
  const {checked} = useConfigStore();

  const [visible, setVisible] = useState(true);
  const [collapsedStates, setCollapsedStates] = useState<
    Record<number, boolean>
  >(data.reduce((obj, item) => ({...obj, [item.id]: true}), {}));
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const toggleCollapse = (id: number) => {
    setCollapsedStates(prevState => ({...prevState, [id]: !prevState[id]}));
  };

  return (
    <Layout
      style={[
        styles.card,
        {
          backgroundColor: theme['background-basic-color-1'],
          shadowColor: checked ? '#fff' : '#000',
        },
      ]}>
      <Layout style={styles.header}>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Layout style={styles.row}>
            <Text
              category="h4"
              style={{color: theme['color-primary-default']}}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {title.title1}
            </Text>
            <MyIcon
              name={visible ? 'chevron-down' : 'chevron-up'}
              width={35}
              height={35}
              color={theme['color-primary-default']}
            />
          </Layout>
          <Text category="p1"> {title.title2}</Text>
        </TouchableOpacity>
      </Layout>
      <Collapsible collapsed={visible}>
        {data.map((item: any) => (
          <Layout style={styles.section} key={item.id}>
            <TouchableOpacity onPress={() => toggleCollapse(item.id)}>
              <Layout style={styles.row}>
                <Text category="h6">{item.title}</Text>
                <MyIcon
                  name={
                    collapsedStates[item.id] ? 'chevron-down' : 'chevron-up'
                  }
                  width={35}
                  height={35}
                  color={theme['color-primary-default']}
                />
              </Layout>
            </TouchableOpacity>
            <Collapsible collapsed={collapsedStates[item.id]}>
              <Text category="p1">{item.content}</Text>
            </Collapsible>
          </Layout>
        ))}
      </Collapsible>
    </Layout>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    margin: 10,
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  section: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
