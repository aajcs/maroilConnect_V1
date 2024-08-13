import {ManejoSolido} from '../../domain/entities/manejoSolido';
import {ManejoSolidoInterface} from '../interfaces/manejoSolidoInterface';

export class ManejoSolidoMapper {
  static manejoSolidoToEntity(
    manejoSolido: ManejoSolidoInterface,
  ): ManejoSolido {
    return {
      volumetriaId: manejoSolido.volumetriaId,
      nombreBarco: manejoSolido.nombreBarco,
      descripcion: manejoSolido.descripcion,
      toneladasCapacidad: manejoSolido.toneladasCapacidad,
      toneladasNominadas: manejoSolido.toneladasNominadas,
      toneladasActual: manejoSolido.toneladasActual,
      totalGabarras: manejoSolido.totalGabarras,
      cantidadBodegas: manejoSolido.cantidadBodegas,
      cantidadGruas: manejoSolido.cantidadGruas,
      fechaAtraco: manejoSolido.fechaAtraco,
      fechaInicioCarga: manejoSolido.fechaInicioCarga,
      fechaFinalCarga: manejoSolido.fechaFinalCarga,
      estatusBarco: manejoSolido.estatusBarco,
      reporteCarga: manejoSolido.reporteCarga,
      reporteCargaGOM: manejoSolido.reporteCargaGOM,
      cargaBodega: manejoSolido.cargaBodega,
      barcoCreado: manejoSolido.barcoCreado,
      barcoModificado: manejoSolido.barcoModificado,
      createdAt: manejoSolido.createdAt,
      updatedAt: manejoSolido.updatedAt,
      buqueCliente: manejoSolido.buqueCliente,
      buquePaisDestino: manejoSolido.buquePaisDestino,
      blFinalBuque: manejoSolido.blFinalBuque,
      costoDemora: manejoSolido.costoDemora,
      tiempoDemora: manejoSolido.tiempoDemora,
      buqueClienteVenta: manejoSolido.buqueClienteVenta,
      id: manejoSolido.id,
    };
  }
}
