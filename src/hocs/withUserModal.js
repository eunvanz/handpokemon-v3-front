import React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import numeral from 'numeral';
import { getUserByUserId } from '../api/requestUser';
import FullTitleTag from '../components/FullTitleTag';
import imgEmpty from '../imgs/empty-mon.png';
import SpinContainer from '../components/SpinContainer';
import { getDetailCdNmByDetailCd } from '../libs/codeUtils';
import withCodes from './withCodes';

export default ComposedComponent => {
  class withUserModal extends React.PureComponent {
    state = {
      showModal: false,
      user: null
    };

    _showUserModal = userId => {
      this.setState({ showModal: true });
      getUserByUserId(userId).then(res => {
        this.setState({ user: res.data });
      });
    };

    _closeUserModal = () => {
      this.setState({ showModal: false });
      setTimeout(() => this.setState({ user: null }), 1000);
    };

    render() {
      const { showModal, user } = this.state;
      const { history, codes } = this.props;
      return (
        <div>
          <ComposedComponent
            {...this.props}
            showUserModal={this._showUserModal}
          />
          <Modal
            visible={showModal}
            title='트레이너 정보'
            onCancel={this._closeUserModal}
            footer={[
              <Button
                key='collection'
                type='primary'
                size='large'
                onClick={() => history.push(`/collection/${user.id}`)}
              >
                콜렉션 구경
              </Button>,
              <Button
                key='collection'
                type='link'
                size='large'
                onClick={this._closeUserModal}
              >
                닫기
              </Button>
            ]}
          >
            {!user && showModal && <SpinContainer />}
            {user && (
              <Row gutter={24} className='user-info'>
                <Col md={8}>
                  <img
                    src={user.profileImage || imgEmpty}
                    alt='profile'
                    style={{ width: 250, maxWidth: '100%' }}
                  />
                </Col>
                <Col md={16}>
                  <Row>
                    <Col span={6} className='fw-700'>
                      닉네임
                    </Col>
                    <Col span={18}>{user.nickname}</Col>
                  </Row>
                  <Row>
                    <Col span={6} className='fw-700'>
                      칭호
                    </Col>
                    <Col span={18}>
                      <FullTitleTag achievements={user.achievements} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} className='fw-700'>
                      리그
                    </Col>
                    <Col span={18}>
                      <span className='c-primary fw-700'>
                        {getDetailCdNmByDetailCd(user.leagueCd, codes)}
                      </span>
                      리그
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} className='fw-700'>
                      콜렉션점수
                    </Col>
                    <Col span={18}>
                      <span className='c-primary fw-700'>
                        {Number(user.colPoint).toLocaleString()}
                      </span>
                      점
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} className='fw-700'>
                      시합점수
                    </Col>
                    <Col span={18}>
                      <span className='c-primary fw-700'>
                        {Number(user.battlePoint).toLocaleString()}
                      </span>
                      점
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} className='fw-700'>
                      공격전적
                    </Col>
                    <Col span={18}>
                      <span className='c-primary fw-700'>
                        {Number(user.attackWin).toLocaleString()}
                      </span>
                      승{' '}
                      <span className='c-primary fw-700'>
                        {Number(user.attackLose).toLocaleString()}
                      </span>
                      패 / 승률{' '}
                      <span className='c-primary fw-700'>
                        {numeral(
                          user.attackWin / (user.attackLose + user.attackWin)
                        ).format('0.0%')}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} className='fw-700'>
                      방어전적
                    </Col>
                    <Col span={18}>
                      <span className='c-primary fw-700'>
                        {Number(user.defenseWin).toLocaleString()}
                      </span>
                      승{' '}
                      <span className='c-primary fw-700'>
                        {Number(user.defenseLose).toLocaleString()}
                      </span>
                      패 / 승률{' '}
                      <span className='c-primary fw-700'>
                        {numeral(
                          user.defenseWin / (user.defenseLose + user.defenseWin)
                        ).format('0.0%')}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} className='fw-700'>
                      전체전적
                    </Col>
                    <Col span={18}>
                      <span className='c-primary fw-700'>
                        {Number(
                          user.defenseWin + user.attackWin
                        ).toLocaleString()}
                      </span>
                      승{' '}
                      <span className='c-primary fw-700'>
                        {Number(
                          user.defenseLose + user.attackLose
                        ).toLocaleString()}
                      </span>
                      패 / 승률{' '}
                      <span className='c-primary fw-700'>
                        {numeral(
                          (user.defenseWin + user.attackWin) /
                            (user.defenseLose +
                              user.defenseWin +
                              user.attackLose +
                              user.attackWin)
                        ).format('0.0%')}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} className='fw-700'>
                      연승정보
                    </Col>
                    <Col span={18}>
                      현재{' '}
                      <span className='c-primary fw-700'>
                        {Number(user.winInARow).toLocaleString()}
                      </span>
                      연승 중 / 최고{' '}
                      <span className='c-primary fw-700'>
                        {Number(user.maxWinInARow).toLocaleString()}
                      </span>
                      연승 기록
                    </Col>
                    <Col span={24}>{user.introduce}</Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Modal>
        </div>
      );
    }
  }

  return compose(
    withRouter,
    withCodes
  )(withUserModal);
};
