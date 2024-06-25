import {StackScreenProps} from '@react-navigation/stack';
import {PostForm} from '../components/posts/PostForm';
import {useQuery} from '@tanstack/react-query';
import {getPost} from '../../actions/posts/getPostActinon';
import {FullScreenLoader} from '../components/iu/FullScreenLoader';
import {useRef} from 'react';
import {RootStackParams2} from '../navigations/MenuStackPostNavigation';

interface Props extends StackScreenProps<RootStackParams2, 'PublicarScreen'> {}

export const PublicarScreen = ({route}: Props) => {
  const postIdRef = useRef(route.params?.postId);
  const {data: post} = useQuery({
    queryKey: ['post', postIdRef],
    queryFn: () => getPost(postIdRef.current),
  });

  console.log('postIdRef', postIdRef);

  if (!post) {
    return <FullScreenLoader />;
  }

  return <PostForm post={post} postIdRef={postIdRef} />;
};
