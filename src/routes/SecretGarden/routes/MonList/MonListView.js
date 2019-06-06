import React, { memo, useState, useCallback } from 'react';
import { Row, Col } from 'antd';
import { Waypoint } from 'react-waypoint';
import MonCard from '../../../../components/MonCard';

const MonListView = ({ monList, onClickItem, codes }) => {
  const [page, setPage] = useState(1);

  const onLoadNextPage = useCallback(() => {
    setPage(page + 1);
  }, [monList, page]);

  return (
    <Row gutter={6}>
      {monList.slice(0, page * 48).map(mon => {
        return (
          <Col xs={8} sm={6} xl={4} key={mon.id} style={{ marginBottom: 6 }}>
            <MonCard
              mon={mon}
              onClick={() => onClickItem(mon.id)}
              codes={codes}
            />
          </Col>
        );
      })}
      <Col span={24}>
        <Waypoint onEnter={onLoadNextPage} bottomOffset={-200} />
      </Col>
    </Row>
  );
};

export default memo(MonListView);
