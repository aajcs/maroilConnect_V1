import {Layout, List, ListItem} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';

interface Props {
  post: Post;
}

const PostCommentsOne = ({post}: Props) => {
  const renderComment = ({item, index}) => (
    <ListItem
      title={item.authorComment.nombre}
      description={item.contentComment}
    />
  );

  const lastComment = post.commentsPost.slice(-1);

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
