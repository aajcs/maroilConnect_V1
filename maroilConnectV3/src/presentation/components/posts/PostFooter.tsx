import {useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {Post} from '../../../domain/entities/post';
import {PostStats} from './PostStats';
import {UseMutationResult} from '@tanstack/react-query';
import PostCommentsOne from './PostCommentsOne';

interface Props {
  post: Post;
  mutationView: UseMutationResult<Post, Error, Post, unknown>;
  borrador: boolean;
}

export const PostFooter = ({post, mutationView, borrador}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisibleComentarios, setModalVisibleComentarios] = useState(false);
  const shouldTruncate = post.contentPost.length > 100;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    mutationView.mutate(post);
  };

  return (
    <Layout style={{padding: 10}}>
      <Text category="h5">{post.titlePost}</Text>
      {shouldTruncate ? (
        !isExpanded ? (
          <Text category="s1" numberOfLines={2}>
            {post.contentPost.slice(0, 90)}...{' '}
            <Text onPress={toggleExpanded} status="info">
              Ver más
            </Text>
          </Text>
        ) : (
          <Text category="s1">
            {post.contentPost}{' '}
            <Text onPress={toggleExpanded} status="info">
              Ver menos
            </Text>
          </Text>
        )
      ) : (
        <Text category="s1">{post.contentPost}</Text>
      )}
      {!borrador && (
        <>
          <PostStats
            post={post}
            mutationView={mutationView}
            modalVisibleComentarios={modalVisibleComentarios}
            setModalVisibleComentarios={setModalVisibleComentarios}
          />
          <PostCommentsOne
            post={post}
            setModalVisibleComentarios={setModalVisibleComentarios}
          />
        </>
      )}
    </Layout>
  );
};
