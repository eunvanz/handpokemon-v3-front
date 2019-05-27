import React, { memo } from 'react';
import { Row, Card, Affix, Button } from 'antd';
import MonCard from '../../components/MonCard';

const CollectionList = ({
  list,
  codes,
  mixable,
  onClickMix,
  selectable,
  selectOptions,
  evolutable,
  onClickEvolute
}) => {
  return (
    <>
      {selectable && (
        <Affix offsetTop={60}>
          <Card style={{ marginBottom: 12 }}>
            <div className='pull-left'>{selectOptions.message}</div>
            <div className='pull-right'>
              <Button
                type='danger'
                onClick={selectOptions.onCancel}
                icon='close'
                size='small'
              >
                취소
              </Button>
            </div>
          </Card>
        </Affix>
      )}
      <Row gutter={6}>
        {list.map(col => (
          <MonCard
            key={col.id}
            withWrapper
            mon={col}
            codes={codes}
            onClickMix={onClickMix}
            onClickEvolute={onClickEvolute}
            mixable={mixable}
            evolutable={evolutable}
            onClick={selectable ? () => selectOptions.onSelect(col) : null}
          />
        ))}
      </Row>
    </>
  );
};

export default memo(CollectionList);
