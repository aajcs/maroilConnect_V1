export interface ManejoSolido {
  volumetriaId: any[];
  nombreBarco: string;
  descripcion: string;
  toneladasCapacidad: number;
  toneladasNominadas: number;
  toneladasActual: number;
  totalGabarras: number;
  cantidadBodegas: number;
  cantidadGruas: number;
  fechaAtraco: Date;
  fechaInicioCarga: Date;
  fechaFinalCarga: Date;
  estatusBarco: string;
  reporteCarga: any[];
  reporteCargaGOM: ReporteCargaGOM[];
  cargaBodega: CargaBodega[];
  barcoCreado: Date;
  barcoModificado: Date;
  createdAt: Date;
  updatedAt: Date;
  buqueCliente: string;
  buquePaisDestino: string;
  blFinalBuque: number;
  costoDemora: number;
  tiempoDemora: number;
  buqueClienteVenta: string;
  id: string;
}

export interface CargaBodega {
  barcoID: string;
  nombreBodega: string;
  toneladasCargadasBodega: number;
  toneladasCapacidadBodega: number;
  estatusBodega: string;
  cargaBodegaCreado: Date;
  cargaBodegaModificado: Date;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface ReporteCargaGOM {
  barcoID: string;
  ubicacionBuque: string;
  toneladasCargadasGOM: number;
  etc: string;
  comentariosGOM: string;
  observacionesGOM: string;
  reporteCargaGOMCreado: Date;
  reporteCargaGOMModificado: Date;
  createdAt: Date;
  updatedAt: Date;
  tasaDeCargaGOM: number;
  puestoTerminal: string;
  id: string;
  climaGOM: string;
  vientoGOM: string;
}
