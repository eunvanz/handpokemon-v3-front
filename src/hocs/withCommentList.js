import React from 'react';
import { compose } from 'redux';
import CommentList from '../components/CommentList';
import withUser from './withUser';
import withUserModal from './withUserModal';
import withForm from './withForm';
import {
  postComment,
  putComment,
  deleteCommentById
} from '../api/requestComment';
import withList from './withList';

// parent { key: 'workshopId', id: 12 } 와 같은 형태
export default ({ key, parent, request }) => ComposedComponent => {
  class withCommentList extends React.PureComponent {
    _fetchCommentList = () => {
      const { listActions } = this.props;
      listActions.fetchAndAppendList({
        key,
        request,
        reset: true
      });
    };

    _renderCommentList = () => {
      const { user, showUserModal, form, listActions } = this.props;
      return (
        <CommentList
          comments={this.props[key].content}
          user={user}
          onClickUser={user => showUserModal(user.id)}
          form={form}
          onEdit={putComment}
          onWrite={postComment}
          onDelete={deleteCommentById}
          parent={parent}
          listKey={key}
          listActions={listActions}
        />
      );
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          commentListActions={{
            fetchCommentList: this._fetchCommentList,
            renderCommentList: this._renderCommentList
          }}
        />
      );
    }
  }

  return compose(
    withUser(),
    withUserModal,
    withForm(),
    withList([
      {
        key
      }
    ])
  )(withCommentList);
};
