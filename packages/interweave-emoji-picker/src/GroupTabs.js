/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { EmojiShape } from 'interweave-emoji';
import Group from './Group';
import { GROUPS, GROUP_COMMONLY_USED, GROUP_ICONS } from './constants';

import type { Emoji, EmojiPath } from 'interweave-emoji'; // eslint-disable-line

type GroupTabsProps = {
  activeGroup: string,
  commonEmojis: Emoji[],
  icons: { [key: string]: React$Node },
  onSelect: (group: string, e: SyntheticEvent<*>) => void,
};

export default class GroupTabs extends React.PureComponent<GroupTabsProps> {
  static contextTypes = {
    classNames: PropTypes.objectOf(PropTypes.string),
  };

  static propTypes = {
    activeGroup: PropTypes.string.isRequired,
    commonEmojis: PropTypes.arrayOf(EmojiShape).isRequired,
    icons: PropTypes.objectOf(PropTypes.node).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  render(): React$Node {
    const {
      activeGroup,
      commonEmojis,
      icons,
      onSelect,
    } = this.props;
    const { classNames } = this.context;
    const groups = [...GROUPS];

    if (commonEmojis.length > 0) {
      groups.unshift(GROUP_COMMONLY_USED);
    }

    return (
      <nav className={classNames.groups}>
        <ul className={classNames.groupsList}>
          {groups.map(group => (
            <li key={group}>
              <Group
                activeGroup={activeGroup}
                group={group}
                onSelect={onSelect}
              >
                {icons[group] || GROUP_ICONS[group]}
              </Group>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
