/*
**  This component will be published in a separate package
*/
import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// TODO
// 3 words name initials
// handle only alpha numeric chars

export default class GiftedAvatar extends React.Component {
  setAvatarColor() {
    const userName = this.props.user.name || '';
    const name = userName.toUpperCase().split(' ');
    if (name.length === 1) {
      this.avatarName = `${name[0].charAt(0)}`;
    } else if (name.length > 1) {
      this.avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
    } else {
      this.avatarName = '';
    }

    let sumChars = 0;
    for(let i = 0; i < userName.length; i++) {
      sumChars += userName.charCodeAt(i);
    }

    // Custom colors for Fortis Riders
    const colors = [
      '#617288',
      '#ac444a',
      '#217c6a',
      '#99418a',
      '#5b7b4b',
      '#956791',
      '#4C898F'
    ];

    this.avatarColor = colors[sumChars % colors.length];
  }

  renderAvatar() {
    if (typeof this.props.user.avatar === 'function') {
      return this.props.user.avatar();
    } else if (typeof this.props.user.avatar === 'string') {
      return (
        <Image
          source={{uri: this.props.user.avatar}}
          style={[defaultStyles.avatarStyle, this.props.avatarStyle]}
        />
      );
    } else if (typeof this.props.user.avatar === 'number') {
      return (
        <Image
          source={this.props.user.avatar}
          style={[defaultStyles.avatarStyle, this.props.avatarStyle]}
        />
      );
    }
    return null;
  }

  renderInitials() {
    return (
      <Text style={[defaultStyles.textStyle, this.props.textStyle]}>
        {this.avatarName}
      </Text>
    );
  }

  render() {
    if (!this.props.user.name && !this.props.user.avatar) {
      // render placeholder
      return (
        <View
          style={[
            defaultStyles.avatarStyle,
            {backgroundColor: 'transparent'},
            this.props.avatarStyle,
          ]}
          accessibilityTraits="image"
        />
      )
    }
    if (this.props.user.avatar) {
      return (
        <TouchableOpacity
          disabled={this.props.onPress ? false : true}
          onPress={() => {
            const {onPress, ...other} = this.props;
            this.props.onPress && this.props.onPress(other);
          }}
          accessibilityTraits="image"
        >
          {this.renderAvatar()}
        </TouchableOpacity>
      );
    }

    if (!this.avatarColor) {
      this.setAvatarColor();
    }

    return (
      <TouchableOpacity
        disabled={this.props.onPress ? false : true}
        onPress={() => {
          const {onPress, ...other} = this.props;
          this.props.onPress && this.props.onPress(other);
        }}
        style={[
          defaultStyles.avatarStyle,
          {backgroundColor: this.avatarColor},
          this.props.avatarStyle,
        ]}
        accessibilityTraits="image"
      >
        {this.renderInitials()}
      </TouchableOpacity>
    );
  }
}

const defaultStyles = {
  avatarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: '100',
  },
};

GiftedAvatar.defaultProps = {
  user: {
    name: null,
    avatar: null,
  },
  onPress: null,
  avatarStyle: {},
  textStyle: {},
};

GiftedAvatar.propTypes = {
  user: PropTypes.object,
  onPress: PropTypes.func,
  avatarStyle: Image.propTypes.style,
  textStyle: Text.propTypes.style,
};
