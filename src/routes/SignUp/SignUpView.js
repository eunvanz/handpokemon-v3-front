import React from 'react';
import { Card, Form, Input } from 'antd';
import { isDupEmail } from '../../api/requestUser';
import { createRule } from '../../libs/vaildators';

const SignUpView = ({ form }) => {
  return (
    <Card style={{ width: 550, maxWidth: '100%' }}>
      <h3>회원가입</h3>
      <Form>
        <Form.Item label='이메일주소' colon={false} required>
          {form.getFieldDecorator('email', {
            rules: createRule({
              isRequired: true,
              customValidator: (rule, value, callback) => {
                isDupEmail(value).then(isDup => {
                  if (isDup) callback('이미 사용중인 이메일주소입니다.');
                  else callback();
                });
              }
            }).emailRule
          })(
            <Input
              size='large'
              type='email'
              placeholder='아이디로 사용할 이메일주소'
            />
          )}
        </Form.Item>
        <Form.Item
          label='비밀번호'
          colon={false}
          required
          extra='비밀번호는 암호화되어 안전하게 보관됩니다.'
        >
          {form.getFieldDecorator('password', {
            rules: createRule({
              isRequired: true
            }).passwordRule
          })(
            <Input
              size='large'
              type='password'
              placeholder='6~20자리의 비밀번호'
            />
          )}
        </Form.Item>
        <Form.Item label='비밀번호 확인' colon={false} required>
          {form.getFieldDecorator('passwordConfirm', {
            rules: createRule({
              isRequired: true,
              customValidator: (rule, value, callback) => {
                if (value && value !== form.getFieldValue('password')) {
                  callback('입력하신 비밀번호와 다릅니다.');
                } else {
                  callback();
                }
              }
            })
          })(
            <Input
              size='large'
              type='password'
              placeholder='앞의 비밀번호와 동일한 비밀번호'
            />
          )}
        </Form.Item>
        <Form.Item label='닉네임' colon={false} required>
          {form.getFieldDecorator('nickname', {
            rules: createRule({
              isRequired: true,
              customValidator: (rule, value, callback) => {
                isDupEmail(value).then(isDup => {
                  if (isDup) callback('이미 사용중인 닉네임입니다.');
                  else callback();
                });
              }
            })
          })(<Input size='large' type='email' placeholder='1~8자의 닉네임' />)}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignUpView;
