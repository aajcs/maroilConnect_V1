import {Avatar, Text, Layout} from '@ui-kitten/components';
import {getRelativeTime} from '../../utils/timeUtil';
import {Post} from '../../../domain/entities/post';
import {MenuActions} from './MenuActions';

interface Props {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

export const PostHeader = ({post, onEdit, onDelete}: Props) => {
  return (
    <Layout style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
      <Avatar
        source={require('../../../assets/no-product-image.png')}
        style={{marginRight: 10}}
      />
      <Text category="s1">{post.authorPost.nombre}</Text>
      <Layout style={{flex: 1}} />
      <Text category="p2">
        {post.createdAt && getRelativeTime(post.createdAt.toString())}
      </Text>
      <MenuActions onEdit={onEdit} onDelete={onDelete} postId={post.id} />
    </Layout>
  );
};
