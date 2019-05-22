import React, { memo, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import PictureUploadFormItem from '../../../../components/PictureUploadFormItem/index';

const CreateMonImageView = ({
  form,
  onClickSubmit,
  isSubmitting,
  monImage
}) => {
  const getFileName = useCallback(url => {
    const splitedUrl = url.split('/');
    return splitedUrl[splitedUrl.length - 1];
  }, []);

  return (
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
        initialValue={
          monImage
            ? [
                {
                  uid: -1,
                  name: getFileName(monImage.url),
                  url: monImage.url
                }
              ]
            : undefined
        }
      />
      <Form.Item label='디자이너' required>
        {form.getFieldDecorator('designer', {
          rules: [
            {
              min: 1,
              max: 10,
              message: '1~10자로 입력해주세요.'
            }
          ],
          initialValue: monImage ? monImage.designer : undefined
        })(<Input style={{ width: 200 }} />)}
      </Form.Item>
      <Button type='primary' onClick={onClickSubmit} loading={isSubmitting}>
        {monImage ? '수정하기' : '등록하기'}
      </Button>
    </Form>
  );
};

export default memo(CreateMonImageView);
