import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { Card, Modal, Button } from 'antd';
import LikeButton from '../LikeButton';
import withCommentList from '../../hocs/withCommentList';

const WorkshopCard = ({ workshop, user, onClickLike }) => {
  const [showModal, setShowModal] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    if (showModal) {
    }
  }, [showModal]);

  const handleOnClickLike = useCallback(() => {
    setLikeLoading(true);
    onClickLike(workshop).then(() => {
      setLikeLoading(false);
    });
  }, [workshop, onClickLike]);

  const WorkshopModal = withCommentList({
    key: `comments-workshop-${workshop.id}`
  })(
    useMemo(
      ({ commentListActions }) => {
        return (
          <Modal
            visible={showModal}
            title='작품정보'
            onCancel={() => setShowModal(false)}
            width={360}
            footer={[
              <Button
                type='link'
                size='large'
                key='close'
                onClick={() => setShowModal(false)}
              >
                닫기
              </Button>
            ]}
            bodyStyle={{ textAlign: 'center' }}
          >
            <img
              src={workshop.image}
              style={{ maxWidth: 250, margin: 'auto', marginBottom: 24 }}
              alt='공작소 이미지'
            />
            <LikeButton
              user={user}
              likes={workshop.likes}
              loading={likeLoading}
              onClick={handleOnClickLike}
            />
            <h3 className='c-primary'>{workshop.monName}</h3>
            <p>
              designed by{' '}
              <big className='c-primary fw-700'>{workshop.designer}</big>
            </p>
            <span>{workshop.createdAt.slice(0, 10)}</span>
            {commentListActions.renderCommentList()}
          </Modal>
        );
      },
      [showModal, workshop, user, likeLoading, handleOnClickLike]
    )
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
        bodyStyle={{ textAlign: 'center' }}
        onClick={() => showModal(true)}
      >
        <LikeButton
          user={user}
          likes={workshop.likes}
          loading={likeLoading}
          onClick={handleOnClickLike}
        />
        <h3 className='c-primary'>{workshop.monName}</h3>
        designed by<h3 className='c-primary'>{workshop.designer}</h3>
      </Card>
      <WorkshopModal />
    </>
  );
};

export default memo(WorkshopCard);
