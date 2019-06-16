import React, { memo, useState, useEffect, useCallback } from 'react';
import { Card, Modal, Divider, Button } from 'antd';
import moment from 'moment';
import WrappedCommentList from '../WrappedCommentList';
import LikeButton from '../LikeButton/index';

const WorkshopModal = memo(
  ({
    visible,
    onCancel,
    workshop,
    onClickLike,
    likeLoading,
    user,
    onClickDelete
  }) => {
    const [renderCommentList, setRenderCommentList] = useState(false);
    useEffect(() => {
      if (visible) {
        setRenderCommentList(true);
      } else {
        setRenderCommentList(false);
      }
    }, [visible, setRenderCommentList]);

    return (
      <Modal
        visible={visible}
        title='작품정보'
        onCancel={onCancel}
        footer={null}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: 24, textAlign: 'center' }}>
          <img
            src={workshop.image}
            style={{ maxWidth: 250, margin: 'auto', marginBottom: 24 }}
            alt='공작소 이미지'
          />
          <div>
            <LikeButton
              onClick={onClickLike}
              loading={likeLoading}
              likes={workshop.likes}
              user={user}
              style={{ marginBottom: 12 }}
            />
            {user && workshop.userId === user.id && (
              <Button
                type='danger'
                style={{ marginLeft: 6 }}
                onClick={onClickDelete}
              >
                삭제
              </Button>
            )}
          </div>
          <h3 className='c-primary'>{workshop.monName}</h3>
          <p>
            Designed by{' '}
            <big className='c-primary fw-700'>{workshop.designer}</big>
          </p>
          <span>
            @ {moment(workshop.createdAt).format('YYYY.M.DD a h:mm:ss')}
          </span>
        </div>
        <Divider style={{ margin: 0 }} />
        <div>
          {renderCommentList && (
            <WrappedCommentList
              parent={{ key: 'workshopId', id: workshop.id }}
            />
          )}
        </div>
      </Modal>
    );
  }
);

const WorkshopCard = ({ workshop, user, onClickLike, onClickDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const handleOnClickLike = useCallback(
    e => {
      e.stopPropagation();
      setLikeLoading(true);
      onClickLike(workshop).then(() => setLikeLoading(false));
    },
    [onClickLike, workshop]
  );

  return (
    <>
      <Card
        cover={
          <div style={{ position: 'relative', padding: 6 }}>
            <img
              src={workshop.image}
              alt='공작소 이미지'
              style={{ width: '100%' }}
            />
          </div>
        }
        style={{ cursor: 'pointer' }}
        bodyStyle={{ textAlign: 'center', padding: 12 }}
        onClick={() => setShowModal(true)}
      >
        <LikeButton
          onClick={handleOnClickLike}
          loading={likeLoading}
          likes={workshop.likes}
          user={user}
          size='small'
          style={{ marginBottom: 12 }}
        />
        <h4 className='c-primary'>{workshop.monName}</h4>
        Designed by<h4 className='c-primary'>{workshop.designer}</h4>
      </Card>
      <WorkshopModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        workshop={workshop}
        user={user}
        onClickLike={handleOnClickLike}
        likeLoading={likeLoading}
        onClickDelete={onClickDelete}
      />
    </>
  );
};

export default memo(WorkshopCard);
