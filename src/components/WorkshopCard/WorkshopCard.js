import React, { memo, useState, useCallback, useEffect } from 'react';
import { Card, Modal, Button, Divider } from 'antd';
import LikeButton from '../LikeButton';
import WrappedCommentList from '../WrappedCommentList';

const WorkshopModal = memo(
  ({ visible, onCancel, workshop, user, likeLoading, onClickLike }) => {
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
        width={360}
        footer={null}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: 24, textAlign: 'center' }}>
          <img
            src={workshop.image}
            style={{ maxWidth: 250, margin: 'auto', marginBottom: 24 }}
            alt='공작소 이미지'
          />
          <LikeButton
            user={user}
            likes={workshop.likes}
            loading={likeLoading}
            onClick={onClickLike}
            style={{ marginBottom: 24 }}
          />
          <h3 className='c-primary'>{workshop.monName}</h3>
          <p>
            Designed by{' '}
            <big className='c-primary fw-700'>{workshop.designer}</big>
          </p>
          <span>{workshop.createdAt.slice(0, 10)}</span>
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

const WorkshopCard = ({ workshop, user, onClickLike }) => {
  const [showModal, setShowModal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleOnClickLike = useCallback(() => {
    setLikeLoading(true);
    onClickLike(workshop).then(() => {
      setLikeLoading(false);
    });
  }, [workshop, onClickLike]);

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
        bodyStyle={{ textAlign: 'center', padding: 12 }}
        onClick={() => setShowModal(true)}
      >
        <LikeButton
          user={user}
          likes={workshop.likes}
          loading={likeLoading}
          onClick={handleOnClickLike}
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
        likeLoading={likeLoading}
        onClickLike={handleOnClickLike}
      />
    </>
  );
};

export default memo(WorkshopCard);
