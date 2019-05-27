import React, { useCallback, memo } from 'react';
import { Form, InputNumber, Input, Select, Row, Col, Button } from 'antd';
import { getMasterCdGroup } from '../../../../libs/codeUtils';
import { MASTER_CD } from '../../../../constants/codes';
import MonImage from './MonImage';
import SpinContainer from '../../../../components/SpinContainer';

const CreateMonView = ({
  form,
  codes,
  monImages,
  selectedMonImages,
  onSelectMonImage,
  isSubmitting,
  mon,
  onSubmit
}) => {
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
              ],
              initialValue: mon ? mon.id : undefined
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
              ],
              initialValue: mon ? mon.name : undefined
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
              ],
              initialValue: mon ? mon.mainAttrCd : undefined
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
              initialValue: mon ? mon.subAttrCd : undefined
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
              ],
              initialValue: mon ? mon.hp : undefined
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
              ],
              initialValue: mon ? mon.power : undefined
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
              ],
              initialValue: mon ? mon.armor : undefined
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
              ],
              initialValue: mon ? mon.sPower : undefined
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
              ],
              initialValue: mon ? mon.sArmor : undefined
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
              ],
              initialValue: mon ? mon.dex : undefined
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
              ],
              initialValue: mon ? mon.total : undefined
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
              ],
              initialValue: mon ? mon.height : undefined
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
              ],
              initialValue: mon ? mon.weight : undefined
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
              ],
              initialValue: mon ? mon.point : undefined
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
              ],
              initialValue: mon ? mon.cost : undefined
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='진화필요레벨'>
            {form.getFieldDecorator('requiredEvolutionLv', {
              initialValue: mon ? mon.requiredEvolutionLv : undefined
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
              ],
              initialValue: mon ? mon.gradeCd : undefined
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
              ],
              initialValue: mon ? mon.generation : undefined
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label='진화전 도감번호'>
            {form.getFieldDecorator('prevMonId', {
              initialValue: mon ? mon.id : undefined
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
              ],
              initialValue: mon ? mon.description : undefined
            })(<Input.TextArea rows={2} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        {mon && (
          <>
            <Col xs={24}>
              <p className='fw-500'>이미지</p>
            </Col>
            {mon.monImages &&
              mon.monImages.map(monImage => (
                <Col xs={4} key={monImage.id} style={{ marginBottom: 24 }}>
                  <MonImage item={monImage} />
                </Col>
              ))}
          </>
        )}
        <Col xs={24}>
          <p className='fw-500'>이미지 추가</p>
        </Col>
        {!monImages && <SpinContainer />}
        {monImages &&
          monImages.map(monImage => (
            <Col xs={4} key={monImage.id} style={{ marginBottom: 24 }}>
              <MonImage
                item={monImage}
                isSelected={
                  selectedMonImages.filter(item => item.id === monImage.id)
                    .length > 0
                }
                onSelect={onSelectMonImage}
                isSelectable
              />
            </Col>
          ))}
      </Row>
      <Button
        style={{ marginTop: 24 }}
        type='primary'
        loading={isSubmitting}
        onClick={onSubmit}
      >
        {mon ? '수정' : '저장'}
      </Button>
    </Form>
  );
};

export default memo(CreateMonView);
