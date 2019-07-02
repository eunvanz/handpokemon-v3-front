import React, { memo, useCallback } from 'react';
import { Button } from 'antd';

const BattleView = ({ history }) => {
  const handleOnClickDefenseDeploy = useCallback(() => {
    history.push('/defense');
  }, [history]);
  return (
    <div
      className='center-middle-aligner'
      style={{ height: 'calc(100vh - 64px - 72px)' }}
    >
      <div className='text-center'>
        <h3>
          시합을 시작할 준비가 됐니?
          <br />
          시합이 시작된 이후에 도망친다면 패배처리되니 조심하라구.
        </h3>
        <div>
          <Button size='large' type='link' onClick={handleOnClickDefenseDeploy}>
            수비배치
          </Button>
          <Button size='large' type='primary' style={{ marginLeft: 6 }}>
            시합시작
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(BattleView);
