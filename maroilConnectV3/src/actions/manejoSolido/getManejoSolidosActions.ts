import {maroilApi} from '../../config/api/maroilApi';
import {ManejoSolidoInterface} from '../../infrastructure/interfaces/manejoSolidoInterface';
import {ManejoSolidoMapper} from '../../infrastructure/mappers/manejoSolido.mapper';

export const getManejoSolidosActions = async () => {
  try {
    const {data} = await maroilApi.get<ManejoSolidoInterface[]>('/barco');

    const barcos = data.map(barco =>
      ManejoSolidoMapper.manejoSolidoToEntity(barco),
    );
    const barocosFiltered = barcos.filter(
      barco =>
        barco.estatusBarco === 'OPERATIVO' &&
        barco.reporteCargaGOM.length !== 0, // Fix: Access the 'reporteCargaGOM' property on each 'barco' object
    );
    return barocosFiltered;
  } catch (error) {
    console.log(error);
    return null;
  }
};
