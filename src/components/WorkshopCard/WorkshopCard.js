import React, { memo, useState, useEffect, useCallback } from 'react';
import { Card, Modal, Divider, Button } from 'antd';
import moment from 'moment';
import WrappedCommentList from '../WrappedCommentList';
import LikeButton from '../LikeButton/index';
import { COLOR } from '../../constants/styles';

const WorkshopModal = memo(
  ({
    visible,
    onCancel,
    workshop,
    onClickLike,
    likeLoading,
    user,
    onClickDelete,
    deleting
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
        centered
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
                onClick={() => onClickDelete(workshop)}
                loading={deleting}
              >
                삭제
              </Button>
            )}
          </div>
          <h3 className='c-primary'>{workshop.monName}</h3>
          <p>
            <span style={{ color: COLOR.GRAY }}>Designed by </span>
            <big className='c-primary'>{workshop.designer}</big>
          </p>
          <span style={{ color: COLOR.GRAY }}>
            @ {moment(workshop.createdAt).fromNow()}
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
        <div>
          <small style={{ color: COLOR.GRAY }}>Designed by</small>
          <h4 className='c-primary'>{workshop.designer}</h4>
        </div>
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
