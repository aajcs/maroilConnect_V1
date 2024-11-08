import {useInfiniteQuery} from '@tanstack/react-query';
import {Button, Layout} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {getPostsBorrador} from '../../../actions/posts/getPostsActions';

import {useAuthStore} from '../../store/auth/useAuthStore';
import {PostList} from '../posts/PostList';
import {FullScreenLoader} from '../iu/FullScreenLoader';
import {FullScreenAccessDenied} from '../iu/FullScreenAccessDenied';
import {CardPoliticasUso} from './CardPoliticasUso';

interface MyModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}
const policitaUso = [
  {
    id: 1,
    title: 'Respeto y cortesía',
    content:
      'Mantén siempre un tono respetuoso y profesional en tus interacciones en la red social corporativa, evitando comentarios ofensivos o inapropiados.',
  },
  {
    id: 2,
    title: 'Confidencialidad',
    content:
      'No compartas información confidencial de la empresa, sus empleados, clientes o proveedores. Si tienes dudas sobre qué información puedes compartir, consulta con tu superior.',
  },
  {
    id: 3,
    title: 'Uso adecuado',
    content:
      'Utiliza la red social corporativa exclusivamente para asuntos relacionados con el trabajo y la colaboración profesional. Evita publicar contenido irrelevante o personal. Difundir contenidos ilegales, discriminatorios, perjudiciales, fraudulentos, engañosos o difamatorios, o que promuevan o fomenten la violencia, el incumplimiento de la ley, las autolesiones, los trastornos de la alimentación o el abuso de sustancias.',
  },
  {
    id: 4,
    title: 'Colaboración',
    content:
      'Fomenta la colaboración y el intercambio de ideas constructivas entre los miembros de la red social corporativa. Ayuda a mantener un ambiente positivo y productivo.',
  },
  {
    id: 5,
    title: 'Cumplimiento de políticas',
    content:
      'Conoce y respeta las políticas y normativas de la empresa en cuanto al uso de la red social corporativa. Cumple con las directrices establecidas.',
  },
  {
    id: 6,
    title: 'Seguridad informática',
    content:
      'Protege tu cuenta y la información que compartes en la red social corporativa. No compartas contraseñas ni datos sensibles y mantén tus dispositivos seguros.',
  },
  {
    id: 7,
    title: 'Feedback constructivo',
    content:
      'Ofrece feedback de manera constructiva y respetuosa a tus colegas en la red social corporativa. Ayuda a promover un ambiente de aprendizaje y mejora continua.',
  },

  {
    id: 8,
    title: 'Actualización constante',
    content:
      'Mantente informado sobre las novedades y actualizaciones de la red social corporativa. Aprovecha las nuevas funcionalidades para mejorar la comunicación y la colaboración.',
  },
];
const policitaSeguridad = [
  {
    id: 1,
    title: 'Contraseñas seguras',
    content:
      'Utiliza contraseñas fuertes y únicas para acceder a la aplicación. Cambia tus contraseñas con regularidad y evita compartirlas con terceros.',
  },
  {
    id: 2,
    title: 'Actualizaciones',
    content:
      'Mantén la aplicación de red social corporativa siempre actualizada con las últimas versiones de software para garantizar la seguridad y corregir posibles vulnerabilidades.',
  },
  {
    id: 3,
    title: 'Privacidad de la información',
    content:
      'Asegúrate de conocer y configurar adecuadamente las opciones de privacidad de la aplicación, limitando la visibilidad de tu perfil y publicaciones a los usuarios autorizados.',
  },
  {
    id: 4,
    title: 'Acceso restringido',
    content:
      'Solo comparte información sensible o confidencial a través de la red social corporativa con las personas o grupos autorizados. Evita compartir datos sensibles en conversaciones públicas.',
  },
  {
    id: 5,
    title: 'Protección de datos',
    content:
      'Cumple con las políticas de protección de datos de la empresa y asegúrate de mantener la confidencialidad y seguridad de la información que compartes en la aplicación.',
  },
  {
    id: 6,
    title: 'Reporte de incidentes',
    content:
      'Informa de inmediato a los responsables de TI o seguridad de la empresa cualquier incidente de seguridad o sospecha de actividad maliciosa en la aplicación.',
  },
  {
    id: 7,
    title: 'Capacitación y concienciación',
    content:
      'Participa en programas de formación sobre seguridad informática y concienciación sobre la importancia de proteger la información en la red social corporativa.',
  },
];
const policitaLineamientos = [
  {
    id: 1,
    title: 'Loscolores corporativos',
    content:
      'Debenutilizar se en la spublicaciones para crear un sentido de identidad y pertenencia.',
  },
  {
    id: 2,
    title: 'Las publicaciones',
    content:
      'En la app deben ser relevantes para el trabajo o la empresa. No se permiten publicaciones personales o de carácter privado.',
  },

  {
    id: 3,
    title: 'Se encuentra prohibido',
    content: 'Realizar publicaciones con indumentaria de otras empresas.',
  },
  {
    id: 4,
    title: 'Los comentarios',
    content:
      'Deben ser respetuosos y constructivos. No se permiten comentarios ofensivos o discriminatorios.',
  },
  {
    id: 5,
    title: 'No se permite',
    content: 'Difundir publicidad por la aplicación.',
  },
  {
    id: 6,
    title: 'Los departamentos de Imagen y Comunicación y AIT',
    content:
      'Son los responsables de la administración y el funcionamiento de la app.',
  },
  {
    id: 7,
    title: 'Los usuarios son responsables',
    content:
      'Del uso que hagan de la app y su mal utilización será sancionada.',
  },
  {
    id: 8,
    title: 'Estáprohibido publicar mensajes',
    content: 'de carácter sexual, político o religioso',
  },
  {
    id: 9,
    title: 'Cada gerente o representante ',
    content:
      'De gerencia deberá enviar contenido de las actividades realizadas en su área al departamento de comunicaciones, dicha información será compartida semanal o diariamente al departamento de Imagen y Comunicación.',
  },
  {
    id: 10,
    title: 'La información de las actividades',
    content:
      'Deben ser enviadas por el correo electrónico empresarial. En caso de que el correo esté presentado fallas se puede enviar por WhatsApp al número corporativo 0412 907 42 33. Sin embargo, es importante enviar el respaldo al correo.',
  },
];
const policitaUsoTitulo = {
  title1: 'Políticas de manejo',
  title2: 'y buen uso de la aplicación',
};
const policitaSeguridadTitulo = {
  title1: 'Políticas de privacidad',
  title2: 'y seguridad de la aplicación',
};
const policitaLineamientoTitulo = {
  title1: 'Políticas de Lineamientos',
  title2: 'para utilizar la aplicación',
};
export const ModalPoliticasUso: React.FC<MyModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      // Use a timeout to delay the rendering of the content
      const timeoutId = setTimeout(() => {
        setContentVisible(true);
      }, 100); // Adjust the delay as needed

      // Clean up the timeout when the component is unmounted or when 'modalVisible' changes
      return () => clearTimeout(timeoutId);
    } else {
      setContentVisible(false);
    }
  }, [modalVisible]);

  return (
    <Modal visible={modalVisible} animationType="slide">
      <Layout
        style={{
          flex: 1,
        }}>
        {contentVisible && (
          <SafeAreaView style={{flex: 1}}>
            <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
            <Layout
              style={{
                flex: 1,
              }}>
              <ScrollView>
                <CardPoliticasUso
                  data={policitaUso}
                  title={policitaUsoTitulo}
                />
                <CardPoliticasUso
                  data={policitaSeguridad}
                  title={policitaSeguridadTitulo}
                />
                <CardPoliticasUso
                  data={policitaLineamientos}
                  title={policitaLineamientoTitulo}
                />
              </ScrollView>
            </Layout>
          </SafeAreaView>
        )}
      </Layout>
    </Modal>
  );
};
