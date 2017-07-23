import React, {PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import * as Assets from '../../assets';
import {Colors, Typography} from '../../style';
import View from '../../components/view';

import Button from '../../components/button';
import Text from '../../components/text';

const DEFAULT_BUTTON_PROPS = {
  color: Colors.blue30,
};

export default class TopBar extends BaseComponent {

  static displayName = 'Moda.TopBar';

  static propTypes = {
    /**
     * title to display in the center of the top bar
     */
    title: PropTypes.string,
    /**
     * title custom style
     */
    titleStyle: PropTypes.object,
    /**
     * done action props (Button props)
     */
    doneButtonProps: PropTypes.shape(Button.propTypes),
    /**
     * done action label
     */
    doneLabel: PropTypes.string,
    /**
     * done action icon
     */
    doneIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * done action callback
     */
    onDone: PropTypes.func,
    /**
     * cancel action props (Button props)
     */
    cancelButtonProps: PropTypes.shape(Button.propTypes),
    /**
     * cancel action label
     */
    cancelLabel: PropTypes.string,
    /**
     * cancel action icon
     */
    cancelIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * cancel action callback
     */
    onCancel: PropTypes.func,
    /**
     * whether to include status bar or not (height claculations)
     */
    includeStatusBar: PropTypes.bool,
  }

  static defaultProps = {
    doneLabel: 'Save',
    cancelIcon: Assets.icons.x,
    doneButtonProps: {},
    cancelButtonProps: {},
    includeStatusBar: Constants.isIOS,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderTopBarButton({onPress, label, icon, buttonProps}) {
    if (onPress && (label || icon)) {
      const {iconStyle, labelStyle, ...otherButtonProps} = buttonProps;

      return (
        <Button
          link
          onPress={onPress}
          label={label}
          labelStyle={[this.styles.actionLabel, labelStyle]}
          iconSource={icon}
          iconStyle={[this.styles.icon, iconStyle]}
          {...DEFAULT_BUTTON_PROPS}
          {...otherButtonProps}
          hitSlop={{top: 6, bottom: 6, left: 6, right: 6}}
        />
      );
    }
  }

  renderDone() {
    const {doneButtonProps, doneLabel, doneIcon, onDone} = this.props;
    return this.renderTopBarButton({
      onPress: onDone, label: doneLabel, icon: doneIcon, buttonProps: doneButtonProps,
    });
  }

  renderCancel() {
    const {cancelButtonProps, cancelLabel, cancelIcon, onCancel} = this.props;
    return this.renderTopBarButton({
      onPress: onCancel, label: cancelLabel, icon: cancelIcon, buttonProps: cancelButtonProps,
    });
  }

  render() {
    const {title, titleStyle, includeStatusBar} = this.props;

    return (
      <View>
        {includeStatusBar && <View style={this.styles.statusBar}/>}
        <View style={this.styles.container}>
          <View row flex bottom paddingL-15 centerV>
            {this.renderCancel()}
          </View>
          <View row flex-3 bottom centerH centerV>
            <Text numberOfLines={1} text70 style={[this.styles.title, titleStyle]}>{title}</Text>
          </View>
          <View row flex bottom right paddingR-15 centerV>
            {this.renderDone()}
          </View>
        </View>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 32 + Constants.statusBarHeight,
    },
    statusBar: {
      height: Constants.statusBarHeight,
    },
    title: {
      fontWeight: '500',
    },
    actionLabel: {
      ...Typography.text70,
    },
    icon: {
      width: 16,
      height: 16,
      tintColor: Colors.dark10,
      marginBottom: 2,
    },
  });
}
