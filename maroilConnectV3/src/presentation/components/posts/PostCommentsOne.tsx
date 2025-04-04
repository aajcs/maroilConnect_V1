/* eslint-disable react/no-unstable-nested-components */
import {
  Avatar,
  Button,
  Layout,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {StyleSheet} from 'react-native';
import {getRelativeTime} from '../../utils/timeUtil';
import {AvatarNombre} from '../iu/AvatarNombre';
import {MyIcon} from '../iu/MyIcon';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props {
  post: Post;
  setModalVisibleComentarios: (value: boolean) => void;
}

const PostCommentsOne = ({post, setModalVisibleComentarios}: Props) => {
  const {user} = useAuthStore();
  const deleteComment = () => {
    console.log('deleteComment');
  };
  const renderComment = ({item, index}) => (
    <Layout>
      <ListItem
        onPress={() => setModalVisibleComentarios(true)}
        style={{
          // margin: 5,
          marginVertical: 10,

          backgroundColor: 'rgba(143, 155, 179, 0.34)',
          // maxWidth: '80%',
          borderRadius: 10,
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderBlockEndColor: 'rgba(143, 155, 179, 0.54)',
        }}
        title={() => (
          <Text category="s1" style={{}}>
            {item.authorComment.nombre}
          </Text>
        )}
        description={() => (
          <Text category="c2" style={{fontWeight: '400'}}>
            {item.contentComment}
          </Text>
        )}
        accessoryLeft={() =>
          item.authorComment && <AvatarNombre usuario={item.authorComment} />
        }
        accessoryRight={() => (
          <>
            <Text style={{fontSize: 10, paddingHorizontal: 2}}>
              {item.createdAt && getRelativeTime(item.createdAt.toString())}
            </Text>
            {item.authorComment.id === user?.id ||
            user?.rolesMaroilConnect.some(role =>
              ['administrador', 'superadmin'].includes(role),
            ) ? (
              <Text onPress={deleteComment} status="info">
                <MyIcon name="trash" />
              </Text>
            ) : null}
          </>
        )}
      />
    </Layout>
  );

  const lastComment = post.commentsPost?.slice(0, 1);

  return (
    <Layout style={{}}>
      <List
        data={lastComment}
        renderItem={renderComment}
        keyExtractor={item => item.id.toString()}
      />
    </Layout>
  );
};

export default PostCommentsOne;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // margin: 5,
    // padding: 0,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    paddingHorizontal: 10,
    // marginBottom: 50,
    // paddingBottom: 50,
  },
  avatar: {
    // margin: 8,
    width: 50,
    height: 50,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    // borderBottomColor: '#333',
    paddingVertical: 3,
    alignItems: 'center',
  },
  name: {
    fontWeight: '600',
    // color: '#fff',
    fontSize: 16,
  },
  email: {
    // color: '#fff',
    opacity: 0.6,
    marginTop: 2,
  },
});
