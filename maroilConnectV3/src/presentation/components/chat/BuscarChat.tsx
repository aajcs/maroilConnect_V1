import {createFilter} from 'react-search-input';
import {Input, Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {Usuario} from '../../../domain/entities/usuario';
import {Chat} from '../../../domain/entities/chat';

interface SearchProps {
  data: (Usuario[] | Chat)[];

  setData: (data: (Usuario | Chat)[]) => void;
}
const KEYS_TO_FILTERS = [
  'correo',
  'nombre',
  'lastname',
  'participanteOne.correo',
  'participanteOne.nombre',
  'participanteOne.lastname',
  'participanteTwo.correo',
  'participanteTwo.nombre',
  'participanteTwo.lastname',
];

export function BuscarChat({data, setData}: SearchProps) {
  const onSearch = (text: string) => {
    const resultSearch = data.filter(createFilter(text, KEYS_TO_FILTERS));
    setData(resultSearch as (Usuario | Chat)[]);
  };

  return (
    <Layout style={styles.content}>
      <Input
        placeholder="Buscar"
        // variant="unstyled"
        style={styles.input}
        onChangeText={onSearch}
        // height={30}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    width: 'auto',
  },
  input: {
    // backgroundColor: '#29292b',
    // color: '#fff',
    fontSize: 26,
    borderRadius: 10,
  },
});
