import React, { memo, useState, useCallback } from 'react';
import { Row, Button } from 'antd';
import ContentContainer from '../../components/ContentContainer/index';
import MonCard from '../../components/MonCard/index';

const PickResult = ({ pickedMons, codes, user, onPick, history }) => {
  const [picking, setPicking] = useState(false);

  const handleOnClickPick = useCallback(
    (repeatCnt, pickingType) => {
      setPicking(pickingType);
      onPick({ repeatCnt }).then(() => setPicking(false));
    },
    [onPick]
  );

  return (
    <ContentContainer>
      <Row type='flex' justify='space-around' align='middle' gutter={6}>
        {pickedMons.map(mon => (
          <MonCard mon={mon} codes={codes} withWrapper />
        ))}
      </Row>
      <div className='text-center'>
        {user.pickCredit > 0 && (
          <>
            <Button
              type='primary'
              size='large'
              onClick={() => handleOnClickPick(1, 'single')}
              disabled={picking && picking !== 'single'}
              loading={picking && picking === 'single'}
            >
              다시채집 X 1
            </Button>
            {user.pickCredit > 1 && (
              <Button
                type='primary'
                size='large'
                style={{ marginLeft: 12 }}
                onClick={() =>
                  handleOnClickPick(Math.min(user.pickCredit, 6), 'multi')
                }
                disabled={picking && picking !== 'multi'}
                loading={picking && picking === 'multi'}
              >{`다시채집 X ${Math.min(user.pickCredit, 6)}`}</Button>
            )}
          </>
        )}
        {user.pickCredit < 1 && (
          <Button
            type='primary'
            size='large'
            style={{ marginLeft: 12 }}
            onClick={() => history.push('/collection')}
          >
            내 콜렉션
          </Button>
        )}
      </div>
    </ContentContainer>
  );
};

export default memo(PickResult);
