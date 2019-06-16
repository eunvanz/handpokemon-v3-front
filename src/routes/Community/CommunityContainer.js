import React, { PureComponent } from 'react';
import { compose } from 'redux';

import CommunityView from './CommunityView';
import withUser from '../../hocs/withUser';
import withForm from '../../hocs/withForm';
import {
  postArticle,
  getArticlesByCategoryCd,
  increaseArticleViewsById,
  putArticle,
  deleteArticleById
} from '../../api/requestArticle';
import { ARTICLE_TYPE } from '../../constants/codes';
import withList from '../../hocs/withList';
import SpinContainer from '../../components/SpinContainer';
import MessageModal from '../../components/MessageMoal/index';
import withUserModal from '../../hocs/withUserModal';
import { postLike, deleteLikeById } from '../../api/requestLike';
import {
  postComment,
  putComment,
  deleteCommentById
} from '../../api/requestComment';
import withCodes from '../../hocs/withCodes';

const typeMap = {
  free: ARTICLE_TYPE.FREE,
  notice: ARTICLE_TYPE.NOTICE,
  guide: ARTICLE_TYPE.GUIDE
};
class CommunityContainer extends PureComponent {
  state = {
    loading: true,
    submitting: false,
    loadingMorePage: false,
    refreshing: false
  };

  componentDidMount() {
    this._loadList({ curPage: 1, reset: true }).then(() =>
      this.setState({ loading: false })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this._loadList({ curPage: 1, reset: true });
    }
  }

  _loadList = ({ curPage, reset = false }) => {
    const { listActions, match } = this.props;
    return listActions.fetchAndAppendList({
      key: 'articleList',
      request: () =>
        getArticlesByCategoryCd({
          categoryCd: typeMap[match.params.type],
          curPage,
          perPage: 5
        }),
      reset
    });
  };

  _refresh = () => {
    this.setState({ refreshing: true });
    this._loadList({ curPage: 1, reset: true }).then(() =>
      this.setState({ refreshing: false })
    );
  };

  _loadMorePage = () => {
    const { articleList } = this.props;
    this.setState({ loadingMorePage: true });
    this._loadList({ curPage: articleList.curPage + 1 }).then(() =>
      this.setState({ loadingMorePage: false })
    );
  };

  _handleOnSubmit = async () => {
    try {
      const { form, match, user, history } = this.props;
      if (!user) return history.push('/sign-in');
      form.validateFields(['title', 'content'], async (err, values) => {
        if (!err) {
          this.setState({ submitting: true });
          const categoryCd = typeMap[match.params.type];
          const article = Object.assign({}, values, {
            categoryCd
          });
          await postArticle(article);
          this._loadList({ curPage: 1, reset: true });
          this.setState({ submitting: false });
          MessageModal({
            type: 'success',
            title: '등록완료',
            content: '게시물이 등록되었습니다.'
          });
          return Promise.resolve();
        }
      });
    } catch (error) {
      MessageModal({
        type: 'error',
        content: error
      });
      this.setState({ submitting: false });
      return Promise.reject(error);
    }
  };

  _handleOnEdit = async article => {
    try {
      const { form, listActions } = this.props;
      form.validateFields(['title', 'content'], async (err, values) => {
        try {
          if (!err) {
            this.setState({ submitting: true });
            const newArticle = Object.assign({}, article, values);
            await putArticle(newArticle);
            listActions.replaceItem({
              key: 'articleList',
              conditionKey: 'id',
              value: article.id,
              item: newArticle
            });
            this.setState({ submitting: false });
            MessageModal({
              type: 'success',
              title: '수정완료',
              content: '게시물이 수정되었습니다.'
            });
            return Promise.resolve();
          }
        } catch (error) {
          console.log('error', error);
          throw new Error(error);
        }
      });
    } catch (error) {
      MessageModal({
        type: 'error',
        content: error
      });
      this.setState({ submitting: false });
      return Promise.reject(error);
    }
  };

  _handleOnDelete = article => {
    return deleteArticleById(article.id);
  };

  _handleOnIncrementViews = article => {
    increaseArticleViewsById(article.id);
  };

  _handleOnReplaceItem = item => {
    const { listActions } = this.props;
    listActions.replaceItem({
      key: 'articleList',
      conditionKey: 'id',
      value: item.id,
      item
    });
  };

  _handleOnRemoveItem = item => {
    const { listActions } = this.props;
    listActions.removeItem({
      key: 'articleList',
      conditionKey: 'id',
      value: item.id
    });
  };

  _handleOnClickLike = ({ article, user }) => {
    const userLike = article.likes.filter(like => like.userId === user.id)[0];
    if (!userLike) {
      return postLike({
        userId: user.id,
        articleId: article.id
      });
    } else {
      return deleteLikeById(userLike.id);
    }
  };

  _handleOnWriteComment = comment => {
    return postComment(comment);
  };

  _handleOnEditComment = comment => {
    return putComment(comment);
  };

  _handleOnDeleteComment = commentId => {
    return deleteCommentById(commentId);
  };

  render() {
    const { match } = this.props;
    if (this.state.loading) return <SpinContainer />;
    return (
      <CommunityView
        {...this.props}
        submitting={this.state.submitting}
        onSubmit={this._handleOnSubmit}
        onIncrementViews={this._handleOnIncrementViews}
        onReplaceItem={this._handleOnReplaceItem}
        onClickLike={this._handleOnClickLike}
        onWriteComment={this._handleOnWriteComment}
        onEditComment={this._handleOnEditComment}
        onDeleteComment={this._handleOnDeleteComment}
        categoryCd={typeMap[match.params.type]}
        loadMorePage={this._loadMorePage}
        loadingMorePage={this.state.loadingMorePage}
        refresh={this._refresh}
        refreshing={this.state.refreshing}
        onEdit={this._handleOnEdit}
        onDelete={this._handleOnDelete}
        onRemoveItem={this._handleOnRemoveItem}
      />
    );
  }
}

const wrappedCommunityView = compose(
  withUser(),
  withForm,
  withList([
    {
      key: 'articleList'
    }
  ]),
  withUserModal,
  withCodes
)(CommunityContainer);

export default wrappedCommunityView;
