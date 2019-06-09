import React, { memo, useMemo } from 'react';
import numeral from 'numeral';
import ContentContainer from '../../components/ContentContainer';
import { Card, Table, Avatar } from 'antd';
import './RankingView.less';
import WaypointListContainer from '../../components/WaypointListContainer';
import Spinner from '../../components/Spinner';

const RankingView = ({
  title,
  myRank,
  user,
  loadNextPage,
  loading,
  list,
  pointKey
}) => {
  const dataSource = useMemo(() => {
    let prevPoint = 0;
    let equalCnt = 0;
    let result = [];
    if (myRank) {
      result.push({
        key: -1,
        rank: myRank,
        ...user
      });
    }
    const rankList = list.content.map((item, idx) => {
      if (item[pointKey] === prevPoint) {
        equalCnt++;
      } else {
        prevPoint = item[pointKey];
        equalCnt = 0;
      }
      return {
        key: idx,
        rank: idx + 1 - equalCnt,
        ...item
      };
    });
    result = result.concat(rankList);
    return result;
  }, [list, myRank, title]);

  const columns = useMemo(() => {
    return [
      {
        title: '순위',
        dataIndex: 'rank',
        align: 'center'
      },
      {
        title: '트레이너',
        dataIndex: 'nickname',
        align: 'left',
        render: (nickname, record) => (
          <div>
            <Avatar
              src={record.profileImage}
              icon={!record.profileImage ? 'user' : null}
              style={{ marginRight: 6 }}
              className='hidden-max-sm'
            />
            {nickname}
          </div>
        )
      },
      {
        title: '콜렉션점수',
        dataIndex: 'colPoint',
        key: 'key',
        align: 'center',
        className: title === '콜렉션랭킹' ? null : 'hidden-max-sm',
        render: colPoint => (
          <div>
            <span className={title === '콜렉션랭킹' ? 'c-primary' : null}>
              {Number(colPoint).toLocaleString()}
            </span>
            점
          </div>
        )
      },
      {
        title: '시합점수',
        dataIndex: 'battlePoint',
        key: 'key',
        align: 'center',
        className: title === '시합랭킹' ? null : 'hidden-max-sm',
        render: battlePoint => (
          <div>
            <span className={title === '시합랭킹' ? 'c-primary' : null}>
              {Number(battlePoint).toLocaleString()}
            </span>
            점
          </div>
        )
      },
      {
        title: '승',
        dataIndex: 'win',
        key: 'key',
        align: 'center',
        className: 'hidden-max-sm',
        render: win => <div>{Number(win).toLocaleString()}승</div>
      },
      {
        title: '패',
        dataIndex: 'lose',
        key: 'key',
        align: 'center',
        className: 'hidden-max-sm',
        render: lose => <div>{Number(lose).toLocaleString()}패</div>
      },
      {
        title: '승률',
        dataIndex: 'win',
        key: 'key',
        align: 'center',
        className: 'hidden-max-sm',
        render: (win, record) => (
          <div>{numeral(win / win + record.lose).format('0.0%')}</div>
        )
      }
    ];
  }, [title]);

  return (
    <ContentContainer className='ranking-view'>
      <Card title={title} bodyStyle={{ padding: 0 }}>
        <WaypointListContainer
          onLoad={loadNextPage}
          lastPage={list.last}
          loading={loading}
          loadingComponent={
            <div className='text-center' style={{ padding: 24 }}>
              <Spinner />
            </div>
          }
        >
          <Table
            className={myRank ? 'contains-my-rank' : null}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </WaypointListContainer>
      </Card>
    </ContentContainer>
  );
};

export default memo(RankingView);
