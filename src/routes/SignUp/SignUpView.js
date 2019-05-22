import React, { useState, useCallback, memo } from 'react';
import { Card, Steps, Divider, Button } from 'antd';
import './SignUp.less';
import ContentContainer from '../../components/ContentContainer';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import MessageModal from '../../components/MessageMoal/index';
import ThirdStep from './ThirdStep';

const SignUpView = ({
  form,
  checkDupEmail,
  checkDupNickname,
  codes,
  onPick,
  startPicks,
  onSubmit
}) => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleOnClickStep = useCallback(
    stepToGo => {
      let targetFields;
      if ([0, 1].indexOf(stepToGo) > -1) {
        if (step === 0) {
          targetFields = ['email', 'password', 'passwordConfirm', 'nickname'];
        } else if (step === 1) {
          targetFields = ['introduce', 'profileImage'];
        }
        form.validateFields(targetFields, (err, values) => {
          if (!err) {
            setStep(stepToGo);
          } else {
            MessageModal({
              type: 'error',
              content: '모든 항목을 정확히 작성해주세요'
            });
          }
        });
      } else {
        setStep(stepToGo);
      }
    },
    [step]
  );

  const handleOnClickSubmit = () => {
    setSubmitting(true);
    onSubmit();
  };

  return (
    <ContentContainer>
      <div className='center-middle-aligner'>
        <Card
          className='sign-up-card'
          title={
            <div>
              <h3>손켓몬 트레이너 라이센스 등록</h3>
              <Steps size='small' current={step}>
                <Steps.Step title='필수정보 입력' />
                <Steps.Step title='선택정보 입력' />
                <Steps.Step title='스타트픽 선택' />
              </Steps>
            </div>
          }
          style={{ width: 550, maxWidth: '100%' }}
        >
          <FirstStep
            show={step === 0}
            checkDupEmail={checkDupEmail}
            checkDupNickname={checkDupNickname}
            form={form}
          />
          <SecondStep show={step === 1} form={form} />
          <ThirdStep
            show={step === 2}
            onPick={onPick}
            startPicks={startPicks}
            codes={codes}
            disabled={submitting}
          />
          <Divider />
          <div className='text-right'>
            {step > 0 && (
              <Button
                size='large'
                type='link'
                icon='arrow-left'
                onClick={() => handleOnClickStep(step - 1)}
              >
                이전단계
              </Button>
            )}
            {step < 2 && (
              <Button
                type='primary'
                size='large'
                icon='arrow-right'
                onClick={() => handleOnClickStep(step + 1)}
                style={{ marginLeft: 8 }}
              >
                다음단계
              </Button>
            )}
            {step === 2 && (
              <Button
                type='primary'
                size='large'
                icon='check'
                onClick={handleOnClickSubmit}
                style={{ marginLeft: 8 }}
                loading={submitting}
                disabled={!startPicks}
              >
                모험시작
              </Button>
            )}
          </div>
        </Card>
      </div>
    </ContentContainer>
  );
};

export default memo(SignUpView);
