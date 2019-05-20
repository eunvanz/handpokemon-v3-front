import React, { memo } from 'react';
import { Row, Col } from 'antd';
import MonCard from '../../../../components/MonCard';

const MonListView = ({ monList, onClickItem, codes }) => {
  return (
    <Row gutter={6}>
      {monList.map(mon => {
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
    </Row>
  );
};

export default memo(MonListView);
