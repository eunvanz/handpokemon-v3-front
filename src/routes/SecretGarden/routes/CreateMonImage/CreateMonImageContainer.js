import React, { PureComponent } from 'react';
import { compose } from 'redux';

import CreateMonImageView from './CreateMonImageView';
import withUser from '../../../../hocs/withUser';
import withView from '../../../../hocs/withView';
import withForm from '../../../../hocs/withForm';
import { postFile } from '../../../../api/requestFile';
import {
  postMonImage,
  getMonImage,
  putMonImage
} from '../../../../api/requestMonImage';
import MessageModal from '../../../../components/MessageMoal/index';

class CreateMonImageContainer extends PureComponent {
  state = {
    isSubmitting: false
  };

  componentDidMount() {
    const { match, viewActions } = this.props;
    if (match.params.id !== 'new') {
      getMonImage(match.params.id).then(res => {
        const monImage = res.data;
        viewActions.receiveView('monImage', monImage);
      });
    }
  }

  _handleOnClickSubmit = () => {
    const { form, viewActions, monImage } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isSubmitting: true });
        const imgFileObj = values.image[0].originFileObj;
        let requestPostFile;
        let requestPostMonImage;

        if (imgFileObj) {
          const formData = new FormData();
          formData.append('file', imgFileObj);
          requestPostFile = () =>
            postFile({ data: formData, path: 'mon-images' });
        } else {
          requestPostFile = () =>
            Promise.resolve({ data: { url: values.image[0].url } });
        }

        if (monImage) {
          requestPostMonImage = monImage => putMonImage(monImage);
        } else {
          requestPostMonImage = monImage => postMonImage(monImage);
        }

        requestPostFile()
          .then(res => {
            const { url } = res.data;
            const newMonImage = Object.assign({}, monImage, {
              url,
              designer: values.designer
            });
            return requestPostMonImage(newMonImage);
          })
          .then(res => {
            viewActions.receiveView('monImage', res.data);
            MessageModal({
              type: 'success',
              content: `이미지가 ${monImage ? '수정' : '등록'}되었습니다.`
            });
          })
          .catch(err => {
            MessageModal({
              type: 'error',
              content: err
            });
          })
          .finally(() => {
            this.setState({ isSubmitting: false });
          });
      }
    });
  };

  render() {
    return (
      <CreateMonImageView
        {...this.props}
        onClickSubmit={this._handleOnClickSubmit}
        isSubmitting={this.state.isSubmitting}
      />
    );
  }
}

const wrappedCreateMonView = compose(
  withUser({ adminRequired: true }),
  withView([
    {
      key: 'monImage'
    }
  ]),
  withForm
)(CreateMonImageContainer);

export default wrappedCreateMonView;
