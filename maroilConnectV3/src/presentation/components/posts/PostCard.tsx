// PostCard.tsx
import {memo} from 'react';
import {Post} from '../../../domain/entities/post';
import {PostHeader} from './PostHeader';
import {PostBody} from './PostBody';
import {PostFooter} from './PostFooter';
import {Layout} from '@ui-kitten/components';
import {StyleSheet, useColorScheme} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateCreateViewAction} from '../../../actions/view/updateCreateViewAction';

interface Props {
  post: Post;
  onEdit?: () => void;
  onDelete?: () => void;
  index: string;
  viewableItems: string[];
  borrador: boolean;
}

export const PostCard = memo(
  ({post, onEdit, onDelete, index, viewableItems, borrador}: Props) => {
    const isViewable = viewableItems.includes(index.toString());

    const colorScheme = useColorScheme();
    const queryClient = useQueryClient();
    const mutationView = useMutation({
      mutationFn: async (data: Post) => {
        await updateCreateViewAction({...data, id: post.id});
        return data;
      },

      onSuccess: (data: Post) => {
        if (data) {
          queryClient.invalidateQueries({queryKey: ['posts', 'infinite']});
          queryClient.invalidateQueries({queryKey: ['postsUser', 'infinite']});
        }
      },
    });

    return (
      <Layout
        style={[
          styles.container,
          {shadowColor: colorScheme !== 'dark' ? '#000' : '#fff'},
        ]}>
        <PostHeader post={post} onEdit={onEdit} onDelete={onDelete} />
        <PostBody
          post={post}
          mutationView={mutationView}
          isViewable={isViewable}
        />

        <PostFooter
          post={post}
          mutationView={mutationView}
          borrador={borrador}
        />
      </Layout>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    padding: 0,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
