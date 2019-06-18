import React, { memo, useState, useCallback } from 'react';
import { Row, Card, Affix, Button, Col, Empty } from 'antd';
import { Waypoint } from 'react-waypoint';
import MonCard from '../../components/MonCard';
import { isEmpty } from '../../libs/commonUtils';
import BottomTotal from '../BottomTotal';

const CollectionList = ({
  list,
  codes,
  mixable,
  onClickMix,
  selectable,
  selectOptions,
  evolutable,
  onClickEvolute,
  user,
  monCardProps
}) => {
  const [page, setPage] = useState(1);

  const onLoadNextPage = useCallback(() => {
    setPage(page + 1);
  }, [list, page]);

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
      <Row gutter={6} type='flex' justify='center'>
        {list.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='해당하는 콜렉션이 없습니다.'
          />
        )}
        {(list.length >= 24 ? list.slice(0, page * 24) : list).map(col => (
          <MonCard
            key={col.monId || col.id} // 콜렉션과 몬스터가 섞여있으므로 유니크하기 위해
            withWrapper
            mon={col}
            codes={codes}
            onClickMix={onClickMix}
            onClickEvolute={onClickEvolute}
            mixable={mixable}
            evolutable={evolutable}
            onClick={selectable ? () => selectOptions.onSelect(col) : null}
            hideInfo={isEmpty(col.mon)}
            user={user}
            bottomComponent={
              selectable ? <BottomTotal col={col} user={user} /> : null
            }
            {...monCardProps}
          />
        ))}
        {list.length >= 24 && (
          <Col span={24}>
            <Waypoint onEnter={onLoadNextPage} bottomOffset={-300} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default memo(CollectionList);
