/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import SkinTone from './SkinTone';
import { SKIN_TONES } from './constants';

type SkinTonePaletteProps = {
  activeSkinTone: string,
  icons: { [key: string]: React$Node },
  onSelect: (skinTone: string, e: *) => void,
};

export default class SkinTonePalette extends React.PureComponent<SkinTonePaletteProps> {
  static contextTypes = {
    classNames: PropTypes.objectOf(PropTypes.string),
  };

  static propTypes = {
    activeSkinTone: PropTypes.string.isRequired,
    icons: PropTypes.objectOf(PropTypes.node).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  render(): React$Node {
    const { activeSkinTone, icons, onSelect } = this.props;
    const { classNames } = this.context;

    return (
      <div className={classNames.skinTones}>
        {SKIN_TONES.map(skinTone => (
          <SkinTone
            key={skinTone}
            active={activeSkinTone === skinTone}
            skinTone={skinTone}
            onSelect={onSelect}
          >
            {icons[skinTone] || null}
          </SkinTone>
        ))}
      </div>
    );
  }
}
