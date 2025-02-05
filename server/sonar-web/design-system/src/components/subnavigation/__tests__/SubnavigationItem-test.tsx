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
import { screen } from '@testing-library/react';
import { render } from '../../../helpers/testUtils';
import { FCProps } from '../../../types/misc';
import { SubnavigationItem } from '../SubnavigationItem';

it('should render correctly', () => {
  setupWithProps();

  expect(screen.getByRole('button', { current: false })).toBeVisible();
});

it('should display selected', () => {
  setupWithProps({ active: true });

  expect(screen.getByRole('button', { current: true })).toBeVisible();
});

it('should call onClick with value when clicked', async () => {
  const onClick = jest.fn();
  const { user } = setupWithProps({ onClick });

  await user.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledWith('foo');
});

function setupWithProps(props: Partial<FCProps<typeof SubnavigationItem>> = {}) {
  return render(
    <SubnavigationItem active={false} onClick={jest.fn()} value="foo" {...props}>
      Foo
    </SubnavigationItem>
  );
}
