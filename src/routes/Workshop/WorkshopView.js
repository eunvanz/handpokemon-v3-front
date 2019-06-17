import React, { memo, useState, useCallback } from 'react';
import ContentContainer from '../../components/ContentContainer';
import { Row, Col, Modal, Button, Card, Form, Input } from 'antd';
import WorkshopCard from '../../components/WorkshopCard';
import PictureUploadFormItem from '../../components/PictureUploadFormItem';
import WaypointListContainer from '../../components/WaypointListContainer';
import Spinner from '../../components/Spinner/index';
import ConfirmModal from '../../components/ConfirmModal/index';
import MessageModal from '../../components/MessageMoal/index';

const WorkshopView = ({
  workshopList,
  onClickLike,
  onSubmitWork,
  form,
  user,
  history,
  isSubmitting,
  loadNextPage,
  loading,
  onDelete
}) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const handleOnSubmitWork = useCallback(() => {
    onSubmitWork();
    setShowRegisterModal(false);
  }, [onSubmitWork, setShowRegisterModal]);
  const handleOnClickDelete = useCallback(
    workshop => {
      ConfirmModal({
        title: '작품삭제',
        content: '정말로 작품을 삭제하시겠습니까?',
        onOk: () => {
          setDeleting(true);
          onDelete(workshop).then(() => {
            setDeleting(false);
            MessageModal({
              type: 'success',
              title: '삭제완료',
              content: '작품이 삭제되었습니다.'
            });
          });
        }
      });
    },
    [onDelete]
  );
  return (
    <ContentContainer>
      <Card style={{ marginBottom: 12 }}>
        <div className='pull-left' style={{ lineHeight: 2.3 }}>
          여러분이 그린 작품을 마음껏 올려주세요!
        </div>
        <Button
          type='primary'
          className='pull-right'
          onClick={
            user
              ? () => setShowRegisterModal(true)
              : () => history.push('/sign-in')
          }
        >
          작품등록
        </Button>
      </Card>
      <WaypointListContainer
        onLoad={loadNextPage}
        lastPage={workshopList.last}
        loading={loading}
        loadingComponent={
          <div className='text-center' style={{ padding: 24 }}>
            <Spinner />
          </div>
        }
      >
        <Row gutter={6}>
          {workshopList.content.map(item => (
            <Col xs={12} sm={6} xl={4} key={item.id}>
              <WorkshopCard
                workshop={item}
                onClickLike={onClickLike}
                user={user}
                onClickDelete={handleOnClickDelete}
                deleting={deleting}
              />
            </Col>
          ))}
        </Row>
      </WaypointListContainer>
      <Modal
        title='작품등록'
        okText='등록'
        cancelText='취소'
        visible={showRegisterModal}
        onOk={handleOnSubmitWork}
        width={300}
        onCancel={() => setShowRegisterModal(false)}
        confirmLoading={isSubmitting}
      >
        <Form>
          <PictureUploadFormItem
            label='이미지'
            required
            form={form}
            name='image'
            max={1}
            useCrop
            cropOptions={{
              cropWidth: 250,
              cropHeight: 250
            }}
          />
          <Form.Item label='디자이너' required colon={false}>
            {form.getFieldDecorator('designer', {
              rules: [
                {
                  min: 1,
                  max: 10,
                  message: '1~10자로 입력해주세요.'
                }
              ],
              initialValue: user ? user.nickname : undefined
            })(<Input />)}
          </Form.Item>
          <Form.Item label='포켓몬이름' required colon={false}>
            {form.getFieldDecorator('monName', {
              rules: [
                {
                  min: 1,
                  max: 10,
                  message: '1~10자로 입력해주세요.'
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    </ContentContainer>
  );
};

export default memo(WorkshopView);
