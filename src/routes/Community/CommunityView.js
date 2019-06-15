import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import ContentContainer from '../../components/ContentContainer';
import { Card, Button, Icon, Form, Input } from 'antd';
import Editor from '../../components/Editor/index';
import { COLOR } from '../../constants/styles';
import ArticleCard from '../../components/ArticleCard/index';
import { getDetailCdNmByDetailCd } from '../../libs/codeUtils';
import WaypointListContainer from '../../components/WaypointListContainer';
import Spinner from '../../components/Spinner';
import { ARTICLE_TYPE } from '../../constants/codes';
import { isAdminUser } from '../../libs/hpUtils';

const CommunityView = ({
  user,
  form,
  onSubmit,
  history,
  submitting,
  articleList,
  onIncrementViews,
  showUserModal,
  onReplaceItem,
  onClickLike,
  onWriteComment,
  onEditComment,
  onDeleteComment,
  categoryCd,
  loadMorePage,
  loadingMorePage,
  codes,
  refresh,
  refreshing
}) => {
  const [showForm, setShowForm] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const titleInput = useRef(null);

  useEffect(() => {
    if (categoryCd === ARTICLE_TYPE.NOTICE) {
      setShowForm(false);
      if (!isAdminUser(user)) setHideForm(true);
    } else {
      setHideForm(false);
    }
  }, [categoryCd]);

  const handleOnClickForm = useCallback(() => {
    if (!user) return history.push('/sign-in');
    setShowForm(true);
    setTimeout(() => {
      titleInput.current.focus();
    });
  }, [titleInput, user, history]);

  const handleOnChangeContent = useCallback(
    model => {
      form.setFieldsValue({ content: model });
    },
    [form]
  );

  const handleOnSubmit = useCallback(() => {
    onSubmit();
    setShowForm(false);
    form.resetFields();
  }, [onSubmit, form]);

  return (
    <ContentContainer>
      <Card
        title={getDetailCdNmByDetailCd(categoryCd, codes)}
        extra={
          <Button type='link' onClick={refresh}>
            <Icon type={refreshing ? 'loading' : 'sync'} />
          </Button>
        }
        bodyStyle={{
          padding: hideForm ? 0 : 12
        }}
      >
        {!showForm && !hideForm && (
          <div
            style={{ color: COLOR.GRAY, cursor: 'text', padding: 12 }}
            onClick={handleOnClickForm}
          >
            이곳을 클릭해서 글을 작성해보세요.
          </div>
        )}
        {showForm && !hideForm && (
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
                  rules: [{ required: true, message: '본문을 입력해주세요.' }],
                  valuePropName: 'model'
                })(
                  <Editor
                    placeholder='본문을 입력해주세요.'
                    onModelChange={handleOnChangeContent}
                  />
                )}
              </Form.Item>
            </Form>
            <div className='text-right'>
              <Button type='link' onClick={() => setShowForm(false)}>
                취소
              </Button>
              <Button
                type='primary'
                style={{ marginLeft: 6 }}
                onClick={handleOnSubmit}
                loading={submitting}
              >
                등록하기
              </Button>
            </div>
          </div>
        )}
      </Card>
      <WaypointListContainer
        onLoad={loadMorePage}
        lastPage={articleList.last}
        loading={loadingMorePage}
        loadingComponent={
          <div className='text-center' style={{ padding: 24 }}>
            <Spinner />
          </div>
        }
      >
        {articleList.content.map(item => (
          <ArticleCard
            article={item}
            user={user}
            incrementViews={onIncrementViews}
            showUserModal={showUserModal}
            onReplaceItem={onReplaceItem}
            onClickLike={onClickLike}
            form={form}
            onWriteComment={onWriteComment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        ))}
      </WaypointListContainer>
    </ContentContainer>
  );
};

export default memo(CommunityView);
