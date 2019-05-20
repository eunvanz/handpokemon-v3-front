import React, { PureComponent } from 'react';
import { compose } from 'redux';

import CreateMonView from './CreateMonView';
import withUser from '../../../../hocs/withUser';
import withView from '../../../../hocs/withView';
import withForm from '../../../../hocs/withForm';
import withCodes from '../../../../hocs/withCodes';
import { getMon, postMon, putMon } from '../../../../api/requestMon';
import {
  getMonImagesEmptyMon,
  putMonImage
} from '../../../../api/requestMonImage';

class CreateMonContainer extends PureComponent {
  state = {
    selectedMonImages: [],
    isSubmitting: false
  };

  componentDidMount() {
    this._fetchMon();
    this._fetchCandidateMonImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this._fetchMon();
    }
  }

  _fetchMon = () => {
    const { match, viewActions } = this.props;
    if (match.params.id !== 'new') {
      getMon(match.params.id).then(res => {
        viewActions.receiveView('mon', res.data);
      });
    } else {
      viewActions.clearView('mon');
    }
  };

  _fetchCandidateMonImages = () => {
    const { viewActions } = this.props;
    getMonImagesEmptyMon().then(res => {
      viewActions.receiveView('monImages', res.data);
    });
  };

  _handleOnSelectMonImage = monImage => {
    const { selectedMonImages } = this.state;
    const filteredSelectedMonImages = selectedMonImages.filter(
      item => item.id === monImage.id
    );
    if (filteredSelectedMonImages.length > 0) {
      this.setState({
        selectedMonImages: filteredSelectedMonImages.filter(
          item => item.id !== monImage.id
        )
      });
    } else {
      this.setState({ selectedMonImages: selectedMonImages.concat(monImage) });
    }
  };

  _handleOnSubmit = () => {
    const { form, mon, history } = this.props;
    const { selectedMonImages } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        const newMon = Object.assign({}, mon, values);
        let monId;
        let upsertMon;
        if (mon) upsertMon = putMon;
        else upsertMon = postMon;
        upsertMon(newMon)
          .then(res => {
            monId = res.data.id;
            const proms = selectedMonImages.map(monImage => {
              return putMonImage(Object.assign({}, monImage, { monId }));
            });
            return Promise.all(proms);
          })
          .then(() => {
            history.push(`/secret-garden/create-mon/${monId}`);
            this._fetchCandidateMonImages();
          });
      }
    });
  };

  render() {
    return (
      <CreateMonView
        {...this.props}
        selectedMonImages={this.state.selectedMonImages}
        onSelectMonImage={this._handleOnSelectMonImage}
        onSubmit={this._handleOnSubmit}
        isSubmitting={this.state.isSubmitting}
      />
    );
  }
}

const wrappedCreateMonView = compose(
  withUser({ isAdminRequired: true }),
  withView([
    {
      key: 'mon'
    },
    {
      key: 'monImages'
    }
  ]),
  withForm,
  withCodes
)(CreateMonContainer);

export default wrappedCreateMonView;
