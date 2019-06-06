import React, { PureComponent } from 'react';
import { Card } from 'antd';
import ContentContainer from '../ContentContainer/index';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ContentContainer>
          <Card
            style={{
              width: 450,
              maxWidth: '100%',
              padding: 24,
              margin: 'auto'
            }}
          >
            <div className='text-center'>
              <h3>희귀한 오류 발견!</h3>
              <div>반복될 경우 운영자에게 문의해주세요.</div>
            </div>
          </Card>
        </ContentContainer>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
