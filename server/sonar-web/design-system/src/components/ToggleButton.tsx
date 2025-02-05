/*
 * SonarQube
 * Copyright (C) 2009-2023 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import styled from '@emotion/styled';
import tw from 'twin.macro';
import { themeBorder, themeColor, themeContrast } from '../helpers/theme';
import { Badge } from './Badge';
import { ButtonSecondary } from './buttons';

type ToggleButtonValueType = string | number | boolean;

export interface ToggleButtonsOption<T extends ToggleButtonValueType> {
  counter?: number;
  disabled?: boolean;
  label: string;
  value: T;
}

export interface ButtonToggleProps<T extends ToggleButtonValueType> {
  disabled?: boolean;
  label?: string;
  onChange: (value: T) => void;
  options: Array<ToggleButtonsOption<T>>;
  value?: T;
}

export function ToggleButton<T extends ToggleButtonValueType>(props: ButtonToggleProps<T>) {
  const { disabled = false, label, options, value } = props;

  return (
    <Wrapper aria-label={label} role="radiogroup">
      {options.map((option) => (
        <OptionButton
          aria-current={option.value === value}
          data-value={option.value}
          disabled={disabled || option.disabled}
          key={option.value.toString()}
          onClick={() => {
            if (option.value !== value) {
              props.onChange(option.value);
            }
          }}
          role="radio"
          selected={option.value === value}
        >
          {option.label}
          {option.counter ? (
            <Badge className="sw-ml-1" variant="counter">
              {option.counter}
            </Badge>
          ) : null}
        </OptionButton>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: ${themeBorder('default', 'toggleBorder')};

  ${tw`sw-inline-flex`}
  ${tw`sw-h-control`}
  ${tw`sw-box-border`}
  ${tw`sw-font-semibold`}
  ${tw`sw-rounded-2`}
`;

const OptionButton = styled(ButtonSecondary)<{ selected: boolean }>`
  background: ${(props) => (props.selected ? themeColor('toggleHover') : themeColor('toggle'))};
  color: ${(props) => (props.selected ? themeContrast('toggleHover') : themeContrast('toggle'))};
  border: none;
  height: auto;
  ${tw`sw-rounded-0`};
  ${tw`sw-truncate`};

  &:first-of-type {
    ${tw`sw-rounded-l-2`};
  }

  &:last-of-type {
    ${tw`sw-rounded-r-2`};
  }

  &:not(:last-of-type) {
    border-right: ${themeBorder('default', 'toggleBorder')};
  }

  &:hover {
    background: ${themeColor('toggleHover')};
    color: ${themeContrast('toggleHover')};
  }

  &:focus,
  &:active {
    outline: ${themeBorder('focus', 'toggleFocus')};
    z-index: 1;
  }
`;
