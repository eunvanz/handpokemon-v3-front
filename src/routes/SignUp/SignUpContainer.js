import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import SignUpView from './SignUpView';
import withUser from '../../hocs/withUser';
import withForm from '../../hocs/withForm';
import { isDupEmail, isDupNickname, signUp } from '../../api/requestUser';
import { getStartPick } from '../../api/requestCollection';
import withCodes from '../../hocs/withCodes';
import { postFile } from '../../api/requestFile';
import MessageModal from '../../components/MessageMoal/index';

class SignUpContainer extends PureComponent {
  state = {
    startPicks: null
  };

  _handleOnSubmit = () => {
    const { form, history, userActions } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // 프로필 사진이 있을경우 업로드
        let requestPostFile;
        if (values.profileImage && values.profileImage[0]) {
          const fileObj = values.profileImage[0].originFileObj;
          const formData = new FormData();
          formData.append('file', fileObj);
          requestPostFile = () =>
            postFile({ data: formData, path: 'profie-images' });
        } else {
          requestPostFile = () => Promise.resolve(null);
        }
        requestPostFile()
          .then(res => {
            const user = Object.assign({}, values, {
              profileImage: res ? res.data.url : null
            });
            return signUp(user);
          })
          .then(res => {
            const { user, token } = res.data;
            localStorage.setItem('auth', token);
            userActions.receiveUser(user);
            history.push('/pick');
            MessageModal({
              type: 'success',
              title: '회원가입 완료',
              content:
                '정식 손켓몬 트레이너가 되었습니다. 손켓몬 채집부터 시작해볼까요?'
            });
          });
      }
    });
  };

  _checkDupEmail = email => {
    return isDupEmail(email);
  };

  _checkDupNickname = nickname => {
    return isDupNickname(nickname);
  };

  _handleOnPick = () => {
    return getStartPick().then(res => {
      const startPicks = res.data;
      this.setState({ startPicks });
      return Promise.resolve();
    });
  };

  render() {
    return (
      <SignUpView
        {...this.props}
        onSubmit={this._handleOnSubmit}
        checkDupEmail={this._checkDupEmail}
        checkDupNickname={this._checkDupNickname}
        onPick={this._handleOnPick}
        startPicks={this.state.startPicks}
      />
    );
  }
}

const wrappedSignUpView = compose(
  withUser({ isNoUserRequired: true }),
  withRouter,
  withForm,
  withCodes
)(SignUpContainer);

export default wrappedSignUpView;
