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
  pointKey,
  showUserModal
}) => {
  const dataSource = useMemo(() => {
    let prevPoint = -1;
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
          <div
            className='cursor-pointer'
            onClick={() => showUserModal(record.id)}
          >
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
        dataIndex: 'attackWin',
        align: 'center',
        className: 'hidden-max-sm',
        render: (win, record) => (
          <div>{Number(win + record.defenseWin).toLocaleString()}승</div>
        )
      },
      {
        title: '패',
        dataIndex: 'attackLose',
        align: 'center',
        className: 'hidden-max-sm',
        render: (lose, record) => (
          <div>{Number(lose + record.defenseLose).toLocaleString()}패</div>
        )
      },
      {
        title: '승률',
        dataIndex: 'attackWin',
        key: 'winRate',
        align: 'center',
        className: 'hidden-max-sm',
        render: (win, record) => (
          <div>
            {numeral(
              (win + record.defenseWin) /
                (win +
                  record.defenseWin +
                  record.attackLose +
                  record.defenseLose)
            ).format('0.0%')}
          </div>
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
