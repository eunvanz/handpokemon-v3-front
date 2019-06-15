import React, { memo, useState, useRef, useCallback } from 'react';
import ContentContainer from '../../components/ContentContainer';
import { Card, Button, Icon, Form, Input } from 'antd';
import Editor from '../../components/Editor/index';
import { COLOR } from '../../constants/styles';

const CommunityView = ({ user, form }) => {
  const [showForm, setShowForm] = useState(false);
  const titleInput = useRef(null);

  const handleOnClickForm = useCallback(() => {
    setShowForm(true);
    setTimeout(() => {
      titleInput.current.focus();
    });
  }, [titleInput]);

  const handleOnChangeContent = useCallback(
    (e, editor) => {
      form.setFieldsValue({ content: editor.getData() });
    },
    [form]
  );

  return (
    <ContentContainer>
      <Card
        title='자유게시판'
        extra={
          <Button type='link'>
            <Icon type='sync' />
          </Button>
        }
      >
        {!showForm && (
          <div
            style={{ color: COLOR.GRAY, cursor: 'text' }}
            onClick={handleOnClickForm}
          >
            이곳에 아무 글이나 작성해보세요.
          </div>
        )}
        {showForm && (
          <div>
            <Form>
              <Form.Item>
                {form.getFieldDecorator('title', {
                  rules: [{ required: true, message: '제목을 입력해주세요.' }]
                })(
                  <Input
                    size='large'
                    placeholder='제목을 입력해주세요.'
                    ref={titleInput}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('content', {
                  rules: [{ required: true, message: '본문을 입력해주세요.' }]
                })(
                  <Editor
                    placeholder='본문을 입력해주세요.'
                    onChange={handleOnChangeContent}
                  />
                )}
              </Form.Item>
            </Form>
          </div>
        )}
      </Card>
    </ContentContainer>
  );
};

export default memo(CommunityView);
