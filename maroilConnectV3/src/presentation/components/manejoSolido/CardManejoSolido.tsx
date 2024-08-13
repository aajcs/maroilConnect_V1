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
import {ManejoSolido} from '../../../domain/entities/manejoSolido';

interface CardManejoSolidoProps {
  data: ManejoSolido;
}

export const CardManejoSolido = ({data}: CardManejoSolidoProps) => {
  const [isCollapsedGeneral, setIsCollapsedGeneral] = useState(true);
  const [isCollapsedCarga, setIsCollapsedCarga] = useState(true);
  const [isCollapsedGom, setIsCollapsedGom] = useState(false);

  const ultimoRegistro = data.reporteCargaGOM.length - 1;
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const formatNumber = (number: number) => {
    return Number(number).toLocaleString('de-DE');
  };

  return (
    <Layout
      style={[
        styles.card,
        {
          backgroundColor: theme['background-basic-color-1'],
          shadowColor: colorScheme !== 'dark' ? '#000' : '#fff',
        },
      ]}>
      <Layout style={styles.header}>
        <Text category="h1" style={{color: theme['color-primary-default']}}>
          {data.nombreBarco}
        </Text>
        <Text category="p1">
          ({data.buqueCliente})-({data.buqueClienteVenta})
        </Text>
        <Text category="p1">
          Act:{' '}
          {format(
            data.reporteCargaGOM[ultimoRegistro].updatedAt,
            'dd/MM HH:mm',
          )}
        </Text>
      </Layout>

      <Layout style={styles.section}>
        <TouchableOpacity
          onPress={() => setIsCollapsedGeneral(!isCollapsedGeneral)}>
          <Layout style={styles.row}>
            <Text category="h6">Información General</Text>
            <MyIcon
              name={isCollapsedGeneral ? 'chevron-down' : 'chevron-up'}
              // size={20}
              width={35}
              height={35}
              color={theme['color-primary-default']}
            />
          </Layout>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsedGeneral}>
          <Layout style={styles.row}>
            <Text category="p1">Fecha de Atraco:</Text>
            <Text category="p1">
              {data.fechaAtraco ? formatDate(data.fechaAtraco) : 'Sin Fecha'}
            </Text>
          </Layout>
          <Layout style={styles.row}>
            <Text category="p1">Fecha de Incio carga:</Text>
            <Text category="p1">
              {data.fechaInicioCarga
                ? formatDate(data.fechaInicioCarga)
                : 'Sin Fecha'}
            </Text>
          </Layout>
          <Layout style={styles.row}>
            <Text category="p1">Fecha de Fin de Carga:</Text>
            <Text category="p1">
              {data.fechaFinalCarga
                ? formatDate(data.fechaFinalCarga)
                : 'Sin Fecha'}
            </Text>
          </Layout>
        </Collapsible>
        {/* ... other general information */}
      </Layout>
      <Layout style={styles.section}>
        <TouchableOpacity
          onPress={() => setIsCollapsedCarga(!isCollapsedCarga)}>
          <Layout style={styles.row}>
            <Text category="h6">Carga</Text>
            <MyIcon
              name={isCollapsedCarga ? 'chevron-down' : 'chevron-up'}
              // size={20}
              width={35}
              height={35}
              color={theme['color-primary-default']}
            />
          </Layout>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsedCarga}>
          <Layout style={styles.row}>
            <Text category="p1">Cantidad Nominada:</Text>
            <Text category="p1">
              {data.toneladasCapacidad
                ? `${formatNumber(data.toneladasCapacidad)} Tm`
                : 'Sin Cantidad'}
            </Text>
          </Layout>
          <Layout style={styles.row}>
            <Text category="p1">Cantidad Requerida:</Text>
            <Text category="p1">
              {data.toneladasNominadas
                ? `${formatNumber(data.toneladasNominadas)} Tm`
                : 'Sin Cantidad'}
            </Text>
          </Layout>
          <Layout style={styles.row}>
            <Text category="p1">Cantidad Cargada:</Text>
            <Text category="p1">
              {data.reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM
                ? `${formatNumber(
                    data.reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM,
                  )} Tm`
                : 'Sin Cantidad'}
            </Text>
          </Layout>
          <Layout style={styles.row}>
            <Text category="p1">Cantidad Por Cargar:</Text>
            <Text category="p1">
              {data.toneladasNominadas -
              data.reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM
                ? `${formatNumber(
                    data.toneladasNominadas -
                      data.reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM,
                  )} Tm`
                : 'Sin Cantidad'}
            </Text>
          </Layout>
          {/* ... other cargo information */}
        </Collapsible>
      </Layout>
      <Layout style={styles.section}>
        <TouchableOpacity onPress={() => setIsCollapsedGom(!isCollapsedGom)}>
          <Layout style={styles.row}>
            <Text category="h6">Reporte GOM</Text>

            <MyIcon
              name={isCollapsedGom ? 'chevron-down' : 'chevron-up'}
              // size={20}
              width={35}
              height={35}
              color={theme['color-primary-default']}
            />
          </Layout>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsedGom}>
          <Layout style={styles.row}>
            <Text category="p1">Ubicacion:</Text>
            <Text category="p1">
              {data.reporteCargaGOM[ultimoRegistro].ubicacionBuque}
            </Text>
          </Layout>
          {data.reporteCargaGOM[ultimoRegistro].puestoTerminal && (
            <Layout style={styles.row}>
              <Text category="p1">Terminal:</Text>
              <Text category="p1">
                {data.reporteCargaGOM[ultimoRegistro].puestoTerminal}
              </Text>
            </Layout>
          )}

          <Layout style={styles.row}>
            <Text category="p1">Tasa de Carga:</Text>
            <Text category="p1">
              {data.reporteCargaGOM[ultimoRegistro].tasaDeCargaGOM
                ? `${data.reporteCargaGOM[ultimoRegistro].tasaDeCargaGOM} Tm/h`
                : 'Sin Fecha'}
            </Text>
          </Layout>
          <Layout style={styles.row}>
            <Text category="p1">Clima:</Text>
            <Text category="p1">
              {data.reporteCargaGOM[ultimoRegistro].climaGOM}
            </Text>
          </Layout>
          <Layout style={styles.row}>
            <Text category="p1">Viento:</Text>
            <Text category="p1">
              {data.reporteCargaGOM[ultimoRegistro].vientoGOM} Nudos
            </Text>
          </Layout>
          <Text category="p1">
            Comentario:
            {data.reporteCargaGOM[ultimoRegistro].comentariosGOM ||
              'Sin Cantidad'}
          </Text>
        </Collapsible>
      </Layout>
      <Layout style={(styles.footer, styles.card)} level="4">
        <Layout style={styles.row} level="4">
          <CircularProgressBar
            progress={
              (1 * data.reporteCargaGOM[ultimoRegistro].toneladasCargadasGOM) /
                data.toneladasNominadas || 0
            }
            size="medium"
          />
          <Text category="p1" style={{alignItems: 'center'}}>
            Tiempo de carga:
            {getRelativeTimeEspecifico(
              data.fechaInicioCarga,
              data.fechaFinalCarga,
            )}
          </Text>
        </Layout>

        {/* ... other footer information */}
      </Layout>
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
    alignItems: 'center',
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
