import {Layout, Text} from '@ui-kitten/components';
import {MyIcon} from './MyIcon';

interface FullScreenContructionProps {
  message: string;
}

export const FullScreenContruction = ({
  message,
}: FullScreenContructionProps) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text category="h1">Acceso denegado</Text>
      <Text category="h6">Esta seccion se encuentra en construcción</Text>

      <MyIcon name="alert-circle-outline" width={50} height={50} />
      <Text
        style={{
          margin: 20,
          textAlign: 'justify',
        }}
        category="p1">
        {message}
      </Text>
    </Layout>
  );
};
