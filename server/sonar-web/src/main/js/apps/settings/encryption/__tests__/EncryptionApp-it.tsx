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
import userEvent from '@testing-library/user-event';
import React from 'react';
import { byRole } from 'testing-library-selector';
import SettingsServiceMock from '../../../../api/mocks/SettingsServiceMock';
import { renderComponent } from '../../../../helpers/testReactTestingUtils';
import EncryptionApp from '../EncryptionApp';

jest.mock('../../../../api/settings');

let settingsMock: SettingsServiceMock;

beforeAll(() => {
  settingsMock = new SettingsServiceMock();
});

afterEach(() => {
  settingsMock.reset();
});

const ui = {
  appHeading: byRole('heading', { name: 'property.category.security.encryption' }),
  generateSecretButton: byRole('button', { name: 'encryption.generate_secret_key' }),
  secretKeyHeading: byRole('heading', { name: 'encryption.secret_key' }),
  copyToClipboard: byRole('button', { name: 'copy_to_clipboard' }),
  encryptTextarea: byRole('textbox'),
  encryptButton: byRole('button', { name: 'encryption.encrypt' }),
  generateNewSecretButton: byRole('button', { name: 'encryption.generate_new_secret_key' }),
};

it('should be able to generate new key', async () => {
  const user = userEvent.setup();
  renderEncryptionApp();

  expect(await ui.appHeading.find()).toBeInTheDocument();
  await user.click(ui.generateSecretButton.get());
  expect(ui.copyToClipboard.get()).toHaveAttribute('data-clipboard-text', 'secretKey');
});

it('should be able to encrypt property value when secret is registered', async () => {
  const user = userEvent.setup();
  settingsMock.setSecretKeyAvailable(true);
  renderEncryptionApp();

  expect(await ui.appHeading.find()).toBeInTheDocument();
  await user.type(ui.encryptTextarea.get(), 'sonar.announcement.message');
  await user.click(ui.encryptButton.get());
  expect(ui.copyToClipboard.get()).toHaveAttribute('data-clipboard-text', 'encryptedValue');

  // can generate new secret in view
  await user.click(ui.generateNewSecretButton.get());
  expect(ui.copyToClipboard.get()).toHaveAttribute('data-clipboard-text', 'secretKey');
});

function renderEncryptionApp() {
  return renderComponent(<EncryptionApp />);
}
