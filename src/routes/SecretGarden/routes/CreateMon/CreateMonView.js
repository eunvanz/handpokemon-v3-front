import React, { useCallback, memo, useState } from 'react';
import { Form, InputNumber, Input, Select, Row, Col } from 'antd';
import { getMasterCdGroup } from '../../../../libs/codeUtils';
import { MASTER_CD } from '../../../../constants/codes';
import PictureUploadFormItem from '../../../../components/PictureUploadFormItem';

const CreateMonView = ({ form, codes }) => {
  const [monImages, setMonImages] = useState([]);

  const setTotal = useCallback(() => {
    setTimeout(() => {
      const stats = ['hp', 'power', 'armor', 'sPower', 'sArmor', 'dex'];
      const total = stats.reduce(
        (prev, stat) => prev + (form.getFieldValue(stat) || 0),
        0
      );
      form.setFieldsValue({ total });
    });
  }, []);

  return (
    <Form>
      <Row gutter={12}>
        <Col xs={24} md={6}>
          <Form.Item label='도감번호'>
            {form.getFieldDecorator('id', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label='이름'>
            {form.getFieldDecorator('name', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label='주속성'>
            {form.getFieldDecorator('mainAttrCd', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select>
                {getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(item => (
                  <Select.Option value={item.detailCd}>
                    {item.detailCdNm}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label='부속성'>
            {form.getFieldDecorator('subAttrCd', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select>
                {getMasterCdGroup(MASTER_CD.MON_ATTRS, codes).map(item => (
                  <Select.Option value={item.detailCd}>
                    {item.detailCdNm}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='체력'>
            {form.getFieldDecorator('hp', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber onChange={setTotal} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='공격력'>
            {form.getFieldDecorator('power', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber onChange={setTotal} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='방어력'>
            {form.getFieldDecorator('armor', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber onChange={setTotal} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='특수공격력'>
            {form.getFieldDecorator('sPower', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber onChange={setTotal} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='특수방어력'>
            {form.getFieldDecorator('sArmor', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber onChange={setTotal} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='민첩성'>
            {form.getFieldDecorator('dex', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber onChange={setTotal} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='종합'>
            {form.getFieldDecorator('total', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='평균키'>
            {form.getFieldDecorator('height', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='평균몸무게'>
            {form.getFieldDecorator('weight', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='포인트'>
            {form.getFieldDecorator('point', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='코스트'>
            {form.getFieldDecorator('cost', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='진화필요레벨'>
            {form.getFieldDecorator('requiredEvolutionLv', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='등급'>
            {form.getFieldDecorator('gradeCd', {
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Select>
                {getMasterCdGroup(MASTER_CD.MON_GRADE, codes).map(item => (
                  <Select.Option value={item.detailCd}>
                    {item.detailCdNm}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='세대'>
            {form.getFieldDecorator('generation', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='진화전 도감번호'>
            {form.getFieldDecorator('prevMonId', {
              rules: [
                {
                  required: true
                }
              ]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label='소개'>
            {form.getFieldDecorator('description', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input.TextArea rows={2} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default memo(CreateMonView);
