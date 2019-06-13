import React, { memo, useCallback, useState } from 'react';
import { List, Avatar, Form, Input, Button } from 'antd';
import SpinContainer from '../SpinContainer';
import MessageModal from '../MessageMoal/index';
import ConfirmModal from '../ConfirmModal/index';

const CommentList = ({
  comments,
  user,
  onClickUser,
  onWrite,
  form,
  onEdit,
  onDelete,
  parent,
  listActions,
  listKey
}) => {
  const [editTargetId, setEditTargetId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnWrite = useCallback(() => {
    form.validateFields(['content'], (err, values) => {
      if (!err) {
        setLoading(true);
        const comment = {
          userId: user.id,
          content: values.content,
          [parent.key]: parent.id
        };
        onWrite(comment)
          .then(res => {
            setLoading(false);
            listActions.appendList(listKey, [res.data]);
          })
          .catch(err => {
            MessageModal({
              type: 'error',
              content: err
            });
          });
      }
    });
  }, [form, onWrite, parent, user, listActions, listKey]);

  const handleOnEdit = useCallback(
    comment => {
      form.validateFields(['editContent'], (err, values) => {
        if (!err) {
          setLoading(true);
          const newComment = Object.assign({}, comment, {
            content: values.editContent
          });
          onEdit(newComment)
            .then(() => {
              setLoading(false);
              listActions.replaceItem({
                key: listKey,
                conditionKey: 'id',
                value: newComment.id,
                item: newComment
              });
            })
            .catch(err => {
              MessageModal({
                type: 'error',
                content: err
              });
            });
        }
      });
    },
    [form, onEdit, listActions, listKey]
  );

  const handleOnDelete = useCallback(
    commentId => {
      ConfirmModal({
        title: '댓글삭제',
        content: '정말 삭제하시겠습니까?',
        onOk: () => {
          setLoading(true);
          onDelete(commentId)
            .then(() => {
              setLoading(false);
              listActions.removeItem({
                key: listKey,
                conditionKey: 'id',
                value: commentId
              });
            })
            .catch(err => {
              MessageModal({
                type: 'error',
                content: err
              });
            });
        }
      });
    },
    [onDelete, listActions, listKey]
  );

  const renderContent = useCallback(
    item => {
      if (item.id === editTargetId) {
        return (
          <Form>
            <Form.Item>
              {form.getFieldDecorator('editContent', {
                rules: [{ required: true, message: '내용을 입력해주세요.' }]
              })(
                <Input.TextArea
                  placeholder='내용을 입력해주세요.'
                  onPressEnter={() => handleOnEdit(item)}
                />
              )}
            </Form.Item>
            <div>
              <Button
                type='link'
                size='large'
                onClick={() => setEditTargetId(null)}
              >
                취소
              </Button>
              <Button
                type='primary'
                size='large'
                style={{ marginLeft: 6 }}
                onClick={() => handleOnEdit(item)}
              >
                수정하기
              </Button>
            </div>
          </Form>
        );
      } else {
        return item.content;
      }
    },
    [editTargetId, handleOnEdit, form]
  );

  return (
    <>
      {loading && <SpinContainer />}
      {comments.length === 0 && (
        <div className='text-center'>
          댓글이 없습니다. 첫번째로 댓글을 남겨보세요.
        </div>
      )}
      <List
        itemLayout='horizontal'
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.user.profileImage}
                    icon={item.user.profileImage ? 'user' : null}
                  />
                }
                title={
                  <h4
                    className='cursor-pointer c-primary'
                    onClick={() => onClickUser(item)}
                  >
                    {item.user.nickname}
                  </h4>
                }
                description={
                  <>
                    {renderContent(item)}
                    {user.id === item.userId && [
                      <Button
                        key='edit'
                        size='small'
                        onClick={() => setEditTargetId(item.id)}
                      >
                        수정
                      </Button>,
                      <Button
                        key='delete'
                        size='small'
                        type='danger'
                        onClick={() => handleOnDelete(item.id)}
                        style={{ marginLeft: 6 }}
                      >
                        삭제
                      </Button>
                    ]}
                  </>
                }
              />
            </List.Item>
          </List.Item>
        )}
      />
      <Form>
        <Form.Item>
          {form.getFieldDecorator('content', {
            rules: [{ required: true, message: '내용을 입력해주세요.' }]
          })(
            <Input.TextArea
              placeholder='내용을 입력해주세요.'
              onPressEnter={handleOnWrite}
            />
          )}
        </Form.Item>
        <div>
          <Button type='primary' size='large' onClick={handleOnWrite}>
            등록하기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default memo(CommentList);
