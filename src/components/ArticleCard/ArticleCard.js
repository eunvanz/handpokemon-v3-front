import React, { memo, useState, useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/ko';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { COLOR } from '../../constants/styles';
import './ArticleCard.less';
import LikeButton from '../LikeButton/index';
import ArticleCommentList from '../ArticleCommentList';

moment.locale('ko');

const ArticleCard = ({
  article,
  user,
  incrementViews,
  showUserModal,
  onReplaceItem,
  onClickLike,
  form,
  onWriteComment,
  onEditComment,
  onDeleteComment
}) => {
  const [showContent, setShowContent] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleOnClickMore = useCallback(() => {
    if (!showContent) {
      incrementViews(article);
      setShowContent(true);
      const newArticle = Object.assign({}, article, {
        views: article.views + 1
      });
      onReplaceItem(newArticle);
    } else {
      setShowContent(false);
    }
  }, [incrementViews, onReplaceItem, article, showContent]);

  const handleOnClickLike = useCallback(() => {
    setLikeLoading(true);
    onClickLike({ article, user }).then(res => {
      if (res.data) {
        const newArticle = Object.assign({}, article, {
          likes: article.likes.concat([res.data])
        });
        onReplaceItem(newArticle);
      } else {
        const newArticle = Object.assign({}, article, {
          likes: article.likes.filter(like => like.userId !== user.id)
        });
        onReplaceItem(newArticle);
      }
      setLikeLoading(false);
    });
  }, [article, user, onReplaceItem, onClickLike]);

  return (
    <Card className='article-card' style={{ marginTop: 24 }}>
      <Card.Meta
        avatar={
          <Avatar
            className='hidden-max-sm'
            size={44}
            src={article.user.profileImage}
            icon={!article.user.profileImage ? 'user' : null}
          />
        }
        title={article.title}
        description={
          <div style={{ color: COLOR.GRAY, fontSize: '0.8rem' }}>
            by{' '}
            <span
              className='cursor-pointer c-primary'
              onClick={() => showUserModal(article.user.id)}
            >
              {article.user.nickname}
            </span>{' '}
            <span className='created-date hidden-max-sm'>
              @ {moment(article.createdAt).format('YYYY.M.DD a h:mm:ss')}
            </span>
            <span className='meta-info'>
              {' '}
              · 조회: {Number(article.views)} · 댓글:{' '}
              {Number(article.comments.length)} · 좋아요:{' '}
              {Number(article.likes.length)}
            </span>
          </div>
        }
      />
      <div style={{ marginTop: 24 }}>
        {!showContent && (
          <HTMLEllipsis
            unsafeHTML={article.content}
            maxLine='1'
            ellipsis='...'
            trimRight
            baseOn='letters'
          />
        )}
        {showContent && <FroalaEditorView model={article.content} />}
        <div className='text-right'>
          <Button
            type='link'
            icon={showContent ? 'caret-up' : 'caret-down'}
            onClick={handleOnClickMore}
          >
            {showContent ? '접기' : '펼치기'}
          </Button>
        </div>
        {showContent && (
          <>
            <div className='text-center'>
              <LikeButton
                onClick={handleOnClickLike}
                user={user}
                likes={article.likes}
                loading={likeLoading}
              />
            </div>
            <ArticleCommentList
              article={article}
              user={user}
              onClickUser={user => showUserModal(user.id)}
              form={form}
              onWrite={onWriteComment}
              onEdit={onEditComment}
              onDelete={onDeleteComment}
              onReplaceItem={onReplaceItem}
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default memo(ArticleCard);
