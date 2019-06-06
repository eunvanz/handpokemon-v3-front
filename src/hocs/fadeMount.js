import React, { PureComponent } from 'react';

export default Component => {
  return class extends PureComponent {
    state = {
      fadeIn: false,
      shouldRender: false
    };

    componentDidMount() {
      const { mounted } = this.props;
      this.setState({ shouldRender: mounted });
      setTimeout(() => this.setState({ fadeIn: true }));
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.mounted && !this.props.mounted) {
        this.setState({ fadeIn: false });
        setTimeout(() => this.setState({ shouldRender: false }), 500);
      } else if (!prevProps.mounted && this.props.mounted) {
        this.setState({ fadeIn: true, shouldRender: true });
      }
    }

    render() {
      return this.state.shouldRender ? (
        <Component
          style={{
            opacity: this.state.fadeIn ? 1 : 0,
            transition: 'opacity 0.5s'
          }}
        />
      ) : null;
    }
  };
};
